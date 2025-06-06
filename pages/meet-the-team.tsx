import TeamCard from "@/components/Team/TeamCard";

import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { Meettheteampage } from "@/models/meettheteampage";
import { Teamitem } from "@/models/teamitem";
import Globals from "@/modules/Globals";
import { GetServerSideProps } from "next";
import Head from "next/head";

import React from "react";



type PageProps = {
  pageData: Meettheteampage | null;
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
            <span
              className="text-white"
              dangerouslySetInnerHTML={{
                __html: pageData.bannerdescription.value,
              }}
            />
          </div>
        </div>
      </div>

      <div className="team-section py-10">
        <div className="container mx-auto">
          <div className="grid gap-20">
            {/* Management Team */}
            {pageData.managementteamitems.value.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-primary mb text-start mb-5 lg:text-3xl text-2xl font-semibold tracking-wide">
                  Management Team
                </h2>

                <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
                  {pageData.managementteamitems.value.map(
                    (m: any, i: number) => {
                      const item: Teamitem = m;
                      return <TeamCard key={item.system.id} item={item} />;
                    }
                  )}
                </div>
              </div>
            )}

            {/* Sales Team */}
            {pageData.salesteamitems.value.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-primary text-start lg:text-3xl text-2xl font-semibold tracking-wide ">
                  Sales Team
                </h2>

                <div className="">
                  <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
                    {pageData.salesteamitems.value.map((m: any, i: number) => {
                      const item: Teamitem = m;
                      return <TeamCard key={item.system.id} item={item} />;
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Operations Team */}
            {pageData.operationalteamitems.value.length > 0 && (
              <section className="space-y-6">
                <h2 className="text-primary text-center lg:text-3xl text-2xl font-semibold tracking-wide">
                  Operations Team
                </h2>
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
                  {pageData.operationalteamitems.value.map(
                    (m: any, i: number) => {
                      const item: Teamitem = m;
                      return <TeamCard key={item.system.id} item={item} />;
                    }
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* <RadialPillar />
      <RadialPillar2/>
      <FlipCardPillars/>
      <PillarsTracksTabs/>
      <PillarsInteractivePattern/> */}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response: any = await Globals.KontentClient.item("meet_the_team_page")
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
