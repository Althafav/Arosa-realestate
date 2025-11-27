import { Footer } from "@/models/footer";
import Globals from "@/modules/Globals";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";
import { HiOutlinePhone } from "react-icons/hi2";
import SpinnerComponent from "./UI/SpinnerComponent";
import { Menuitem } from "@/models/menuitem";

export default function FooterComponent() {
  const [pageData, setPageData] = useState<Footer | null>(null);

  useEffect(() => {
    Globals.KontentClient.item("footer")
      .withParameter("depth", "3")
      .toObservable()
      .subscribe((response: any) => {
        setPageData(response.item);
      });
  }, []);

  if (!pageData) {
    return <></>;
  }

  return (
    <>
      <div className=" bg-white    ">
        <div className="container mx-auto">
          <div className="flex lg:flex-row flex-col gap-5 justify-between items-center py-10 w-full">
            <div>
              <h4 className="lg:text-3xl text-2xl font-semibold text-primary mb-3">
                Need help? Talk to our expert.
              </h4>

              <p className="font-semibold text-primary text-sm">
                Talk to our experts or Browse through more properties.
              </p>
            </div>

            <div className="flex items-center gap-5 lg:flex-row flex-col">
              <Link
                href="/contact"
                className="flex  gap-2 items-center rounded border-2 font-semibold text-primary border-primary p-3 bg-white"
              >
                <span>Contact Us</span>
                <GoArrowUpRight className="text-primary" size={20} />
              </Link>

              <Link
                href="tel:+971 56 991 6229"
                className="flex gap-2 items-center rounded border-2 font-semibold text-white border-primary p-3 bg-primary"
              >
                <HiOutlinePhone className="text-white" size={20} />
                <span>+971 56 991 6229</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary py-10 footer-component-wrapper relative">
        <div className="container mx-auto lg:px-20 ">
          <div className="flex lg:gap-20 gap-10 lg:flex-row flex-col">
            <div className="lg:w-1/3 flex justify-between flex-col">
              <div className="mb-5">
                <Image
                  width={120}
                  height={120}
                  className="mb-5 object-contain"
                  src="/assets/logos/arosa-logo-white.png"
                  alt="Arosa Logo"
                />
                <div>
                  <p className="max-w-[250px] text-white font-light mb-1">
                    {pageData.address.value}
                  </p>
                  <p className="text-white font-light mb-1">
                    {pageData.phone1.value}
                  </p>
                  <p className="text-white font-light mb-1">
                    {pageData.phone2.value}
                  </p>
                  <p className="text-white font-light mb-1">
                    {pageData.email.value}
                  </p>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-3 text-white">
                  Follow us on Social Media
                </p>

                <div className="flex gap-5 items-center">
                  <Link href={pageData.facebooklink.value} target="_blank">
                    <FaFacebook className="text-white" size={20} />
                  </Link>
                  {/* <Link href={pageData.xlink.value} target="_blank">
                    <FaXTwitter className="text-white" size={20} />
                  </Link> */}
                  <Link href={pageData.instagramlink.value} target="_blank">
                    <FaInstagram className="text-white" size={20} />
                  </Link>
                  <Link href={pageData.linkedinlink.value} target="_blank">
                    <FaLinkedinIn className="text-white" size={20} />
                  </Link>

                  <Link href={pageData.tiktoklink.value} target="_blank">
                    <FaTiktok size={20} className="text-white" />
                  </Link>

                  <Link href={pageData.youtubelink.value} target="_blank">
                    <FaYoutube size={20} className="text-white" />
                  </Link>

                
                </div>
              </div>
            </div>

            <div className="lg:w-2/3">
              {/* <div className="subscribe-form ">
              <p className="font-semibold mb-3 text-white">
                Keep Yourself Up to Date
              </p>
              <form action="">
                <div className="bg-white/20 p-5 rounded-xl flex justify-between">
                  <input
                    placeholder="Your Email"
                    type="text"
                    className="w-full text-white focus:outline-none"
                  />

                  <div>
                    <p className="text-white font-semibold cursor-pointer">
                      Subscribe
                    </p>
                  </div>
                </div>
              </form>
            </div> */}
              <div className=" grid grid-cols-1 md:grid-cols-3 gap-8 text-left py-10">
                {/* {footerLinks.map((section, index) => (
                <div key={index}>
                  <h3 className="font-semibold mb-3 text-white">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link, idx) => (
                      <li
                        key={idx}
                        className="text-white font-light hover:underline cursor-pointer"
                      >
                        {link}
                      </li>
                    ))}
                  </ul>
                </div>
              ))} */}
                {/* <div>
                  <h3 className="font-semibold mb-3 text-white">
                    Popular Search
                  </h3>
                  <div>
                    <ul className="space-y-2">
                      {pageData.popularsearchitems.value.map(
                        (m: any, index: number) => {
                          const item: Menuitem = m;
                          return (
                            <li
                              key={index}
                              className="text-white font-light hover:underline cursor-pointer"
                            >
                              <Link href={item.link.value}>
                                {item.name.value}
                              </Link>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </div>
                </div> */}

                <div>
                  <h3 className="font-semibold mb-3 text-white">Quick Links</h3>
                  <div>
                    <ul className="space-y-2">
                      {pageData.quicklinksitems.value.map(
                        (m: any, index: number) => {
                          const item: Menuitem = m;
                          return (
                            <li
                              key={index}
                              className="text-white font-light hover:underline cursor-pointer"
                            >
                              <Link href={item.link.value}>
                                {item.name.value}
                              </Link>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </div>
                </div>

                {/* <div>
                  <h3 className="font-semibold mb-3 text-white">Discovery</h3>
                  <div>
                    <ul className="space-y-2">
                      {pageData.discoveryitems.value.map(
                        (m: any, index: number) => {
                          const item: Menuitem = m;
                          return (
                            <li
                              key={index}
                              className="text-white font-light hover:underline cursor-pointer"
                            >
                              <Link href={item.link.value}>
                                {item.name.value}
                              </Link>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-20">
          <hr className="border-white mb-5" />
          <div className="flex lg:flex-row flex-col justify-between gap-3">
            <p className="text-white">
              © Arosa real estate – All rights reserved
            </p>

            <div className="flex items-center gap-5 text-white">
              <Link href="terms-conditions">Terms & Conditions</Link>

              <Link href="/sitemap.xml">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
