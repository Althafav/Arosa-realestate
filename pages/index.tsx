import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { Cardblock } from "@/models/cardblock";
import { Homepage } from "@/models/homepage";
import { Partneritem } from "@/models/partneritem";
import Globals from "@/modules/Globals";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";

export default function Home() {
  const [pageData, setPageData] = useState<Homepage | null>(null);

  useEffect(() => {
    Globals.KontentClient.item("home_page_2025")
      .withParameter("depth", "4")
      .toObservable()
      .subscribe((response: any) => {
        setPageData(response.item);
      });
  }, []);

  if (!pageData) {
    return <SpinnerComponent />;
  }
  return (
    <div className="home-page-wrapper ">
      {/* banner */}
      <div className="banner-wrapper h-screen relative ">
        <Image
          width={800}
          height={600}
          src={pageData.bannerimage.value[0]?.url}
          alt=""
          className="h-full w-full absolute -z-10"
        />
        <div className="container mx-auto flex items-center justify-center h-full">
          <div className="pb-20">
            <h1 className="lg:text-6xl text-3xl text-white font-bold text-center mb-3">
              {pageData.bannerheading.value}
            </h1>
            <h3 className="text-white lg:text-2xl  text-center">
              {pageData.bannersubheading.value}
            </h3>
          </div>
        </div>
      </div>

      {/* partners */}
      <div className="partners-wrapper py-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-12  lg:gap-10 gap-5">
            {pageData.partneritems.value.map((m: any, index: number) => {
              const item: Partneritem = m;
              return (
                <div className="lg:col-span-3 col-span-6 " key={item.system.id}>
                  <img
                    src={item.image.value[0]?.url}
                    alt={item.name.value}
                    className="w-[120px] h-[120px] object-contain"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* about section */}
      <div className="about-section-wrapper py-10">
        <div className="container mx-auto">
          <div className="flex lg:flex-row flex-col items-center gap-5">
            <div className="lg:w-1/2 w-full">
              <h2 className="text-primary text-2xl lg:text-3xl font-semibold mb-8 max-w-[300px]">
                {pageData.aboutheading.value}
              </h2>
              <div className="mb-8 max-w-[340px]">
                <span
                  className="text-lg font-light "
                  dangerouslySetInnerHTML={{
                    __html: pageData.aboutcontent.value,
                  }}
                />
              </div>
              <ul className="flex flex-col gap-4 mb-10">
                {pageData.aboutitems.value.map((m: any, index: number) => {
                  const item: Cardblock = m;
                  return (
                    <li
                      key={`item-${index}`}
                      className="flex items-center gap-3"
                    >
                      <FaCheck
                        className="bg-primary text-white rounded-full p-[10px]"
                        size={30}
                      />
                      <span>{item.name.value}</span>
                    </li>
                  );
                })}
              </ul>

              <div>
                <button className="flex items-center bg-primary text-white py-2 px-4 rounded-xl">
                  <span>Learn More</span>
                  <GoArrowUpRight color="white" />
                </button>
              </div>
            </div>

            <div className="lg:w-3/4 w-full">
              <Image
                width={600}
                height={400}
                priority
                src={pageData.aboutimage.value[0]?.url}
                alt={pageData.aboutheading.value}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* how section */}
      <div className="how-section-wrapper py-10">
        <div className="container mx-auto">
          <h2 className="text-primary lg:text-3xl text-2xl font-semibold mb-4">
            {pageData.howheading.value}
          </h2>

          <div className="mb-10">
            <span
              dangerouslySetInnerHTML={{ __html: pageData.howcontent.value }}
            />
          </div>

          <div className="grid grid-cols-12  gap-5">
            {pageData.howitems.value.map((m: any, index: number) => {
              const item: Cardblock = m;
              return (
                <div
                  className="lg:col-span-4 sm:col-span-6 col-span-12 flex justify-center items-center"
                  key={item.system.id}
                >
                  <div className="howitem ">
                    <div className="flex justify-center">
                      <Image
                        width={60}
                        height={60}
                        className="mb-8 object-contain"
                        src={item.image.value[0].url}
                        alt={item.name.value}
                      />
                    </div>
                    <p className="mb-3 text-center font-medium text-primary text-xl">
                      {item.name.value}
                    </p>
                    <span
                      className="text-center"
                      dangerouslySetInnerHTML={{ __html: item.content.value }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Why choose */}
      <div className="why-choose-section py-10">
        <div className="container mx-auto">
          <div className="flex lg:flex-row flex-col gap-20 items-center">
            <div className="lg:w-1/2 w-full">
              <Image
                src={pageData.whyimage.value[0]?.url}
                alt={pageData.whyheading.value}
                width={400}
                height={600}
                style={{ width: "100%" }}
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <h2 className="text-primary mb-5 text-2xl  lg:text-3xl font-semibold">
                {pageData.whyheading.value}
              </h2>
              <span
                className="text-tertiary"
                dangerouslySetInnerHTML={{
                  __html: pageData.whycontent.value,
                }}
              />

              <div className="py-10 flex flex-col gap-5">
                {pageData.whyitems.value.map((m: any, index: number) => {
                  const item: Cardblock = m;
                  return (
                    <div key={item.system.id}>
                      <div className="flex gap-5 items-center">
                        <Image
                          width={60}
                          height={60}
                          src={item.image.value[0]?.url}
                          alt={item.name.value}
                          className="object-contain"
                        />

                        <div>
                          <h5 className="text-md font-semibold mb-3">
                            {item.name.value}
                          </h5>
                          <span
                            className="text-tertiary"
                            dangerouslySetInnerHTML={{
                              __html: item.content.value,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
