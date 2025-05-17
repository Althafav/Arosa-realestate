import { Teamitem } from "@/models/teamitem";
import Image from "next/image";
import React from "react";
import { FaLinkedin } from "react-icons/fa";

interface TeamCardProps {
  item: Teamitem;
}

const TeamCard: React.FC<TeamCardProps> = ({ item }) => {
  return (
    <div key={item.system.id} className="">
      <div className="bg-white h-full rounded-xl flex justify-center p-5 ">
        <div>
          <div className="relative">
            <Image
              width={350}
              height={250}
              src={item.image.value[0]?.url}
              alt={item.name.value}
              className="object-contain mb-5 h-[250px]"
            />
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-primary px-5 py-3 w-fit rounded-3xl ">
              <FaLinkedin size={28} className="text-white " />
            </div>
          </div>
          <p className="mb-1 text-primary text-xl">{item.name.value}</p>
          <p className="text-tertiary text-lg">{item.designation.value}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
