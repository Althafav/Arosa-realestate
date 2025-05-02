import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";
import { HiOutlinePhone } from "react-icons/hi2";

export default function FooterComponent() {
  const address = `Office 703, Sobha Ivory 1 Building
Business Bay, Dubai, UAE`;
  const phone1 = `+971 56 991 6229 
`;
  const phone2 = `+971 58 589 3086
`;
  const email = `info@arosarealestate.com`;

  const footerLinks = [
    {
      title: "Popular Search",
      links: [
        "Apartment for Sale",
        "Apartment for Rent",
        "Offices for Sale",
        "Offices for Rent",
      ],
    },
    {
      title: "Quick Links",
      links: [
        "Terms of Use",
        "Privacy Policy",
        "Pricing Plans",
        "Our Services",
        "Contact",
        "Careers",
        "FAQs",
      ],
    },
    {
      title: "Discovery",
      links: ["Chicago", "Los Angeles", "New Jersey", "New York", "California"],
    },
  ];

  return (
    <div className="bg-primary py-10 footer-component-wrapper relative mt-40">
      <div className="floating-card rounded-xl bg-white flex lg:flex-row flex-col gap-5 justify-between items-center p-10 w-full max-w-[1400px]   absolute lg:-top-20 -top-30 left-1/2 -translate-x-1/2 ">
        <div>
          <h4 className="lg:text-3xl text-2xl font-semibold text-primary mb-3">
            Need help? Talk to our expert.
          </h4>

          <p className="font-semibold text-primary text-sm">
            Talk to our experts or Browse through more properties.
          </p>
        </div>

        <div className="flex items-center gap-5 lg:flex-row flex-col">
          <Link href="/contact" className="flex  gap-2 items-center rounded border-2 font-semibold text-primary border-primary p-3 bg-white">
            <span>Contact Us</span>
            <GoArrowUpRight className="text-primary" size={20} />
          </Link>

          <button className="flex gap-2 items-center rounded border-2 font-semibold text-white border-primary p-3 bg-primary">
            <HiOutlinePhone className="text-white" size={20} />
            <span>+971 56 991 6229</span>
          </button>
        </div>
      </div>
      <div className="container mx-auto lg:px-20 mt-20">
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
                  {address}
                </p>
                <p className="text-white font-light mb-1">{phone1}</p>
                <p className="text-white font-light mb-1">{phone2}</p>
                <p className="text-white font-light mb-1">{email}</p>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-3 text-white">
                Follow us on Social Media
              </p>

              <div className="flex gap-5 items-center">
                <FaFacebook className="text-white" size={20} />
                <FaXTwitter  className="text-white" size={20} />
                <FaInstagram className="text-white" size={20} />
                <FaLinkedinIn className="text-white" size={20} />
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
              {footerLinks.map((section, index) => (
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
              ))}
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
            <p>Privacy</p>
            <p>Terms</p>
            <p>Sitemap</p>
          </div>
        </div>
      </div>
    </div>
  );
}
