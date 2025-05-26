import { Teamitem } from "@/models/teamitem";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaLinkedin } from "react-icons/fa";

interface TeamCardProps {
  item: Teamitem;
}

const TeamCard: React.FC<TeamCardProps> = ({ item }) => {
  const imageUrl = item.image.value[0]?.url || "/placeholder.jpg";

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col h-full">
      {/* Image wrapper */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72">
        <Image
          src={imageUrl}
          alt={item.name.value}
          fill
          className="object-contain object-top"
        />
        {item.linkedin.value && (
          <Link
            href={item.linkedin.value}
            target="_blank"
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-primary p-2 rounded-full shadow-md"
          >
            <FaLinkedin size={24} className="text-white" />
          </Link>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-end">
        <p className="text-primary text-xl font-semibold mb-1">
          {item.name.value}
        </p>
        <p className="text-tertiary text-lg">
          {item.designation.value}
        </p>
      </div>
    </div>
  );
};

export default TeamCard;
