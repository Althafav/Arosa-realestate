import React from "react";
import { Projectitem } from "@/models/projectitem";
import Globals from "@/modules/Globals";
import { GetStaticPaths, GetStaticProps } from "next";
import Helper from "@/modules/Helper";
import { useRouter } from "next/router";
import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { MdLocationPin } from "react-icons/md";
import { FaBath, FaRegCalendar } from "react-icons/fa";
import ImageSwiper from "@/components/UI/Swipers/ProjectDetailImageSwiper";
import { IoBed } from "react-icons/io5";
import { PiExcludeSquareThin } from "react-icons/pi";
import { HiLightningBolt } from "react-icons/hi";
import { Landmarkitem } from "@/models/landmarkitem";
import { Facilitiesitem } from "@/models/facilitiesitem";
import { Cardblock } from "@/models/cardblock";

import Image from "next/image";
import { Paymentplanitem } from "@/models/paymentplanitem";

interface SlugModel {
  slug: string;
}

function DetailPage({ data }: { data: Array<Projectitem> }) {
  const router = useRouter();

  const { slug } = router.query;
  const searchData = data.find(
    (f: Projectitem) => Helper.formatUrlParameter(f.name.value) === slug
  );

  if (!searchData) {
    return <SpinnerComponent />;
  }

  return (
    <div className="project-detail-wrapper">
      <div className=" banner-wrapper h-[650px] relative gradient-1">
        <Image
          height={650}
          width={1200}
          className="inset-0 absolute -z-10 w-full h-[650px] object-cover"
          src={searchData.image.value[0]?.url}
          alt={searchData.name.value}
        />

        <div className="container mx-auto flex items-center h-[650px]">
          <div>
            <h1 className="text-7xl font-extrabold  text-white">
              {searchData.name.value}
            </h1>
            <p className="text-2xl text-white font-light mb-7">
              {searchData.developername.value}
            </p>
            <div className="flex items-center gap-4">
              <div className="border border-white flex items-center gap-1 p-2 rounded-md">
                <MdLocationPin color="white" className="font-bold" />{" "}
                <span className="text-white font-light">
                  {searchData.location.value[0].name}
                </span>
              </div>

              <div className="border border-white flex items-center gap-1 p-2 rounded-md">
                <FaRegCalendar color="white" className="font-bold" />{" "}
                <span className="text-white font-light">
                  {searchData.completion.value}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-content-section py-10">
        <div className="container mx-auto">
          {/* Project Head */}
          <div className="px-5 heading-section py-10">
            <div className="flex justify-between ">
              <div className="flex gap-4 items-center">
                <h4 className="font-semibold text-primary text-2xl">
                  {searchData.name.value}
                </h4>
                <div className="border border-tertiary flex items-center gap-1 p-2 rounded-md">
                  <MdLocationPin className="font-bold text-tertiary" />{" "}
                  <span className="text-tertiary font-medium">
                    {searchData.location.value[0].name}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-tertiary font-medium text-sm">Price</p>
                <p className="text-primary font-semibold text-xl">
                  {searchData.price.value}
                </p>
              </div>
            </div>
          </div>
          {/* Product Images */}
          <div className="image-section-container bg-primary p-5 rounded-xl">
            <ImageSwiper images={searchData.image.value} />
          </div>

          {/* Project Body */}
          <div className="project-body-wrapper py-10">
            <div className="container mx-auto">
              <div className="lg:columns-2 columns-1  ">
                {/* Description */}
                <div className="bg-white p-5  break-inside-avoid rounded-xl mb-4">
                  <h5 className="text-xl font-semibold text-primary mb-2">
                    Description
                  </h5>

                  <span
                    dangerouslySetInnerHTML={{
                      __html: searchData.description.value,
                    }}
                  />

                  <hr className="border-tertiary border-b-2 mt-5 mb-5" />
                  <div className="grid grid-cols-3">
                    <div className="border-r-2 col-span-1">
                      <div className="flex items-center gap-2 mb-2">
                        <IoBed size={24} />
                        <span className="text-sm">Bedrooms</span>
                      </div>
                      <p className="text-primary text-xl font-semibold">
                        {searchData.bedroomcount.value}
                      </p>
                    </div>{" "}
                    <div className="border-r-2 pl-5 col-span-1">
                      <div className="flex items-center gap-2 mb-2">
                        <FaBath size={24} />
                        <span className="text-sm">Bathrooms</span>
                      </div>
                      <p className="text-primary text-xl font-semibold">
                        {searchData.bathroomcount.value}
                      </p>
                    </div>{" "}
                    <div className="col-span-1 pl-5">
                      <div className="flex items-center gap-2 mb-2">
                        <PiExcludeSquareThin size={24} />
                        <span className="text-sm">Area</span>
                      </div>
                      <p className="text-primary text-xl font-semibold">
                        {searchData.propertysize.value}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Location & Map */}
                <div className="bg-white p-5 break-inside-avoid rounded-xl mb-4">
                  <h5 className="text-xl font-semibold text-primary mb-10 flex items-center gap-2">
                    <MdLocationPin className="text-primary" />{" "}
                    {searchData.location.value[0].name}
                  </h5>
                  <div>
                    <div className="w-full h-[400px] mb-5">
                      <iframe
                        title="Project Location Map"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={searchData.locationembedlink.value}
                      ></iframe>
                    </div>

                    <div className="px-3 py-5  ">
                      {searchData.nearestlandmark.value.map(
                        (m: any, index: number) => {
                          const item: Landmarkitem = m;
                          return (
                            <div key={index} className="mb-5 last:mb-0 ">
                              <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                  <MdLocationPin className="text-primary" />
                                  <span>{item.name.value}</span>
                                </div>
                                <p>{item.distance.value}</p>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="bg-white p-5 break-inside-avoid rounded-xl mb-4">
                  <h5 className="text-xl font-semibold text-primary mb-10">
                    {searchData.featuresheading.value}
                  </h5>

                  {searchData.featureitems.value
                    .split("|")
                    .map((item: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className="bg-primary rounded-xl text-white mb-1 p-5"
                        >
                          <div className="flex gap-2 items-center">
                            <HiLightningBolt />
                            <span>{item}</span>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Features */}
                <div className="bg-white p-5 break-inside-avoid rounded-xl mb-4">
                  <h5 className="text-xl font-semibold text-primary mb-10">
                    {searchData.facilitiesheading.value}
                  </h5>

                  <div className="flex gap-10 flex-wrap">
                    {/* {searchData.facilitiesitems.value.map(
                      (m: any, index: number) => {
                        const item: Facilitiesitem = m;
                        return (
                          <div
                            key={index}
                            className="facilitity-card border-r pr-10 last:border-none last:pr-0"
                          >
                            <div className="flex flex-col gap-2 items-center">
                              <img
                                src={item.image.value[0]?.url}
                                alt=""
                                className="w-[24px]"
                              />
                              <span>{item.name.value}</span>
                            </div>
                          </div>
                        );
                      }
                    )} */}
                  </div>
                </div>
              </div>

              {/* Typical units and prices */}

              <div className="units-price-wrapper pt-5">
                <div className=" flex flex-col lg:flex-row">
                  <div className="lg:w-1/4 w-full mb-5">
                    <h2 className="lg:text-3xl text-2xl  font-bold text-primary">
                      {searchData.unitsheading.value}
                    </h2>
                  </div>

                  <div className="grid grid-cols-12 gap-5">
                    {searchData.unitsitems.value.map(
                      (m: any, index: number) => {
                        const item: Cardblock = m;
                        return (
                          <div
                            className="lg:col-span-4 col-span-12 bg-white rounded-xl"
                            key={index}
                          >
                            <div className="p-5 ">
                              <img
                                className="mb-3"
                                src={item.image.value[0]?.url}
                                alt={item.name.value}
                              />
                              <h4 className="text-xl font-bold">
                                {item.name.value}
                              </h4>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>

              {/* Payment plans */}
              <div className="units-price-wrapper pt-5">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/4 w-full mb-5">
                    <h2 className="lg:text-3xl text-2xl font-bold text-primary">
                      {searchData.paymentplansheading.value}
                    </h2>
                  </div>
                  <div className="lg:w-3/4 w-full">
                    <div className="grid grid-cols-12 gap-5">
                      {searchData.paymentplanitems.value.map(
                        (m: any, index: number) => {
                          const item: Paymentplanitem = m;
                          return (
                            <div
                              className="lg:col-span-4 col-span-12 bg-white rounded-xl"
                              key={index}
                            >
                              <div className="p-5 ">
                                <h4 className="text-4xl font-semibold text-primary">
                                  {item.percentage.value}
                                </h4>

                                <p className="font-semibold">{item.name.value}</p>

                                <p className="text-tertiary">{item.paymenttiming.value}</p>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* More Details */}
              <div className="more-details-section bg-white p-5 mt-5 rounded-xl">
                <h5 className="text-xl font-semibold text-primary mb-5">
                  More Details
                </h5>

                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">Completion Date</td>
                      <td className="p-2 flex justify-end">
                        <span>{searchData.completion.value}</span>
                      </td>
                    </tr>

                    <tr className="border-b">
                      <td className="p-2">Status</td>
                      <td className="p-2 flex justify-end">
                        <span>{searchData.status.value}</span>
                      </td>
                    </tr>

                    <tr className="border-b">
                      <td className="p-2">Property Type</td>
                      <td className="p-2 flex justify-end">
                        <span>{searchData.propertytype.value[0]?.name}</span>
                      </td>
                    </tr>

                    <tr className="border-b">
                      <td className="p-2">Unit Types</td>
                      <td className="p-2 flex justify-end">
                        <span>{searchData.unittype.value}</span>
                      </td>
                    </tr>

                    <tr className="border-b">
                      <td className="p-2">Floors</td>
                      <td className="p-2 flex justify-end">
                        <span>{searchData.floors.value}</span>
                      </td>
                    </tr>

                    <tr className="border-b">
                      <td className="p-2">Furnishing</td>
                      <td className="p-2 flex justify-end">
                        <span>{searchData.furnishing.value}</span>
                      </td>
                    </tr>

                    <tr className="border-b">
                      <td className="p-2">Service Charge</td>
                      <td className="p-2 flex justify-end">
                        <span>{searchData.servicecharge.value}</span>
                      </td>
                    </tr>

                    <tr className="border-b">
                      <td className="p-2">Readiness Progress</td>
                      <td className="p-2 flex justify-end">
                        <span>{searchData.readinessprogress.value}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const datasourceStr: string = await Globals.KontentClient.items()
      .type("projectitem")
      .toObservable()
      .toPromise()
      .then((r: any) => {
        return JSON.stringify(r.items);
      });

    const data: Array<Projectitem> = JSON.parse(datasourceStr);
    const ids: string[] = data.map((item: Projectitem) =>
      Helper.formatUrlParameter(item.name.value)
    );

    const paths = ids.map((slug) => ({ params: { slug } }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error generating paths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const datasourceStr: string = await Globals.KontentClient.items()
      .type("projectitem")
      .withParameter("depth", "4")
      .toObservable()
      .toPromise()
      .then((r: any) => {
        return JSON.stringify(r.items);
      });

    const data: Array<Projectitem> = JSON.parse(datasourceStr);
    const { slug } = params as { slug: string };

    return {
      props: {
        data,
        slug,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching project data:", error);
    return {
      props: {
        data: [],
        slug: params?.slug || "",
      },
      revalidate: 60,
    };
  }
};

export default DetailPage;
