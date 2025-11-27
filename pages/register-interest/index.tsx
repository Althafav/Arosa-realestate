import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { Contactpage } from "@/models/contactpage";
import Globals from "@/modules/Globals";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaPhone, FaCheck } from "react-icons/fa";
import { HiMapPin } from "react-icons/hi2";
import { IoMail } from "react-icons/io5";

export default function Page() {
  const router = useRouter();
  const [referrerTitle, setReferrerTitle] = useState<string | null>(null);
  const [mainsource, setMainSource] = useState<string | null>("Website");
  const [subsource, setSubSource] = useState<string | null>(null);
  const [property, setProperty] = useState<string | null>(null);
  const [pageData, setPageData] = useState<Contactpage | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    budgetRange: "",
    bedroomType: "",

    agreeTerms: false,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string | null;
  }>({ type: null, message: null });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { referrer, mainsource, subsource, property } = router.query;
    if (mainsource && typeof mainsource === "string") {
      setMainSource(mainsource);
    }

    if (subsource && typeof subsource === "string") {
      setSubSource(subsource);
    }

    if (property && typeof property === "string") {
      setProperty(property);
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
    Globals.KontentClient.item("campaign_form_page")
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

    if (!formData.budgetRange.trim())
      errors.budgetRange = "Budget Range is required";
    if (!formData.bedroomType.trim())
      errors.bedroomType = "Bedroom Type is required";

    if (!formData.agreeTerms) errors.agreeTerms = "You must agree to the terms";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
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
          : `https://arosarealestate.com${
              router.asPath || "/register-interest"
            }`;

      const notesLines = [
        `Property: ${property || "-"}`,
        `Budget Range: ${formData.budgetRange || "-"}`,
        `Bedroom Type: ${formData.bedroomType || "-"}`,
        `Main Source (query): ${mainsource || "-"}`,
        `Sub Source (query): ${subsource || "-"}`,
        `Page URL: ${currentUrl}`,
      ];

      const postData = {
        source: "website",

        contact_name: `${formData.firstName} ${formData.lastName}`.trim(),
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
        console.log(response, "Form submission response");
        setFormStatus({
          type: "success",
          message: "Thanks! Your message has been sent successfully.",
        });

        // Reset the form after success
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          budgetRange: "",
          bedroomType: "",
          agreeTerms: false,
        });
      } else {
        setFormStatus({
          type: "error",
          message:
            "We couldn't submit your request right now. Please try again shortly.",
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

  if (!pageData) {
    return <SpinnerComponent />;
  }

  const contactInfoItems = [
    {
      icon: <IoMail size={22} />,
      text: "info@arosarealestate.com",
      type: "email",
      link: "mailto:info@arosarealestate.com",
    },
    {
      icon: <FaPhone size={22} />,
      text: "+971 56 991 6229",
      type: "phone",
      link: "tel:+971569916229",
    },
    {
      icon: <HiMapPin size={22} />,
      text: "Office 703, Sobha Ivory 1 Building Business Bay, Dubai, UAE",
      type: "address",
      link: "https://maps.app.goo.gl/7f54ooKBuXztGink6",
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
      <Head>
        <title>{pageData.metadataPagetitle.value}</title>
        <meta name="title" content={pageData.metadataMetatitle.value} />
        <meta
          name="description"
          content={pageData.metadataMetadescription.value}
        />
        <link rel="canonical" href="https://arosarealestate.com/contact" />

        <meta property="og:title" content={pageData.metadataPagetitle.value} />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content={pageData.metadataMetadescription.value}
        />
        <meta property="og:url" content="https://arosarealestate.com/" />
        <meta property="og:site_name" content={Globals.SITE_NAME} />
        <meta
          property="og:image"
          content="https://arosarealestate.com/assets/logos/ArosaLogo.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageData.metadataPagetitle.value} />
        <meta
          name="twitter:description"
          content={pageData.metadataMetadescription.value}
        />
        <meta
          name="twitter:image"
          content="https://arosarealestate.com/assets/logos/ArosaLogo.png"
        />
        <meta
          name="twitter:image:alt"
          content={pageData.metadataPagetitle.value}
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
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
                <Link
                  href={item.link}
                  key={index}
                  className="bg-primary rounded-xl text-white p-5 flex items-center justify-center flex-col hover:bg-primary-dark transition-colors"
                >
                  <div className="mb-2">{item.icon}</div>
                  <p className="text-center">{item.text}</p>
                </Link>
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
                  <label htmlFor="lastName" className="font-semibold">
                    Whats your budget range for the property?
                  </label>
                  <input
                    className="bg-gray-50 p-3 w-full rounded border border-gray-200"
                    type="text"
                    placeholder="eg: AED200,000 - AED300,000"
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                  />

                  {formErrors.budgetRange && (
                    <p className="text-red-500 text-sm">
                      {formErrors.budgetRange}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="font-semibold">
                    What bedroom unit type are you interested in?
                  </label>
                  <input
                    className="bg-gray-50 p-3 w-full rounded border border-gray-200"
                    type="text"
                    placeholder="eg: 1 BHK, 2 BHK, etc."
                    name="bedroomType"
                    value={formData.bedroomType}
                    onChange={handleChange}
                  />

                  {formErrors.bedroomType && (
                    <p className="text-red-500 text-sm">
                      {formErrors.bedroomType}
                    </p>
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

      {/* map section */}

      <div className="map-section py-10">
        <div className="container mx-auto">
          <h2 className="text-primary mb-5 text-2xl  lg:text-3xl font-semibold">
            {pageData.locationheading.value}
          </h2>
          <span
            className="text-tertiary "
            dangerouslySetInnerHTML={{
              __html: pageData.locationcontent.value,
            }}
          />

          <div className="w-full h-[400px] my-5">
            <iframe
              title="Project Location Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={pageData.locationembedlink.value}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
