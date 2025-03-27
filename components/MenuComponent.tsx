import { Menu } from "@/models/menu";
import { Menuitem } from "@/models/menuitem";
import Globals from "@/modules/Globals";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";

export default function MenuComponent() {
  const [pageData, setPageData] = useState<Menu | null>(null);
  const [menuToggle, setIsMenuToggle] = useState(false);
  useEffect(() => {
    const codename = "menu_2025";

    Globals.KontentClient.item(codename)
      .withParameter("depth", "3")
      .toObservable()
      .subscribe((response: any) => {
        setPageData(response.item);
      });
  }, []);

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

          <MdOutlineMenu size={32} className="cursor-pointer" onClick={handleMenuToggle}/>

          {menuToggle && (
            <div className="mobile-menu-container absolute left-0 right-0 top-[100px] bg-secondary z-10 h-[600px] w-full ">
              <div className="py-5 px-10">
                <ul className="menu-items flex flex-col  gap-5 mb-10">
                  {pageData.menuitems.value.map((m: any, index: number) => {
                    const item: Menuitem = m;
                    return (
                      <li key={`menuitem-${index}`}>
                        <Link href={item.link.value}>
                          <span className="font-medium text-tertiary">
                            {" "}
                            {item.name.value}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div>
                  <div className="flex flex-col gap-5 ">
                    <div className="">
                      <p className="text-tertiary">
                        {pageData.phonelabel.value}
                      </p>
                      <p className="font-bold">{pageData.phonenumber.value}</p>
                    </div>

                    <div className="">
                      <p className="text-tertiary">
                        {pageData.emaillabel.value}
                      </p>
                      <p className="font-bold">{pageData.email.value}</p>
                    </div>

                    <div className="">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: pageData.address.value,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="hidden lg:flex justify-between   items-center bg-mid border-b-2 border-gray-300 pb-5">
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
            <FaLinkedinIn size={34} className="bg-white p-[8px] rounded" />
            <FaFacebook size={34} className="bg-white p-[8px] rounded" />
            <FaInstagram size={34} className="bg-white p-[8px] rounded" />
          </div>

          <div className="flex items-center gap-10  ">
            <div className="border-r-2 border-gray-300 pr-5">
              <p className="text-tertiary">{pageData.phonelabel.value}</p>
              <p className="font-bold">{pageData.phonenumber.value}</p>
            </div>

            <div className="border-r-2 border-gray-300 pr-5">
              <p className="text-tertiary">{pageData.emaillabel.value}</p>
              <p className="font-bold">{pageData.email.value}</p>
            </div>

            <div className="">
              <p dangerouslySetInnerHTML={{ __html: pageData.address.value }} />
            </div>
          </div>
        </div>
        <ul className="menu-items lg:flex hidden gap-10 py-2">
          {pageData.menuitems.value.map((m: any, index: number) => {
            const item: Menuitem = m;
            return (
              <li key={`menuitem-${index}`}>
                <Link href={item.link.value}>
                  <span className="font-medium text-tertiary">
                    {" "}
                    {item.name.value}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
