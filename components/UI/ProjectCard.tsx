import { Projectitem } from "@/models/projectitem";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: Projectitem;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const primaryImage = project.image.value[0]?.url || "/assets/imgs/default-property.png";
  const location = project.location.value[0]?.name || "Location not specified";
  const price = project.price.value || "Price upon request";
  const bedrooms =
    project.bedroom?.value?.map((b) => b.name).join(", ") || "N/A";
  const handoverYear = project.handoveryr.value[0]?.name || "N/A";

  return (
    <Link href={`offplan-projects/${project.name.value}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <div className="relative h-48">
          <Image
            src={primaryImage}
            alt={project.name.value}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {project.name.value}
          </h3>
          <p className="text-gray-600 mb-1 flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {location}
          </p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-primary font-bold">AED {price}</span>
            <span className="text-sm text-gray-500">{handoverYear}</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
            <span className="text-sm text-gray-600">
              <span className="font-medium">Bedrooms:</span> {bedrooms}
            </span>
            <button className="text-sm text-primary hover:text-primarydark font-medium">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
