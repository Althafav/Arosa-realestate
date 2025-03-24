import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { Projectitem } from "@/models/projectitem";
import { Projectpage } from "@/models/projectpage";
import Globals from "@/modules/Globals";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { HiMapPin, HiOutlineSquare2Stack } from "react-icons/hi2";
import { MdLocationPin, MdOutlineKingBed } from "react-icons/md";
import Helper from "@/modules/Helper";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosArrowDropdownCircle, IoIosCash, IoIosCube } from "react-icons/io";
import { FaHouseChimneyWindow } from "react-icons/fa6";
import { FaRegCalendar } from "react-icons/fa";
import Image from "next/image";

export default function Projects() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageData, setPageData] = useState<Projectpage | null>(null);
  const [projects, setProjects] = useState<Projectitem[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);

  useEffect(() => {
    const pageSubscription = Globals.KontentClient.item("project_page")
      .toObservable()
      .subscribe({
        next: (response: any) => {
          setPageData(response.item);
        },
        error: (error: any) => {
          console.error("Error fetching project page data:", error);
          setIsLoading(false);
        },
      });

    // Fetch project items
    const projectsSubscription = Globals.KontentClient.items()
      .type("projectitem")
      .toObservable()
      .subscribe({
        next: (response: any) => {
          setProjects(response.items);
        },
        error: (error: any) => {
          console.error("Error fetching project items:", error);
          setIsLoading(false);
        },
      });

    return () => {
      pageSubscription.unsubscribe();
      projectsSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Calculate unique locations whenever projects change
    if (projects.length > 0) {
      const allLocations = projects.map((project) => project.location.value);
      const uniqueLocations = [...new Set(allLocations)];
      setLocations(uniqueLocations);

      const allProjectTypes = projects.map(
        (project) => project.propertytype.value
      );
      const uniqueProjectTypes = [...new Set(allProjectTypes)];
      setPropertyTypes(uniqueProjectTypes);
      setIsLoading(false);
    }
  }, [projects]);

  if (isLoading) {
    return <SpinnerComponent />;
  }

  if (!pageData) {
    return <SpinnerComponent />;
  }

  const filteredProjects = selectedLocation
    ? projects.filter((project) => project.location.value === selectedLocation)
    : projects;

  return (
    <div className="project-page-wrapper">
      <div className="banner-wrapper py-20 lg:pt-20 lg:pb-40  lg:mb-24 bg-primary relative">
        <div className="container mx-auto">
          <h1 className="lg:text-4xl text-3xl tracking-tight font-medium text-white mb-2">
            {pageData.bannerheading.value}
          </h1>
          <span
            className="text-white"
            dangerouslySetInnerHTML={{ __html: pageData.bannercontent.value }}
          />

          <div className="filter-section-wrapper mt-10  w-full lg:container mx-auto  lg:absolute lg:-bottom-20 lg:left-1/2 lg:-translate-x-1/2">
            <div className="flex lg:flex-row flex-col-reverse items-center lg:gap-10 gap-5 lg:mx-20 bg-white p-5 rounded-t-2xl">
              <div className="lg:w-10/12 w-full">
                <input
                  className="w-full text-gray-600 p-5 bg-white border-gray-300 border-2 rounded-xl focus:outline-none"
                  type="text"
                  placeholder="Search For A Property"
                />
              </div>
              <div className="lg:w-2/12 w-full">
                <button className="flex gap-2 items-center rounded border-2 font-semibold text-white border-primary p-3 bg-primary">
                  <IoSearchOutline className="text-white" size={20} />
                  <span>Find Property</span>
                </button>
              </div>
            </div>

            <div className="dropDown-items bg-white p-5 rounded-b-2xl lg:rounded-2xl flex flex-1 flex-wrap justify-between gap-5">
              <button className="relative dropDown-item text-white p-3 rounded-xl bg-primary flex flex-1 items-center">
                <HiMapPin />
                <select
                  className="dropDown-item w-full cursor-pointer appearance-none focus:ring-0 focus:outline-none text-white p-3 rounded-xl bg-primary flex-1 text-white"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  style={{
                    backgroundImage: `url('/assets/icons/dropdown-icon-arosa.svg')`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 10px center",
                    backgroundSize: "24px",
                  }}
                >
                  <option value="">All Location</option>
                  {locations.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </button>

              <button className="dropDown-item text-white p-3 rounded-xl bg-primary flex flex-1  items-center justify-between">
                <div className="flex gap-2 items-center">
                  <FaHouseChimneyWindow />
                  <span className="border-l px-2  border-white">
                    Property Type
                  </span>
                </div>

                <div>
                  <IoIosArrowDropdownCircle size={24} />
                </div>
              </button>

              <button className="dropDown-item text-white p-3 rounded-xl bg-primary flex flex-1  items-center justify-between">
                <div className="flex gap-2 items-center">
                  <IoIosCash />
                  <span className="border-l px-2  border-white">
                    Price Range
                  </span>
                </div>

                <div>
                  <IoIosArrowDropdownCircle size={24} />
                </div>
              </button>

              <button className="dropDown-item text-white p-3 rounded-xl bg-primary flex flex-1  items-center justify-between">
                <div className="flex gap-2 items-center">
                  <IoIosCube />
                  <span className="border-l px-2  border-white">
                    Property Size
                  </span>
                </div>

                <div>
                  <IoIosArrowDropdownCircle size={24} />
                </div>
              </button>

              <button className="dropDown-item text-white p-3 rounded-xl bg-primary flex flex-1  items-center justify-between">
                <div className="flex gap-2 items-center">
                  <FaRegCalendar />
                  <span className="border-l px-2  border-white">
                    Build Year
                  </span>
                </div>

                <div>
                  <IoIosArrowDropdownCircle size={24} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="projects-container-wrapper py-10">
        <div className="container mx-auto">
          <h2 className="lg:text-4xl text-3xl font-medium text-primary">
            {pageData.heading.value}
          </h2>

          <div className="grid grid-cols-12 projects-card-wrapper py-10 gap-5">
            {filteredProjects.map((m: any, index: number) => {
              const item: Projectitem = m;
              return (
                <div
                  className="lg:col-span-4 col-span-12 sm:col-span-6"
                  key={`project-${index}`}
                >
                  <Link
                    href={`/project/${Helper.formatUrlParameter(
                      item.name.value
                    )}`}
                  >
                    <div className="project-card bg-white p-5 rounded-2xl">
                      <Image
                        width={300}
                        height={256}
                        className="object-cover w-full h-[256px] rounded-2xl"
                        src={item.image.value[0]?.url}
                        alt={item.name.value}
                      />
                      <div className="p-3">
                        <div className="flex justify-between mb-5">
                          <div>
                            <h4 className="text-primary font-bold text-xl">
                              {item.name.value}
                            </h4>
                            <div className="flex items-center gap-2">
                              <MdLocationPin color="gray" />{" "}
                              <span className="font-light text-tertiary">
                                {item.location.value}
                              </span>
                            </div>
                          </div>

                          <p className="font-light text-tertiary text-sm">
                            {item.developername.value}
                          </p>
                        </div>

                        <div className="flex gap-10 mb-5">
                          <div className="flex items-center gap-2">
                            <MdOutlineKingBed />{" "}
                            <span>{item.bedroomcount.value}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <HiOutlineSquare2Stack />{" "}
                            <span>{item.propertysize.value}</span>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <div className="">
                            <p>Price</p>
                            <p className="text-primary text-xl font-bold">
                              {item.price.value}
                            </p>
                          </div>

                          <hr className="h-14 w-[1px] bg-gray-400" />

                          <div className=" ">
                            <p>Completion</p>
                            <p className="text-primary text-xl font-bold">
                              {item.completion.value}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
