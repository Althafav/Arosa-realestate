import { Teamitem } from "@/models/teamitem";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaLinkedin } from "react-icons/fa";

interface TeamCardProps {
  item: Teamitem;
}

const TeamCard: React.FC<TeamCardProps> = ({ item }) => {
  return (
    <div className="">
      <div className="bg-white rounded-xl  p-5 h-full">
        <div className="relative ">
          <img
            src={item.image.value[0]?.url}
            alt={item.name.value}
            className="object-cover rounded-t-2xl object-top mb-10 h-[250px] w-full"
          />
          {item.linkedin.value && (
            <Link
              href={item.linkedin.value}
              target="_blank"
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-primary px-5 py-3 w-fit rounded-3xl "
            >
              <FaLinkedin size={28} className="text-white " />
            </Link>
          )}
        </div>
        <div className="">
          <p className="mb-1 text-primary text-xl">{item.name.value}</p>
          <p className="text-tertiary text-lg">{item.designation.value}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
