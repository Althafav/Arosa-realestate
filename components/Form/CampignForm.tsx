import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

export default function CampignForm({ propertyName, locale }: any) {
  const router = useRouter();

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string | null;
  }>({ type: null, message: null });
  const [isLoading, setIsLoading] = useState(false);

  const timePeriod = ["Immediately", "Within 1-3 Months", "Within 3-6 Months"];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    timePeriod: "",
    message: "",
    agreeTerms: false,
  });

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

    if (!formData.agreeTerms) errors.agreeTerms = "You must agree to the terms";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || isLoading) return;

    setIsLoading(true);
    setFormStatus({ type: null, message: null });

    try {
      const apiUrl =
        "https://my.remapp.ae/api/create-lead/0bafee87cb510040069b9083e050215c";

      // Build a safe current URL (client-side only)
      const currentUrl =
        typeof window !== "undefined"
          ? window.location.href
          : `https://arosarealestate.com${router.asPath}`;

      const notesLines = [
        `Property: ${propertyName || "-"}`,
        `Prefered Time: ${formData.timePeriod || "-"}`,

        `Page URL: ${currentUrl}`,
      ];

      const postData = {
        source: "website",

        contact_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,

        notes: notesLines.join("\n"),
      };

      const response = await axios.post(apiUrl, postData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        // optional: give yourself some protection against hangs
        timeout: 15000,
      });

      // Handle success heuristically (since we don't know the exact contract)
      if (response.status >= 200 && response.status < 300) {
        // console.log(response, "Form submission response");
        // setFormStatus({
        //   type: "success",
        //   message: "Thanks! Your message has been sent successfully.",
        // });

        // Reset the form after success
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          timePeriod: "",
          message: "",
          agreeTerms: false,
        });

        router.push(
          `/projects/thank-you?username=${encodeURIComponent(
            formData.fullName
          )}`
        );
      } else {
        setFormStatus({
          type: "error",
          message:
            locale === "ar"
              ? "لم نتمكن من إرسال طلبك الآن، حاول مرة أخرى قريبًا"
              : "We couldn't submit your request right now. Please try again shortly.",
        });
      }
    } catch (err: any) {
      // Axios-aware error messaging
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Network error. Please check your connection and try again.";
      console.error("Form submission error:", err);
      setFormStatus({
        type: "error",
        message: msg,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <form
        id="campignform"
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-10 rounded-lg lg:shadow-md"
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName" className="font-semibold">
              {locale === "ar" ? "الاسم الكامل" : " Full Name"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              className={`bg-gray-50 p-3 w-full rounded border border-gray-200`}
              type="text"
              placeholder={
                locale === "ar" ? "أدخل الاسم الكامل" : "Enter First Name"
              }
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
              {locale === "ar" ? "البريد الإلكتروني" : "Email"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              className={`bg-gray-50 p-3 w-full rounded border border-gray-200`}
              type="email"
              placeholder={
                locale === "ar" ? "أدخل بريدك الإلكتروني" : "Enter Your Email"
              }
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
              {locale === "ar" ? "رقم الهاتف" : "Phone"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              className={`bg-gray-50 p-3 w-full rounded border border-gray-200`}
              type="text"
              placeholder={
                locale === "ar" ? "أدخل رقم الهاتف" : "Enter Phone Number"
              }
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
              {locale === "ar"
                ? "متى تخطط للشراء؟"
                : " When are you looking to buy"}
            </label>
            <select
              className="bg-gray-50 p-3 w-full rounded border border-gray-200"
              name="timePeriod"
              value={formData.timePeriod}
              onChange={handleChange}
            >
              <option value="">{locale === "ar" ? "اختر" : "Select"}</option>

              <option value="Immediately">
                {locale === "ar" ? "فورًا" : "Immediately"}
              </option>
              <option value="Within 1-3 Months">
                {" "}
                {locale === "ar" ? "خلال 1–3 أشهر" : "Within 1-3 Months"}
              </option>
              <option value="Within 3-6 Months">
                {" "}
                {locale === "ar" ? "خلال 3–6 أشهر" : "Within 3-6 Months"}
              </option>
            </select>
          </div>

          <div className="md:col-span-2 flex flex-col gap-2">
            <label htmlFor="message" className="font-semibold">
              {locale === "ar" ? "الرسالة" : "Message"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
              className={`bg-gray-50 p-3 w-full rounded border border-gray-200`}
              placeholder={
                locale === "ar"
                  ? "أدخل رسالتك هنا.."
                  : "Enter your Message here.."
              }
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
                className="m-2"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              <label htmlFor="agreeTerms">
                {locale === "ar" ? "أوافق على" : "I agree with"}{" "}
                <Link
                  href="/terms"
                  className="underline cursor-pointer mx-1 text-primary hover:text-primary-dark"
                >
                  {locale === "ar" ? "شروط الاستخدام" : "Terms of Use"}{" "}
                </Link>{" "}
                and {locale === "ar" ? "" : "and"}
                <Link
                  href="/privacy"
                  className="underline cursor-pointer mx-1 text-primary hover:text-primary-dark"
                >
                  {" "}
                  {locale === "ar" ? "سجّل اهتمامك" : " Privacy Policy"}{" "}
                </Link>
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
                  {locale === "ar" ? "يتم الإرسال" : "Sending..."}
                </span>
              ) : (
                <span>
                  {" "}
                  {locale === "ar" ? "سجّل اهتمامك" : " Register Your Interest"}
                </span>
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
