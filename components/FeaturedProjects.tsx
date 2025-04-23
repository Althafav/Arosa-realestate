import { Projectitem } from "@/models/projectitem";
import { Projectpage } from "@/models/projectpage";
import Globals from "@/modules/Globals";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function FeaturedProjects() {
  const [pageData, setPageData] = useState<Projectpage | null>(null);

  useEffect(() => {
    const pageSubscription = Globals.KontentClient.item("project_page")
      .toObservable()
      .subscribe({
        next: (response: any) => {
          setPageData(response.item);
        },
        error: (error: any) => {
          console.error("Error fetching project page data:", error);
        },
      });

    return () => {
      pageSubscription.unsubscribe();
    };
  }, []);
  return (
    <div className="featured-projects-section py-10">
      <div className="container mx-auto">
        <div className="lg:flex  justify-between py-5">
          <h2 className="text-primary text-2xl lg:text-3xl font-semibold mb-3">
            Discover Our Best Deals
          </h2>

          <div>
            <Link className="bg-primary px-4 py-2 text-white" href="/offplan-projects">
              <span>Discover More</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-5">
          {pageData?.projectitems.value
            .slice(0, 4)
            .map((m: any, index: number) => {
              const item: Projectitem = m;
              return (
                <div className=" lg:col-span-3 col-span-12">
                  <div className="featured-project-item bg-white rounded-xl overflow-hidden">
                    <Image
                      width={270}
                      height={175}
                      className="object-cover w-full h-[175px] "
                      src={item.image.value[0]?.url}
                      alt={item.name.value}
                    />

                    <div className="p-2">
                      <h4 className="mb-3 font-medium">{item.name.value}</h4>
                      <p>AED {item.price.value}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
