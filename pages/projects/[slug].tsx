import React, { useState } from "react";
import { Projectitem } from "@/models/projectitem";
import Globals from "@/modules/Globals";
import { GetStaticPaths, GetStaticProps } from "next";

import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { MdLocationPin } from "react-icons/md";

import Image from "next/image";

import Link from "next/link";

import Head from "next/head";
import { useRouter } from "next/router";

import { Projectitem2025 } from "@/models/projectitem2025";
import ProjectDetailImageSwiper2 from "@/components/UI/Swipers/ProjectDetailImageSwiper2";
import H2Block from "@/components/blocks/H2Block";
import H3Block from "@/components/blocks/H3Block";
import CampignForm from "@/components/Form/CampignForm";

function DetailPage({
  projectItem,
  locale,
}: {
  projectItem: Projectitem2025;
  locale: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const UrlPath = `https://arosarealestate.com${router.asPath.split("?")[0]}`;
  if (!projectItem) {
    return <SpinnerComponent />;
  }

  return (
    <div className="project-detail-wrapper ">
      <Head>
        <title>{projectItem.metadataPagetitle.value}</title>
        <meta name="title" content={projectItem.metadataMetatitle.value} />
        <meta
          name="description"
          content={projectItem.metadataMetadescription.value}
        />
        <link rel="canonical" href={UrlPath} />

        <meta
          property="og:title"
          content={projectItem.metadataPagetitle.value}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content={projectItem.metadataMetadescription.value}
        />
        <meta property="og:url" content={UrlPath} />
        <meta property="og:site_name" content={Globals.SITE_NAME} />
        <meta
          property="og:image"
          content="https://arosarealestate.com/assets/logos/ArosaLogo.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={projectItem.metadataPagetitle.value}
        />
        <meta
          name="twitter:description"
          content={projectItem.metadataMetadescription.value}
        />
        <meta
          name="twitter:image"
          content="https://arosarealestate.com/assets/logos/ArosaLogo.png"
        />
        <meta
          name="twitter:image:alt"
          content={projectItem.metadataPagetitle.value}
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container mx-auto mb-5">
        <div className="flex justify-between flex-wrap gap-3">
          <div className="">
            <H2Block>{projectItem.propertyname.value}</H2Block>
            <p>{projectItem.location.value}</p>
          </div>

          <div>
            <p>{projectItem.pricelabel.value}</p>
            <p className="text-primary text-2xl sm:text-3xl  font-medium tracking-tight">
              {projectItem.price.value}
            </p>
          </div>
        </div>
      </div>

      <div className="">
        <ProjectDetailImageSwiper2 images={projectItem.images.value} />
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-5 h-full relative">
          <div className="col-span-12 sm:col-span-8">
            <div className="overview-section py-5 sm:py-10">
              <H2Block className="">
                {projectItem.overviewheading.value}
              </H2Block>
              <H3Block className="mb-5">
                {projectItem.overviewsubheading.value}
              </H3Block>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {projectItem.overviewitems.value.map((item: any, index) => {
                  return (
                    <div
                      key={item.system.id}
                      className={`flex gap-2  p-2 rounded-xl ${
                        index === 0 ? "bg-primary text-white" : "bg-white"
                      }`}
                    >
                      <div
                        className={`"aspect-video shadow-md rounded ${
                          index === 0 ? "bg-white/10" : "bg-white"
                        }`}
                      >
                        <img
                          src={item.image.value[0].url}
                          alt={item.image.value[0].description}
                          className="object-contain p-3"
                        />
                      </div>
                      <div className="flex flex-col justify-evenly">
                        <p>{item.label.value}</p>
                        <p className="font-bold">{item.value.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="about-section py-5 sm:py-10">
              <div>
                <div
                  className={`
    prose max-w-none
    prose-h2:text-primary prose-h2:font-bold
    prose-h2:text-2xl sm:prose-h2:text-3xl md:prose-h2:text-4xl
    prose-h2:mb-3
    ${isExpanded ? "" : "line-clamp-4"}
  `}
                  dangerouslySetInnerHTML={{
                    __html: projectItem.aboutcontent.value,
                  }}
                />

                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 text-primary font-medium hover:underline"
                >
                  {isExpanded ? (
                    <div>{locale === "ar" ? "عرض أقل" : "Show less"}</div>
                  ) : (
                    <span>{locale === "ar" ? "للمزيد" : " Read More"}</span>
                  )}
                </button>
              </div>
            </div>

            <div className="amenities-section py-5 sm:py-10">
              <H2Block className="">
                {projectItem.amenitiesheading.value}
              </H2Block>
              <H3Block className="mb-5">
                {projectItem.amenitiessubheading.value}
              </H3Block>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                {projectItem.amenities.value.map((item: any) => {
                  return (
                    <div key={item.system.id} className="bg-white rounded">
                      <img
                        src={item.image.value[0].url}
                        alt=""
                        className="w-full object-cover"
                      />
                      <div className="p-2">
                        <p className="font-medium">{item.name.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="py-10">
                <Link
                  className="w-full block bg-primary text-center  p-2 rounded text-white"
                  href={projectItem.downloadbrochurelink.value}
                >
                  {projectItem.downloadbrochurelabel.value}
                </Link>
              </div>
            </div>

            <div className="floorplan-section py-5 sm:py-10">
              <H2Block className="">
                {projectItem.floorplanheading.value}
              </H2Block>
              <H3Block className="mb-5">
                {projectItem.floorplansubheading.value}
              </H3Block>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {projectItem.floorplanitems.value.map((item: any) => {
                  return (
                    <div key={item.system.id} className="bg-white rounded-2xl">
                      <div className="aspect-video p-2">
                        <Image
                          width={400}
                          height={400}
                          src={item.image.value[0].url}
                          alt=""
                          className="w-full  object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <p className="">{item.name.value}</p>
                        <p className="font-medium text-lg">
                          {item.price.value}
                        </p>
                        <p className="mt-3 text-gray-500">{item.size.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="py-10">
                <Link
                  className="w-full block bg-primary text-center  p-2 rounded text-white"
                  href={projectItem.downloadfloorplanlink.value}
                >
                  {projectItem.downloadfloorplanlabel.value}
                </Link>
              </div>
            </div>

            <div className="map-section p-5 my-10 bg-white rounded-2xl">
              <H2Block className="mb-5">{projectItem.mapheading.value}</H2Block>
              <iframe
                src={projectItem.maplink.value}
                width="100%"
                height="400"
                title="Example Website"
                style={{ border: "none" }}
                className="mb-5"
              />

              <div className="px-2">
                {projectItem.nearestlandmarkitems.value.map((item: any) => {
                  return (
                    <div key={item.system.id}>
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <MdLocationPin className="text-primary" />
                          <p>{item.name.value}</p>
                        </div>
                        <p>{item.distance.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="col-span-12 sm:col-span-4 ">
            <div className="relative min-h-full  ">
              <div className="sm:absolute top-10 ">
                <div className="bg-white h-full w-full sm:rounded-2xl">
                  <CampignForm
                    propertyName={projectItem.propertyname.value}
                    locale={locale}
                  />
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
      .type("projectitem2025")
      .withParameter("depth", "4")
      .toObservable()
      .toPromise()
      .then((r: any) => {
        return JSON.stringify(r.items);
      });

    const data: Array<Projectitem> = JSON.parse(datasourceStr);
    const allSlugs = data.map((item) => item.slug.value?.trim());

    // 2. remove empty or undefined slugs
    const validSlugs = allSlugs.filter((s): s is string => s.length > 0);

    // 3. dedupe in case your CMS has duplicates
    const uniqueSlugs = Array.from(new Set(validSlugs));

    // 4. build your paths
    const paths = uniqueSlugs.map((slug) => ({
      params: { slug },
    }));

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

export const getStaticProps: GetStaticProps = async (context: any) => {
  try {
    const slug = String(context.params?.slug || "");
    if (!slug) return { notFound: true };

    const locale = context.locale ?? context.defaultLocale ?? "en";
    const languageCode = locale === "ar" ? "ar" : "default";

    const response = await Globals.KontentClient.items()
      .type("projectitem2025")
      .equalsFilter("elements.slug", slug)
      .withParameter("depth", "4")
      .languageParameter(languageCode)
      .toPromise();

    if (!response.items.length) {
      return { notFound: true };
    }

    return {
      props: {
        projectItem: JSON.parse(JSON.stringify(response.items[0])),
        locale,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching project data:", error);
    return { notFound: true };
  }
};

export default DetailPage;
