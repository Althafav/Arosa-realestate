import TeamCard from "@/components/Team/TeamCard";
import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { Meettheteampage } from "@/models/meettheteampage";
import Globals from "@/modules/Globals";
import React, { useEffect, useState } from "react";

export default function MeetTheTeam() {
  const [pageData, setPageData] = useState<Meettheteampage | null>(null);

  useEffect(() => {
    Globals.KontentClient.item("meet_the_team_page")
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
    <div className="meet-the-team-page">
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
          <div className="">
            {/* Management Team */}
            {pageData.managementteamitems.value.length > 0 && (
              <div className="">
                <h2 className="text-primary mb-5 text-center lg:text-3xl text-2xl font-semibold tracking-wide">
                  Management Team
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pageData.managementteamitems.value.map(
                    (m: any, i: number) => (
                      <div
                        key={i}
                        className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-center text-center"
                      >
                        <TeamCard item={m} />
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Sales Team */}
            {pageData.salesteamitems.value.length > 0 && (
              <section className="space-y-6 bg-gray-50 rounded-2xl p-8">
                <h2 className="text-primary text-center lg:text-3xl text-2xl font-semibold tracking-wide">
                  Sales Team
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pageData.salesteamitems.value.map((m: any, i: number) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-center text-center"
                    >
                      <TeamCard item={m} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Operations Team */}
            {pageData.operationalteamitems.value.length > 0 && (
              <section className="space-y-6">
                <h2 className="text-primary text-center lg:text-3xl text-2xl font-semibold tracking-wide">
                  Operations Team
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pageData.operationalteamitems.value.map(
                    (m: any, i: number) => (
                      <div
                        key={i}
                        className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-center text-center"
                      >
                        <TeamCard item={m} />
                      </div>
                    )
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
