import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { Contactpage } from "@/models/contactpage";
import Globals from "@/modules/Globals";
import React, { useEffect, useState } from "react";
import { FaPhone } from "react-icons/fa";
import { HiMapPin } from "react-icons/hi2";
import { IoMail } from "react-icons/io5";

export default function ContactUs() {
  const [pageData, setPageData] = useState<Contactpage | null>(null);

  useEffect(() => {
    Globals.KontentClient.item("contact_page")
      .toObservable()
      .subscribe((response: any) => {
        setPageData(response.item);
      });
  }, []);

  if (!pageData) {
    return <SpinnerComponent />;
  }
  return (
    <div className="contact-page-wrapper">
      <div className="banner-wrapper py-20 lg:pt-20 lg:pb-30 lg:mb-24   bg-primary relative">
        <div className="container mx-auto">
          <h1 className="lg:text-4xl text-3xl tracking-tight font-medium text-white mb-2">
            {pageData.bannerheading.value}
          </h1>
          <span
            className="text-white"
            dangerouslySetInnerHTML={{
              __html: pageData.bannersubheading.value,
            }}
          />

          <div className="floating-section-wrapper bg-white mt-10  p-5 rounded-xl  lg:absolute lg:-bottom-15 lg:left-1/2 lg:-translate-x-1/2">
            <div className="grid grid-cols-12 gap-3">
              <div className="lg:col-span-4 col-span-12">
                <div className="bg-primary rounded-xl text-white p-5 flex items-center justify-center flex-col">
                  <IoMail size={22} />
                  <p>info@arosarealestate.com</p>
                </div>
              </div>

              <div className="lg:col-span-4 col-span-12">
                <div className="bg-primary rounded-xl text-white p-5 flex items-center justify-center flex-col">
                  <FaPhone size={22} />
                  <p>+ 971 - 55 - 000 - 0000</p>
                </div>
              </div>

              <div className="lg:col-span-4 col-span-12">
                <div className="bg-primary rounded-xl text-white p-5 flex items-center justify-center flex-col">
                  <HiMapPin size={22} />
                  <p>info@arosarealestate.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* form section */}
      <div className="py-10 form-section">
        <div className="container mx-auto">
          <h2 className="lg:text-4xl text-3xl font-medium text-primary mb-3">
            {pageData.formheading.value}
          </h2>
          <span
            className="text-tertiary"
            dangerouslySetInnerHTML={{
              __html: pageData.formcontent.value,
            }}
          />

          <form action="" className="lg:p-20 ">
            <div className="grid grid-cols-12 gap-10">
              <div className="lg:col-span-4 col-span-12 flex flex-col gap-2">
                <label htmlFor="firstName" className="font-semibold">
                  First Name
                </label>
                <input
                  className="bg-white p-3 w-full rounded"
                  type="text"
                  placeholder="Enter First Name"
                />
              </div>

              <div className="lg:col-span-4 col-span-12 flex flex-col gap-2">
                <label htmlFor="lastName" className="font-semibold">
                  Last Name
                </label>
                <input
                  className="bg-white p-3 w-full rounded"
                  type="text"
                  placeholder="Enter Last Name"
                />
              </div>

              <div className="lg:col-span-4 col-span-12 flex flex-col gap-2">
                <label htmlFor="email" className="font-semibold">
                  Email
                </label>
                <input
                  className="bg-white p-3 w-full rounded"
                  type="text"
                  placeholder="Enter Your Email"
                />
              </div>

              <div className="lg:col-span-4 col-span-12 flex flex-col gap-2">
                <label htmlFor="phone" className="font-semibold">
                  Phone
                </label>
                <input
                  className="bg-white p-3 w-full rounded"
                  type="text"
                  placeholder="Enter Phone Number"
                />
              </div>

              <div className="lg:col-span-4 col-span-12 flex flex-col gap-2">
                <label htmlFor="inquiryType" className="font-semibold">
                  Inquiry Type
                </label>
                <input
                  className="bg-white p-3 w-full rounded"
                  type="text"
                  placeholder="Select Inquiry Type"
                />
              </div>

              <div className="lg:col-span-4 col-span-12 flex flex-col gap-2">
                <label htmlFor="phone" className="font-semibold">
                  How Did You Hear About Us?
                </label>
                <input
                  className="bg-white p-3 w-full rounded"
                  type="text"
                  placeholder="Enter Phone Number"
                />
              </div>

              <div className="col-span-12 flex flex-col gap-2">
                <label htmlFor="phone" className="font-semibold">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="bg-white p-3 w-full rounded"
                  placeholder="Enter your Message here.."
                />
              </div>

              <div className="col-span-12 flex gap-5 lg:flex-row flex-col justify-between lg:items-center">
                <div>
                  <p>
                    I agree with{" "}
                    <span className="underline cursor-pointer mx-1">
                      {" "}
                      Terms of Use{" "}
                    </span>{" "}
                    and{" "}
                    <span className="underline cursor-pointer mx-1">
                      {" "}
                      Privacy Policy{" "}
                    </span>
                  </p>
                </div>

                <button className="bg-primary text-white p-3 rounded">
                  Send Your Message
                </button>
              </div>
            </div>
          </form>
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
