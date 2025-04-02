import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { Projectitem } from "@/models/projectitem";
import { Projectpage } from "@/models/projectpage";
import Globals from "@/modules/Globals";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

import { HiMapPin, HiOutlineSquare2Stack } from "react-icons/hi2";
import { MdLocationPin, MdOutlineKingBed } from "react-icons/md";
import Helper from "@/modules/Helper";
import { IoCall, IoMail, IoSearchOutline } from "react-icons/io5";
import { IoIosArrowDropdownCircle, IoIosCash, IoIosCube } from "react-icons/io";
import { FaHouseChimneyWindow, FaScaleBalanced } from "react-icons/fa6";
import { FaRegCalendar, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { LuImageUpscale } from "react-icons/lu";
import Head from "next/head";
import MinMaxSlider from "@/components/UI/Slider/MinMaxSlider";

const priceRanges = [
  { label: "Any Price", min: 0, max: 0 },
  { label: "500,000 - 1,000,000", min: 500000, max: 1000000 },
  { label: "1,000,000 - 2,000,000", min: 1000000, max: 2000000 },
  { label: "2,000,000 - 3,000,000", min: 2000000, max: 3000000 },
  { label: "3,000,000 - 5,000,000", min: 3000000, max: 5000000 },
  { label: "5,000,000 - 7,000,000", min: 5000000, max: 7000000 },
  { label: "7,000,000 - 10,000,000", min: 7000000, max: 10000000 },
  { label: "Over 10,000,000", min: 10000000, max: Infinity },
];

export default function Projects() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageData, setPageData] = useState<Projectpage | null>(null);
  const [projects, setProjects] = useState<Projectitem[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [propertySizes, setPropertySizes] = useState<string[]>([]);

  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    priceRange: 0,
    searchQuery: "",
  });

  useEffect(() => {
    const pageSubscription = Globals.KontentClient.item("project_page")
      .toObservable()
      .subscribe({
        next: (response: any) => {
          setPageData(response.item);

          const allProjects: Projectitem[] = response.item.projectitems.value;
          setProjects(allProjects);

          const allLocations = allProjects.flatMap(
            (item: any) => item.location.value[0].name
          );
          setLocations(allLocations);

          const allTypes = allProjects.flatMap(
            (item: any) => item.propertytype.value[0].name
          );

          setPropertyTypes(allTypes);
        },
        error: (error: any) => {
          console.error("Error fetching project page data:", error);
          setIsLoading(false);
        },
      });

    return () => {
      pageSubscription.unsubscribe();
    };
  }, []);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const parsePrice = (priceString: string): number => {
    if (!priceString) return 0;
    // Remove currency symbols, commas, etc. and parse to number
    const numericValue = priceString.replace(/[^\d.]/g, "");
    return parseFloat(numericValue) || 0;
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const price = parsePrice(project.price.value);
      const selectedRange = priceRanges[filters.priceRange];

      const locationMatch =
        !filters.location ||
        project.location.value[0].name === filters.location;
      const typeMatch =
        !filters.propertyType ||
        project.propertytype.value[0].name === filters.propertyType;
      const priceMatch =
        (selectedRange.min === 0 && selectedRange.max === 0) ||
        (price >= selectedRange.min && price <= selectedRange.max);

      const searchMatch =
        !filters.searchQuery ||
        project.name.value
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()) ||
        (project.description.value &&
          project.description.value
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase())) ||
        (project.location.value[0].name &&
          project.location.value[0].name
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase()));

      return locationMatch && typeMatch && priceMatch && searchMatch;
    });
  }, [filters, projects]);

  if (!pageData) {
    return <SpinnerComponent />;
  }

  const handlePriceRangeChange = (index: number) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: index,
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: e.target.value,
    }));
  };



  return (
    <>
      <Head>
        <title>OFF Plans | Arosa</title>
        <meta
          name="title"
          content="Explore Exclusive Off-Plan Projects in Dubai | Arosa Real Estate"
        />
        <meta
          name="description"
          content="Discover premium off-plan projects in Dubai with Arosa Real Estate. Invest in upcoming residential and commercial properties with expert guidance and exclusive deals."
        />{" "}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </Head>

      <div className="project-page-wrapper">
        <div className="banner-wrapper py-20 lg:pt-20 lg:pb-50  lg:mb-24 bg-primary relative">
          <div className="container mx-auto">
            <h1 className="lg:text-4xl text-3xl tracking-tight font-medium text-white mb-5">
              {pageData.bannerheading.value}
            </h1>
            <span
              className="text-white"
              dangerouslySetInnerHTML={{ __html: pageData.bannercontent.value }}
            />

            <div className="filter-section-wrapper mt-10  container mx-auto  lg:absolute lg:-bottom-20 lg:left-1/2 lg:-translate-x-1/2">
              <div className="flex lg:flex-row flex-col-reverse items-center lg:gap-10 gap-5 lg:mx-20 bg-white p-5 rounded-t-2xl">
                <div className="w-full">
                  <input
                    className="w-full text-gray-600 p-5 bg-white border-gray-300 border-2 rounded-xl focus:outline-none"
                    type="text"
                    placeholder="Search For A Property"
                    value={filters.searchQuery}
                    onChange={handleSearchChange}
                  
                  />
                </div>
                {/* <div className="lg:w-2/12 w-full">
                  <button
                    onClick={handleSearchClick}
                    className="flex gap-2 cursor-pointer items-center rounded border-2 font-semibold text-white border-primary p-3 bg-primary"
                  >
                    <IoSearchOutline className="text-white" size={20} />
                    <span>Find Property</span>
                  </button>
                </div> */}
              </div>

              <div className="dropDown-items bg-white p-5 rounded-b-2xl lg:rounded-2xl flex lg:flex-row flex-col flex-1 flex-wrap justify-between gap-5">
                <button className="relative dropDown-item text-white px-3 py-2 rounded-xl bg-primary flex  flex-1 items-center justify-between">
                  <HiMapPin />
                  <select
                    className="dropDown-item w-full cursor-pointer appearance-none focus:ring-0 focus:outline-none text-white p-3 rounded-xl bg-primary flex-1 "
                    value={filters.location}
                    onChange={(e) =>
                      handleFilterChange("location", e.target.value)
                    }
                    style={{
                      backgroundImage: `url('/assets/icons/dropdown-icon-arosa.svg')`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 10px center",
                      backgroundSize: "24px",
                      paddingRight: "60px",
                    }}
                  >
                    <option value="">All Location</option>
                    {locations.map((location: any, index: number) => (
                      <option key={index} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </button>

                <button className="dropDown-item text-white px-3 py-2 rounded-xl bg-primary flex flex-1  items-center justify-between">
                  <FaHouseChimneyWindow />
                  <select
                    className="dropDown-item w-full cursor-pointer appearance-none focus:ring-0 focus:outline-none text-white p-3 rounded-xl bg-primary flex-1 "
                    value={filters.propertyType}
                    onChange={(e) =>
                      handleFilterChange("propertyType", e.target.value)
                    }
                    style={{
                      backgroundImage: `url('/assets/icons/dropdown-icon-arosa.svg')`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 10px center",
                      backgroundSize: "24px",
                      paddingRight: "60px",
                    }}
                  >
                    <option value="">Property Types</option>
                    {propertyTypes.map((location: any, index: number) => (
                      <option key={index} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </button>

                <button className="dropDown-item text-white px-3 py-2 rounded-xl bg-primary flex flex-1 items-center justify-between">
                  <IoIosCash />
                  <select
                    className="dropDown-item w-full cursor-pointer appearance-none focus:ring-0 focus:outline-none text-white p-3 rounded-xl bg-primary flex-1"
                    value={filters.priceRange}
                    onChange={(e) =>
                      handlePriceRangeChange(Number(e.target.value))
                    }
                    style={{
                      backgroundImage: `url('/assets/icons/dropdown-icon-arosa.svg')`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 10px center",
                      backgroundSize: "24px",
                      paddingRight: "60px",
                    }}
                  >
                    {priceRanges.map((range, index) => (
                      <option key={index} value={index}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </button>

                <button className="dropDown-item text-white px-3 py-2 rounded-xl bg-primary flex flex-1  items-center justify-between">
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

                <button className="dropDown-item text-white px-3 py-2 rounded-xl bg-primary flex flex-1  items-center justify-between">
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
                      <div
                        className="project-card bg-white p-5 rounded-2xl h-full"
                        style={{ background: "white" }}
                      >
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
                              <h4 className="text-primary font-bold text-xl max-w-[250px]">
                                {item.name.value}
                              </h4>
                              <div className="flex items-center gap-2">
                                <MdLocationPin color="gray" />{" "}
                                <span className="font-light text-tertiary">
                                  {item.location.value[0].name}
                                </span>
                              </div>
                            </div>

                            <p className="font-light text-tertiary text-sm max-w-[100px]">
                              {item.developername.value}
                            </p>
                          </div>

                          <div className="flex gap-10 mb-5">
                            <div className="flex items-center gap-2">
                              <MdOutlineKingBed
                                className="text-primary"
                                size={20}
                              />{" "}
                              <span>{item.bedroomcount.value}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <LuImageUpscale
                                className="text-primary"
                                size={20}
                              />
                              <span>{item.propertysize.value}</span>
                            </div>
                          </div>

                          <div className="flex justify-between">
                            <div className="">
                              <p>Starting Price</p>
                              <p className="text-primary text-xl font-bold">
                                ${item.price.value}
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

                          <div className="flex gap-2 mt-5 flex-wrap">
                            <div className="bg-primary p-2 rounded-lg flex-1 flex items-center justify-center gap-1">
                              <FaWhatsapp className="text-white" size={20} />
                              <p className="text-white text-sm">Whatsapp</p>
                            </div>

                            <div className="bg-primary p-2 rounded-lg flex-1 flex items-center justify-center gap-1">
                              <IoCall className="text-white" size={20} />
                              <p className="text-white text-sm">Call</p>
                            </div>

                            <div className="bg-primary p-2 rounded-lg flex-1 flex items-center justify-center gap-1">
                              <IoMail className="text-white" size={20} />
                              <p className="text-white text-sm">Email</p>
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
    </>
  );
}
