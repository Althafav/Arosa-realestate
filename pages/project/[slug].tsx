import React from "react";
import { Projectitem } from "@/models/projectitem";
import Globals from "@/modules/Globals";
import { GetStaticPaths, GetStaticProps } from "next";
import Helper from "@/modules/Helper";
import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { MdLocationPin } from "react-icons/md";
import {FaRegCalendar, FaWhatsapp } from "react-icons/fa";
import ImageSwiper from "@/components/UI/Swipers/ProjectDetailImageSwiper";

import { HiLightningBolt } from "react-icons/hi";
import { Landmarkitem } from "@/models/landmarkitem";

import Image from "next/image";
import { Paymentplanitem } from "@/models/paymentplanitem";
import { Floorplanitem } from "@/models/floorplanitem";
import { IoCall } from "react-icons/io5";
import Link from "next/link";
import InquiryForm from "@/components/Form/InquiryForm";

interface SlugModel {
  slug: string;
}

function DetailPage({ projectItem }: { projectItem: Projectitem }) {
  if (!projectItem) {
    return <SpinnerComponent />;
  }

  

  return (
    <div className="project-detail-wrapper">
      <div className=" banner-wrapper h-[650px] relative gradient-1">
        <Image
          height={650}
          width={1200}
          className="inset-0 absolute -z-10 w-full h-[650px] object-cover"
          src={projectItem.image.value[0]?.url}
          alt={projectItem.name.value}
        />

        <div className="container mx-auto flex items-center h-[650px]">
          <div>
            <h1 className="lg:text-7xl text-4xl font-extrabold  text-white">
              {projectItem.name.value}
            </h1>
            <p className="text-2xl text-white font-light mb-7">
              {projectItem.developername.value}
            </p>
            <div className="flex items-center gap-4">
              <div className="border border-white flex items-center gap-1 p-2 rounded-md">
                <MdLocationPin color="white" className="font-bold" />{" "}
                <span className="text-white font-light">
                  {projectItem.location.value[0].name}
                </span>
              </div>

              <div className="border border-white flex items-center gap-1 p-2 rounded-md">
                <FaRegCalendar color="white" className="font-bold" />{" "}
                <span className="text-white font-light">
                  {projectItem.completion.value}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-content-section py-10">
        <div className="container mx-auto">
          {/* Project Head */}
          <div className="px-5 heading-section py-10 bg-white rounded-xl mb-5">
            <div className="flex justify-between lg:flex-row flex-col gap-3">
              <div className="">
                <h4 className="font-semibold text-primary text-2xl">
                  {projectItem.name.value}
                </h4>
                <div className="flex items-center gap-4 rounded-md">
                  <p className="font-light">
                    {projectItem.developername.value}
                  </p>
                  <div className="flex items-center gap-1">
                    <MdLocationPin className="font-bold text-black" />
                    <span className="text-black font-light">
                      {projectItem.location.value[0].name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="">
                <p className="text-tertiary font-medium text-sm">Price</p>
                <p className="text-primary font-semibold text-xl">
                  {projectItem.price.value}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 mt-10 gap-10">
              <div>
                <div className="flex justify-between">
                  <p>Property Type</p>
                  <p>{projectItem.propertytype.value[0].name}</p>
                </div>
                <hr className="my-3 border-tertiary" />
                <div className="flex justify-between">
                  <p>Down Payment</p>
                  <p>{projectItem.downpayment.value}</p>
                </div>

                <hr className="my-3 border-tertiary" />
              </div>
              <div>
                <div className="flex justify-between">
                  <p>Unit Type</p>
                  <p>{projectItem.unittype.value}</p>
                </div>

                <hr className="my-3 border-tertiary" />
                <div className="flex justify-between">
                  <p>Payment Plan</p>
                  <p>{projectItem.paymentplantype.value}</p>
                </div>

                <hr className="my-3 border-tertiary" />
              </div>

              <div>
                <div className="flex justify-between">
                  <p>Size</p>
                  <p>{projectItem.propertysize.value}</p>
                </div>

                <hr className="my-3 border-tertiary" />
                <div className="flex justify-between">
                  <p>Handover</p>
                  <p>{projectItem.completion.value}</p>
                </div>
                <hr className="my-3 border-tertiary" />
              </div>
            </div>
          </div>
          {/* Product Images */}
          <div className="image-section-container bg-primary p-5 rounded-xl">
            <ImageSwiper images={projectItem.image.value} />
          </div>

          {/* Project Body */}
          <div className="project-body-wrapper py-10">
            <div className="container mx-auto">
              <div className=" ">
                {/* Description */}
                <div className="bg-white p-5 rounded-xl   mb-4 description-section">
                  <h5 className="text-xl font-semibold text-primary mb-2">
                    Description
                  </h5>

                  <span
                    dangerouslySetInnerHTML={{
                      __html: projectItem.description.value,
                    }}
                  />

                  <hr className="border-tertiary border-b-2 mt-5 mb-5" />
                </div>

                {/* Features */}
                <div className="bg-white p-5  rounded-xl mb-4">
                  <h5 className="text-xl font-semibold text-primary mb-10">
                    {projectItem.featuresheading.value}
                  </h5>

                  {projectItem.featureitems.value
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

                {/* Facilities */}
                <div className="bg-white p-5  rounded-xl mb-4">
                  <h5 className="text-xl font-semibold text-primary mb-10">
                    {projectItem.facilitiesheading.value}
                  </h5>

                  <div className="grid lg:grid-cols-4 gap-5">
                    {projectItem.facilitiesitems.value
                      .split("|")
                      .map((m: any, index: number, array: any[]) => {
                        const isLastInRow =
                          (index + 1) % 4 === 0 || index === array.length - 1;
                        return (
                          <div
                            key={index}
                            className={`facilitity-card ${
                              !isLastInRow ? "lg:border-r" : ""
                            }`}
                          >
                            <div className="flex flex-col gap-2 items-center">
                              {m}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>

              {/* Location & Map */}
              <div className="bg-white p-5 mb-5 rounded-xl">
                <h5 className="text-xl font-semibold text-primary mb-10 flex items-center gap-2">
                  <MdLocationPin className="text-primary" />{" "}
                  {projectItem.location.value[0].name}
                </h5>
                <div className="flex lg:flex-row flex-col">
                  <div className="lg:w-1/2 h-[400px] mb-5 rounded-xl overflow-hidden">
                    <iframe
                      title="Project Location Map"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={projectItem.locationembedlink.value}
                    ></iframe>
                  </div>

                  <div className="lg:px-10 px-5 w-full  lg:w-1/2">
                    {projectItem.nearestlandmark.value.map(
                      (m: any, index: number) => {
                        const item: Landmarkitem = m;
                        return (
                          <div key={index} className="mb-5 last:mb-0 ">
                            <div className="flex justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <MdLocationPin className="text-primary" />
                                <span className="max-w-[200px] lg:max-w-[400px]">
                                  {item.name.value}
                                </span>
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

              {/* Floor plans Table */}
              <div className="floor-plans-wrapper mb-5 bg-white px-5 py-10 rounded-xl">
                <div className="flex justify-between mb-5">
                  <h2 className="text-xl font-semibold text-primary mb-10">
                    {projectItem.floorplanheading.value}
                  </h2>

                  <div>
                    <Link href={projectItem.downloadfloorplanlink.value} className="border-primary border rounded-lg text-primary px-3 py-2" target="_blank">
                      Download Floor Plan
                    </Link>
                  </div>
                </div>

                <table className="w-full  floorplan-table">
                  <thead>
                    <tr>
                      <th>Floor Plan</th>
                      <th>Category</th>
                      <th>Unit Type</th>
                      <th>Floor Details</th>
                      <th>Sizes</th>
                      <th>Type</th>
                    </tr>
                  </thead>

                  <tbody>
                    {projectItem.floorplanitems.value.map(
                      (m: any, index: number) => {
                        const item: Floorplanitem = m;
                        return (
                          <tr className="" key={`tr-${index}`}>
                            <td>
                              <Image
                                width={100}
                                height={100}
                                className="w-[100px] h-[100px] object-contain"
                                src={item.planimage.value[0]?.url}
                                alt={item.unittype.value}
                              />
                            </td>
                            <td data-label="Category">{item.category.value}</td>
                            <td data-label="Unit Type">
                              {item.unittype.value}
                            </td>
                            <td data-label="Floor Details">
                              {item.floordetails.value}
                            </td>
                            <td data-label="Sizes">{item.sizes.value}</td>
                            <td data-label="Type">{item.type.value}</td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>

              {/* Payment plans */}
              <div className="floor-plans-wrapper mb-5 bg-white px-5 py-10 rounded-xl">
                <div className="flex justify-between mb-5">
                  <h2 className="lg:text-3xl text-2xl font-bold text-primary">
                    {projectItem.paymentplansheading.value}
                  </h2>
                </div>

                <div className="grid lg:grid-cols-4">
                  {projectItem.paymentplanitems.value.map(
                    (m: any, index: number) => {
                      const item: Paymentplanitem = m;
                      return (
                        <div
                          className="flex flex-col items-center justify-center"
                          key={index}
                        >
                          <div className="p-5 ">
                            <h4 className="lg:text-6xl text-3xl text-center font-semibold text-black mb-2">
                              {item.percentage.value}
                            </h4>

                            <p className="font-normal text-sm text-center text-tertiary">
                              {item.name.value}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Form Section */}

              <div className="form-section-wrapper mb-5 bg-white px-5 py-10 rounded-xl">
                <div className="flex gap-10 lg:flex-row flex-col">
                  <div className="lg:w-4/12 w-full">
                    <h2 className="text-3xl text-primary font-semibold mb-5">
                      Inquire About {projectItem.name.value}
                    </h2>

                    <span
                      className="text-tertiary font-light mb-5"
                      dangerouslySetInnerHTML={{
                        __html:
                          "Interested in this property? Fill out the form below, and our real estate experts will get back to you with more details, including scheduling a viewing and answering any questions you may have.",
                      }}
                    />

                    <div className="flex gap-2 flex-col mt-5">
                      <Link
                        href={`https://wa.me/+971569916229`}
                        target="_blank"
                      >
                        <div className="bg-primary p-2 rounded-lg flex-1 flex items-center justify-center gap-1">
                          <FaWhatsapp className="text-white" size={20} />
                          <p className="text-white text-sm">Chat With Us Now</p>
                        </div>
                      </Link>

                      <Link href={`tel:+971569916229`} target="_blank">
                        <div className="bg-primary p-2 rounded-lg flex-1 flex items-center justify-center gap-1">
                          <IoCall className="text-white" size={20} />
                          <p className="text-white text-sm">Call Us</p>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="lg:w-7/12 w-full">
                    {/* form here */}
                    <InquiryForm projectName={projectItem?.name.value}/>
                  </div>
                </div>
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
      .withParameter("depth", "2")
      .toObservable()
      .toPromise()
      .then((r: any) => {
        return JSON.stringify(r.items);
      });

    const data: Array<Projectitem> = JSON.parse(datasourceStr);
    const { slug } = params as { slug: string };
    const projectItem = data.find(
      (item: Projectitem) => Helper.formatUrlParameter(item.name.value) === slug
    );

    return {
      props: {
        slug,
        projectItem: projectItem || null,
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
