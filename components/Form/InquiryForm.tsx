import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

export default function InquiryForm({ projectName }: { projectName: string }) {
  const router = useRouter();
  const [mainsource, setMainSource] = useState<string | null>("Website");
  const [subsource, setSubSource] = useState<string | null>(null);
  useEffect(() => {
    const { mainsource, subsource } = router.query;
    if (mainsource && typeof mainsource === "string") {
      setMainSource(mainsource);
    }

    if (subsource && typeof subsource === "string") {
      setSubSource(subsource);
    }
  }, [router.query]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string | null;
  }>({ type: null, message: null });
  const [isLoading, setIsLoading] = useState(false);
  const preferredLanguageList = [
    "English",
    "Arabic",
    "Russian",
    "Chinese",
    "French",
    "Spanish",
    "German",
    "Italian",
    "Portuguese",
    "Hindi",
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredLanguage: "",
    message: "",
    agreeTerms: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex =
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;

    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }
    if (!formData.message.trim()) errors.message = "Message is required";
    if (!formData.agreeTerms) errors.agreeTerms = "You must agree to the terms";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setFormStatus({ type: null, message: null });

    try {
      const sender_email = "notification@arosarealestate.com";
      const email_to = "camilla@arosarealestate.com";
      const subject = "New Project Inquiry Submission";
      const body = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .email-container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #A2625E; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .footer { padding: 10px; text-align: center; font-size: 12px; color: #777; }
          .details-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          .details-table th { text-align: left; padding: 8px; background-color: #eee; }
          .details-table td { padding: 8px; border-bottom: 1px solid #ddd; }
          .message-box { background-color: white; border: 1px solid #ddd; padding: 15px; margin-top: 10px; }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h3>New Project Inquiry Submission</h3>
            <p>Arosa RealEstate</p>
          </div>
          
          <div class="content">
            <p>You've received a new contact form submission with the following details:</p>
            
            <table class="details-table">
              <tr>
                <th>FullName:</th>
                <td>${formData.fullName}</td>
              </tr>
              <tr>
                <th>Email:</th>
                <td><a href="mailto:${formData.email}">${
        formData.email
      }</a></td>
              </tr>
              <tr>
                <th>Phone:</th>
                <td><a href="tel:${formData.phone}">${formData.phone}</a></td>
              </tr>
              ${
                formData.preferredLanguage
                  ? `
              <tr>
                <th>Preferred Language:</th>
                <td>${formData.preferredLanguage}</td>
              </tr>
              `
                  : ""
              }
             
              ${
                projectName
                  ? `
             <tr>
               <th>Referrer Title:</th>
               <td>${projectName}</td>
             </tr>
             `
                  : ""
              }
              ${
                mainsource
                  ? `
             <tr>
               <th>Main Source:</th>
               <td>${mainsource}</td>
             </tr>
             `
                  : ""
              }

              ${
                subsource
                  ? `
            <tr>
              <th>SubSource Source:</th>
              <td>${subsource}</td>
            </tr>
            `
                  : ""
              }
              
            </table>
            
            <h3>Message:</h3>
            <div class="message-box">
              ${formData.message.replace(/\n/g, "<br>")}
            </div>
            
            <p style="margin-top: 20px;">
              <strong>Submission Time:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
          
          <div class="footer">
            <p>This email was sent from the contact form on ArosA Real Estate website.</p>
            <p>© ${new Date().getFullYear()} ArosA Real Estate. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

      const response = await fetch(
        "https://payment.aimcongress.com/api/Generic/SendEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender_email,
            email_to,
            subject,
            body,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      console.log("Success:", data);

      setFormStatus({
        type: "success",
        message: "Your message has been sent successfully!",
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        preferredLanguage: "",
        message: "",
        agreeTerms: false,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus({
        type: "error",
        message: "There was an error submitting the form. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-10 rounded-lg shadow-md"
      >
        <input type="hidden" name="projectName" value={`${projectName}`} />
        <div className="grid grid-cols-1  gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName" className="font-semibold">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              className={`bg-gray-50 p-3 w-full rounded border border-gray-200`}
              type="text"
              placeholder="Enter First Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />

            {formErrors.fullName && (
              <p className="text-red-500 text-sm">{formErrors.fullName}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              className={`bg-gray-50 p-3 w-full rounded border border-gray-200`}
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm">{formErrors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="font-semibold">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              className={`bg-gray-50 p-3 w-full rounded border border-gray-200`}
              type="tel"
              placeholder="Enter Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {formErrors.phone && (
              <p className="text-red-500 text-sm">{formErrors.phone}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="inquiryType" className="font-semibold">
              Preferred Language
            </label>
            <select
              className="bg-gray-50 p-3 w-full rounded border border-gray-200"
              name="preferredLanguage"
              value={formData.preferredLanguage}
              onChange={handleChange}
            >
              <option value="">Select Preferred Language</option>
              {preferredLanguageList.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 flex flex-col gap-2">
            <label htmlFor="message" className="font-semibold">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
              className={`bg-gray-50 p-3 w-full rounded border border-gray-200`}
              placeholder="Enter your Message here.."
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2 flex flex-col gap-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                className="mr-2"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              <label htmlFor="agreeTerms">
                I agree with{" "}
                <a
                  href="/terms"
                  className="underline cursor-pointer mx-1 text-primary hover:text-primary-dark"
                >
                  Terms of Use
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="underline cursor-pointer mx-1 text-primary hover:text-primary-dark"
                >
                  Privacy Policy
                </a>
                <span className="text-red-500">*</span>
              </label>
            </div>
            {formErrors.agreeTerms && (
              <p className="text-red-500 text-sm">{formErrors.agreeTerms}</p>
            )}

            <button
              className={`cursor-pointer mt-5 bg-primary hover:bg-primary-dark rounded text-white px-6 py-3 font-medium transition-colors min-w-[200px] ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  Sending...
                </span>
              ) : (
                " Register Your Interest"
              )}
            </button>

            {formStatus.type && (
              <div
                className={`p-3 rounded-md ${
                  formStatus.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {formStatus.type === "success" ? (
                  <div className="flex items-center gap-2">
                    <FaCheck className="text-green-600" />
                    {formStatus.message}
                  </div>
                ) : (
                  formStatus.message
                )}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
