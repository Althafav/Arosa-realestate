import TeamCard from "@/components/Team/TeamCard";
import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { Aboutpage } from "@/models/aboutpage";
import { Cardblock } from "@/models/cardblock";
import { Teamitem } from "@/models/teamitem";
import Globals from "@/modules/Globals";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaLinkedin } from "react-icons/fa";

type PageProps = {
  pageData: Aboutpage | null;
};

export default function Page({ pageData }: PageProps) {
  if (!pageData) {
    return <SpinnerComponent />;
  }

  return (
    <div className="about-page-wrapper">
      <Head>
        <title>{pageData.metadataPagetitle.value}</title>
        <meta name="title" content={pageData.metadataMetatitle.value} />
        <meta
          name="description"
          content={pageData.metadataMetadescription.value}
        />
        <link rel="canonical" href="https://arosarealestate.com/about" />

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
      <div className="bg-primary py-20 inner-banner-section">
        <div className="container mx-auto">
          <h1 className="text-white  lg:text-4xl text-3xl mb-5">
            {pageData.bannerheading.value}
          </h1>
          <p
            className="text-white"
            dangerouslySetInnerHTML={{
              __html: pageData.bannersubheading.value,
            }}
          />
        </div>
      </div>

      {/* about */}

      <div className=" about-section py-10  ">
        <div className="container mx-auto">
          <div className="flex lg:flex-row flex-col gap-20">
            <div className="lg:w-1/2">
              <h2 className="text-primary mb-5 lg:text-4xl text-3xl font-semibold">
                {pageData.aboutheading.value}
              </h2>
              <span
                className="text-tertiary"
                dangerouslySetInnerHTML={{
                  __html: pageData.aboutcontent.value,
                }}
              />

              <div className="stats-section mt-10">
                <div className="flex flex-wrap gap-5">
                  <div className="stats-item bg-white rounded-xl p-5">
                    <p className="text-primary text-3xl font-bold mb-2">
                      {pageData.customercount.value}
                    </p>
                    <p className="text-tertiary font-light text-sm">
                      Happy Customers
                    </p>
                  </div>
                  <div className="stats-item bg-white rounded-xl p-5">
                    <p className="text-primary text-3xl font-bold mb-2">
                      {pageData.propertiescount.value}
                    </p>
                    <p className="text-tertiary font-light text-sm">
                      Properties For Clients
                    </p>
                  </div>

                  <div className="stats-item bg-white rounded-xl p-5">
                    <p className="text-primary text-3xl font-bold mb-2">
                      {pageData.experiencecount.value}
                    </p>
                    <p className="text-tertiary font-light text-sm">
                      Years of Experience
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <Image
                width={1200}
                height={800}
                className="w-full bg-white object-contain rounded-xl"
                src={pageData.aboutimage.value[0]?.url}
                alt={pageData.aboutheading.value}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}

      <div className="values-section-wrapper py-10">
        <div className="container mx-auto">
          <div className="flex lg:flex-row flex-col lg:gap-20 gap-10">
            <div className="lg:w-1/3">
              <h2 className="text-primary mb-5 lg:text-4xl text-3xl font-semibold">
                {pageData.ourvaluesheading.value}
              </h2>
              <span
                className="text-tertiary"
                dangerouslySetInnerHTML={{
                  __html: pageData.ourvaluescontent.value,
                }}
              />
            </div>

            <div className="lg:w-2/3 w-full">
              <div className=" bg-white p-10 rounded-xl">
                <div className="grid grid-cols-12 lg:gap-10 gap-5">
                  {pageData.ourvaluesitems.value.map(
                    (m: any, index: number) => {
                      const item: Cardblock = m;
                      return (
                        <div
                          key={item.system.id}
                          className="lg:col-span-6 col-span-12 lg:border-r border-primary pr-5 even:border-none"
                        >
                          <div className="">
                            <div className="flex gap-2 items-center mb-3 w-full">
                              <Image
                                width={60}
                                height={60}
                                src={item.image.value[0]?.url}
                                alt={item.name.value}
                                className="w-[42px] object-contain"
                              />

                              <p className="font-semibold text-primary text-xl">
                                {item.name.value}
                              </p>
                            </div>
                          </div>

                          <span
                            className="text-tertiary"
                            dangerouslySetInnerHTML={{
                              __html: item.content.value,
                            }}
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* achivements */}
      <div className=" achivements-section py-10  ">
        <div className="container mx-auto">
          <div className="">
            <div className="">
              <h2 className="text-primary mb-5 lg:text-4xl text-3xl font-semibold">
                {pageData.ourachievementsheading.value}
              </h2>
              <span
                className="text-tertiary"
                dangerouslySetInnerHTML={{
                  __html: pageData.ourachievementscontent.value,
                }}
              />

              <div className="achivements-items mt-10">
                <div className="grid grid-cols-12 gap-5">
                  {pageData.ourachievementsitems.value.map(
                    (m: any, index: number) => {
                      const item: Cardblock = m;
                      return (
                        <div
                          className="achivement-item bg-white rounded-xl p-5 lg:col-span-4 col-span-6 lg:last:col-span-4 last:col-span-12"
                          key={item.system.id}
                        >
                          <p className="text-primary lg:text-2xl text-xl font-bold mb-2">
                            {item.name.value}
                          </p>
                          <span
                            className="text-tertiary"
                            dangerouslySetInnerHTML={{
                              __html: item.content.value,
                            }}
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process section */}
      <div className=" achivements-section py-10  ">
        <div className="container mx-auto">
          <h2 className="text-primary mb-5 lg:text-4xl text-3xl font-semibold">
            {pageData.processheading.value}
          </h2>
          <span
            className="text-tertiary"
            dangerouslySetInnerHTML={{
              __html: pageData.processcontent.value,
            }}
          />

          <div className="process-items grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-16">
            {pageData.processitems.value.map((m: any, index: number) => {
              const item: Cardblock = m;
              return (
                <div key={item.system.id} className="h-full">
                  <div className="group relative bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 h-full ">
                    {/* Step badge */}
                    <div className="absolute -top-5 left-6 bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold px-4 py-1 rounded-full shadow-md">
                      Step {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </div>

                    {/* Card content */}
                    <div className="pt-6">
                      <h4 className="text-xl font-semibold text-primary mb-4 group-hover:text-secondary transition-colors duration-300">
                        {item.name.value}
                      </h4>
                      <div
                        className="text-gray-600 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: item.content.value }}
                      />
                    </div>

                    {/* Decorative bar or accent */}
                    <div className="mt-6 h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full" />
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
                src={pageData.whychooseimage.value[0]?.url}
                alt={pageData.whychooseheading.value}
                width={400}
                height={600}
                style={{ width: "100%" }}
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <h2 className="text-primary mb-5 lg:text-4xl text-3xl font-semibold">
                {pageData.whychooseheading.value}
              </h2>
              <span
                className="text-tertiary"
                dangerouslySetInnerHTML={{
                  __html: pageData.whychoosecontent.value,
                }}
              />

              <div className="py-10 flex flex-col gap-5">
                {pageData.whychooseitems.value.map((m: any, index: number) => {
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

      {/* Arosa Team */}

     
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response: any = await Globals.KontentClient.item(
      "about_page_2025"
    )
      .withParameter("depth", "4")
      .toPromise();

    const pageData = JSON.parse(JSON.stringify(response.item));

    return {
      props: {
        pageData,
      },
    };
  } catch (error) {
    console.error("Error fetching page content:", error);
    return {
      props: {
        pageData: null,
      },
    };
  }
};
