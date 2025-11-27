import TeamCard from "@/components/Team/TeamCard";

import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { Basiccontent } from "@/models/basiccontent";
import { Meettheteampage } from "@/models/meettheteampage";
import { Teamitem } from "@/models/teamitem";
import Globals from "@/modules/Globals";
import { GetServerSideProps } from "next";
import Head from "next/head";

import React from "react";

type PageProps = {
  pageData: Basiccontent | null;
  username: string;
};

export default function Page({ pageData, username }: PageProps) {
  if (!pageData) {
    return <SpinnerComponent />;
  }

  return (
    <div className="terms-condition-page">
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

      <div className="bg-primary py-10 inner-banner-section">
        <div className="container mx-auto">
          <h1 className="text-white  lg:text-4xl text-3xl">
            {pageData.metadataPagetitle.value}
          </h1>
        </div>
      </div>

      <div className="py-20">
        <div className="container mx-auto">
          <h2>Thank you{username ? `, ${username}` : ""}!</h2>
          <span
            className="prose"
            dangerouslySetInnerHTML={{ __html: pageData.content.value }}
          />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const params = context.query;
  const username = params.username || "";
  try {
    const response: any = await Globals.KontentClient.item("thankyou_page")
      .withParameter("depth", "4")
      .toPromise();

    const pageData = JSON.parse(JSON.stringify(response.item));

    return {
      props: {
        pageData,
        username,
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
