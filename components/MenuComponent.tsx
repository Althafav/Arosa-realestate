import { Menu } from "@/models/menu";
import { Menuitem } from "@/models/menuitem";
import Globals from "@/modules/Globals";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdKeyboardArrowDown, MdOutlineMenu } from "react-icons/md";

export default function MenuComponent() {
  const router = useRouter();
  const [pageData, setPageData] = useState<Menu | null>(null);
  const [menuToggle, setIsMenuToggle] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const toggleMobileItem = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  useEffect(() => {
    const codename = "menu_2025";

    Globals.KontentClient.item(codename)
      .withParameter("depth", "3")
      .toObservable()
      .subscribe((response: any) => {
        setPageData(response.item);
      });

    const handleRouteChange = () => setIsMenuToggle(false);
    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  if (!pageData) {
    return null;
  }

  const handleMenuToggle = () => {
    setIsMenuToggle((prev) => !prev);
  };

  return (
    <div className="menu-component-wrapper relative">
      <div className=" mx-auto container py-5">
        <div className="mobile-menu  justify-between items-center lg:hidden flex ">
          <Link href="/">
            <Image
              width={150}
              height={100}
              src={pageData.logo.value[0]?.url}
              alt="logo"
              priority
            />
          </Link>

          <MdOutlineMenu
            size={32}
            className="cursor-pointer"
            onClick={handleMenuToggle}
          />

          {menuToggle && (
            <div className="mobile-menu-container absolute left-0 right-0 top-[100px] bg-secondary z-10 h-[600px] w-full ">
              <div className="py-5 px-10">
                <ul className="menu-items flex flex-col  gap-5 mb-10">
                  {pageData.menuitems.value.map((item: any, i: number) => (
                    <li key={i}>
                      <div className="flex justify-between items-center">
                        {item.items?.value?.length > 0 ? (
                          // if there ARE sub-items, use a button to toggle submenu
                          <button
                            onClick={() => toggleMobileItem(i)}
                            className="w-full text-left flex items-center justify-between font-medium text-tertiary"
                          >
                            {item.name.value}
                            <MdKeyboardArrowDown
                              className={`ml-2 transform transition-transform duration-200 ${
                                expandedIndex === i ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        ) : (
                          // if NO sub-items, just a normal link
                          <Link
                            href={item.link.value}
                            className="font-medium text-tertiary"
                          >
                            {item.name.value}
                          </Link>
                        )}
                      </div>

                      {/* the collapsed submenu */}
                      {expandedIndex === i && item.items?.value?.length > 0 && (
                        <ul className="mt-2 pl-5 flex flex-col gap-2">
                          {item.items.value.map((child: any, j: number) => (
                            <li key={j}>
                              <Link
                                href={child.link.value}
                                className="font-medium text-tertiary hover:text-primary transition"
                              >
                                {child.name.value}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>

                <div>
                  <div className="flex flex-col gap-5 ">
                    <Link href={`tel:+971569916229`} className="">
                      <p className="text-tertiary">
                        {pageData.phonelabel.value}
                      </p>
                      <p className="font-bold">{pageData.phonenumber.value}</p>
                    </Link>

                    <Link href={`mailto:info@arosarealestate.com`} className="">
                      <p className="text-tertiary">
                        {pageData.emaillabel.value}
                      </p>
                      <p className="font-bold">{pageData.email.value}</p>
                    </Link>

                    <Link
                      href="https://maps.app.goo.gl/7f54ooKBuXztGink6"
                      className=""
                    >
                      <p
                        dangerouslySetInnerHTML={{
                          __html: pageData.address.value,
                        }}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="hidden lg:flex justify-between   items-center bg-mid  ">
          <Link href="/">
            <Image
              width={150}
              height={100}
              src={pageData.logo.value[0]?.url}
              alt="logo"
              priority
            />
          </Link>

          <div className="flex items-center gap-2 ">
            <Link href={pageData.linkedin.value} target="_blank">
              <FaLinkedinIn size={34} className="bg-white p-[8px] rounded" />
            </Link>
            <Link href={pageData.facebook.value} target="_blank">
              <FaFacebook size={34} className="bg-white p-[8px] rounded" />
            </Link>

            <Link href={pageData.instagram.value} target="_blank">
              <FaInstagram size={34} className="bg-white p-[8px] rounded" />
            </Link>

            <Link href={pageData.tiktoklink.value} target="_blank">
              <FaTiktok size={34} className="bg-white p-[8px] rounded" />
            </Link>

            <Link href={pageData.youtubelink.value} target="_blank">
              <FaYoutube size={34} className="bg-white p-[8px] rounded" />
            </Link>

            <Link href={pageData.xlink.value} target="_blank">
              <FaXTwitter size={34} className="bg-white p-[8px] rounded" />
            </Link>
          </div>

          <div className="flex items-center gap-10  ">
            <Link
              href="tel:+971569916229"
              className="border-r-2 border-gray-300 pr-5"
            >
              <p className="text-tertiary">{pageData.phonelabel.value}</p>
              <p className="font-bold">{pageData.phonenumber.value}</p>
            </Link>

            <Link
              href="mailto:info@arosarealestate.com"
              className="border-r-2 border-gray-300 pr-5"
            >
              <p className="text-tertiary">{pageData.emaillabel.value}</p>
              <p className="font-bold">{pageData.email.value}</p>
            </Link>

            <Link
              href="https://maps.app.goo.gl/7f54ooKBuXztGink6"
              target="_blank"
              className=""
            >
              <p dangerouslySetInnerHTML={{ __html: pageData.address.value }} />
            </Link>
          </div>
        </div>
        <hr className="border-t-2 border-gray-300 my-4" />
        <ul className="menu-items lg:flex hidden gap-10">
          {pageData.menuitems.value.map((m: any, index: number) => {
            const item: Menuitem = m;
            return (
              <li key={`menuitem-${index}`} className="relative group">
                <Link
                  href={item.link.value}
                  className="inline-flex items-center font-medium text-black"
                >
                  {item.name.value}
                  {/* only show arrow if there are sub-items */}
                  {item.items?.value?.length > 0 && (
                    <MdKeyboardArrowDown
                      className="
              ml-1 
              transform 
              transition-transform 
              duration-300 
              group-hover:rotate-180
            "
                    />
                  )}
                </Link>

                {item.items.value.length > 0 && (
                  <div className="absolute z-10 bg-white hidden group-hover:block top-full rounded-xl">
                    <ul>
                      {item.items.value.map((child: any, j: number) => (
                        <li key={j} className="px-4 py-2 whitespace-nowrap">
                          <Link href={child.link.value}>
                            <span className="font-medium text-black hover:text-primary transition duration-300">
                              {child.name.value}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
