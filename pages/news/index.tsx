import TeamCard from "@/components/Team/TeamCard";

import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { Meettheteampage } from "@/models/meettheteampage";
import { Newsitem } from "@/models/newsitem";
import { Newspage } from "@/models/newspage";
import { Teamitem } from "@/models/teamitem";
import Globals from "@/modules/Globals";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import React from "react";

type PageProps = {
  pageData: Newspage | null;
};

export default function Page({ pageData }: PageProps) {
  if (!pageData) {
    return <SpinnerComponent />;
  }

  return (
    <div className="meet-the-team-page">
      <Head>
        <title>{pageData.metadataPagetitle.value}</title>
        <meta name="title" content={pageData.metadataMetatitle.value} />
        <meta
          name="description"
          content={pageData.metadataMetadescription.value}
        />
        <link
          rel="canonical"
          href="https://arosarealestate.com/meet-the-team"
        />

        <meta property="og:title" content={pageData.metadataPagetitle.value} />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content={pageData.metadataMetadescription.value}
        />
        <meta
          property="og:url"
          content="https://arosarealestate.com/meet-the-team"
        />
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
          <div className="max-w-[1000px]">
            <h1 className="text-white  lg:text-4xl text-3xl mb-5">
              {pageData.bannerheading.value}
            </h1>
            <p className="text-white">{pageData.bannersubheading.value}</p>
          </div>
        </div>
      </div>

      <div className="news-contents my-10 container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pageData.newsitems.value.map((item: any, index: number) => {
            return (
              <Link key={index} href={`/news/${item.slug.value}`}>
                <Image
                  width={1080}
                  height={600}
                  className="aspect-video object-cover rounded-2xl"
                  src={item.image.value[0]?.url}
                  alt={item.name.value}
                />

                <div className="p-2">
                  <h4 className="leading-tight font-medium">
                    {item.name.value}
                  </h4>
                  <p className="text-md">
                    {item.system.lastModified
                      ? new Date(item.system.lastModified).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }
                        )
                      : ""}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response: any = await Globals.KontentClient.item("news_page")
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
