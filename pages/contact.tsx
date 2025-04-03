import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { Contactpage } from "@/models/contactpage";
import Globals from "@/modules/Globals";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaPhone, FaCheck } from "react-icons/fa";
import { HiMapPin } from "react-icons/hi2";
import { IoMail } from "react-icons/io5";

export default function ContactUs() {
  const router = useRouter();
  const [referrerTitle, setReferrerTitle] = useState<string | null>(null);
  const [mainsource, setMainSource] = useState<string | null>("Website");
  const [subsource, setSubSource] = useState<string | null>(null);
  const [pageData, setPageData] = useState<Contactpage | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    inquiryType: "",
    leadType: "",
    message: "",
    agreeTerms: false,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string | null;
  }>({ type: null, message: null });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { referrer, mainsource, subsource } = router.query;
    if (mainsource && typeof mainsource === "string") {
      setMainSource(mainsource);
    }

    if (subsource && typeof subsource === "string") {
      setSubSource(subsource);
    }

    if (referrer && typeof referrer === "string") {
      setReferrerTitle(referrer);
    }
  }, [router.query]);

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

  useEffect(() => {
    Globals.KontentClient.item("contact_page")
      .toObservable()
      .subscribe((response: any) => {
        setPageData(response.item);
      });
  }, []);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex =
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
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
      const email_to = "althaf.umer@strategic.ae";
      const subject = "New Contact Form Submission";
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
            <h2>New Contact Form Submission</h2>
            <p>Arosa RealEstate</p>
          </div>
          
          <div class="content">
            <p>You've received a new contact form submission with the following details:</p>
            
            <table class="details-table">
              <tr>
                <th>Name:</th>
                <td>${formData.firstName} ${formData.lastName}</td>
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
                formData.inquiryType
                  ? `
              <tr>
                <th>Inquiry Type:</th>
                <td>${formData.inquiryType}</td>
              </tr>
              `
                  : ""
              }
              ${
                formData.leadType
                  ? `
              <tr>
                <th>How they heard about us:</th>
                <td>${formData.leadType}</td>
              </tr>
              `
                  : ""
              }
              ${
                referrerTitle
                  ? `
             <tr>
               <th>Referrer Title:</th>
               <td>${referrerTitle}</td>
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
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        inquiryType: "",
        leadType: "",
        message: "",
        agreeTerms: false,
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus({
        type: "error",
        message: "Error submitting form. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!pageData) {
    return <SpinnerComponent />;
  }

  const contactInfoItems = [
    {
      icon: <IoMail size={22} />,
      text: "info@arosarealestate.com",
      type: "email",
    },
    {
      icon: <FaPhone size={22} />,
      text: "+ 971 - 55 - 000 - 0000",
      type: "phone",
    },
    {
      icon: <HiMapPin size={22} />,
      text: "Dubai, UAE",
      type: "address",
    },
  ];

  const inquiryTypes = [
    "General Inquiry",
    "Property Inquiry",
    "Investment Opportunity",
    "Partnership",
    "Other",
  ];

  const leadSources = [
    "Google Search",
    "Social Media",
    "Friend/Family",
    "Advertisement",
    "Other",
  ];

  return (
    <div className="contact-page-wrapper">
      {/* Banner Section */}
      <div className="banner-wrapper py-20 lg:pt-20 lg:pb-30 lg:mb-24 bg-primary relative">
        <div className="container mx-auto px-4">
          <h1 className="lg:text-4xl text-3xl tracking-tight font-medium text-white mb-2">
            {pageData.bannerheading.value}
          </h1>
          <div
            className="text-white prose prose-invert"
            dangerouslySetInnerHTML={{
              __html: pageData.bannersubheading.value,
            }}
          />

          <div className="floating-section-wrapper bg-white mt-10 p-5 rounded-xl lg:absolute lg:-bottom-15 lg:left-1/2 lg:-translate-x-1/2 lg:w-4/5 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {contactInfoItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-primary rounded-xl text-white p-5 flex items-center justify-center flex-col hover:bg-primary-dark transition-colors"
                >
                  <div className="mb-2">{item.icon}</div>
                  <p className="text-center">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="py-16 form-section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="lg:text-4xl text-3xl font-medium text-primary mb-3">
              {pageData.formheading.value}
            </h2>
            <div
              className="text-tertiary mb-8 prose"
              dangerouslySetInnerHTML={{
                __html: pageData.formcontent.value,
              }}
            />

            <form
              id="form"
              onSubmit={handleSubmit}
              className="bg-white p-6 md:p-10 rounded-lg shadow-md"
            >
              <input
                type="hidden"
                name="referrerTitle"
                value={`${referrerTitle}`}
              />
              <input type="hidden" name="mainSource" value={`${mainsource}`} />
              <input type="hidden" name="subSource" value={`${subsource}`} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="font-semibold">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={`bg-gray-50 p-3 w-full rounded border ${
                      formErrors.firstName
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                    type="text"
                    placeholder="Enter First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {formErrors.firstName && (
                    <p className="text-red-500 text-sm">
                      {formErrors.firstName}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="font-semibold">
                    Last Name
                  </label>
                  <input
                    className="bg-gray-50 p-3 w-full rounded border border-gray-200"
                    type="text"
                    placeholder="Enter Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-semibold">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={`bg-gray-50 p-3 w-full rounded border ${
                      formErrors.email ? "border-red-500" : "border-gray-200"
                    }`}
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
                    className={`bg-gray-50 p-3 w-full rounded border ${
                      formErrors.phone ? "border-red-500" : "border-gray-200"
                    }`}
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
                    Inquiry Type
                  </label>
                  <select
                    className="bg-gray-50 p-3 w-full rounded border border-gray-200"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                  >
                    <option value="">Select Inquiry Type</option>
                    {inquiryTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="leadType" className="font-semibold">
                    How Did You Hear About Us?
                  </label>
                  <select
                    className="bg-gray-50 p-3 w-full rounded border border-gray-200"
                    name="leadType"
                    value={formData.leadType}
                    onChange={handleChange}
                  >
                    <option value="">Select an option</option>
                    {leadSources.map((source, index) => (
                      <option key={index} value={source}>
                        {source}
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
                    className={`bg-gray-50 p-3 w-full rounded border ${
                      formErrors.message ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="Enter your Message here.."
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                  {formErrors.message && (
                    <p className="text-red-500 text-sm">{formErrors.message}</p>
                  )}
                </div>

                <div className="md:col-span-2 flex flex-col gap-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="mr-2"
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
                    <p className="text-red-500 text-sm">
                      {formErrors.agreeTerms}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
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

                <button
                  className={`bg-primary hover:bg-primary-dark rounded text-white px-6 py-3 font-medium transition-colors min-w-[200px] ${
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
                    "Send Your Message"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
