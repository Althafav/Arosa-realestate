import { Projectitem } from "@/models/projectitem";
import { formatAEDPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { IoCall, IoMail } from "react-icons/io5";
import { LuImageUpscale } from "react-icons/lu";
import { MdLocationPin, MdOutlineKingBed } from "react-icons/md";

interface ProjectCardProps {
  project: Projectitem;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const primaryImage =
    project.image.value[0]?.url || "/assets/imgs/default-property.png";
  const location = project.location.value[0]?.name || "Location not specified";
  const price = project.price.value || "Price upon request";
  const bedrooms =
    project.bedroom?.value?.map((b) => b.name).join(", ") || "N/A";
  const handoverYear = project.handoveryr.value[0]?.name || "N/A";

  const displayPrice = formatAEDPrice(project.price.value);

  return (
    <Link href={`/offplan-projects/${project.slug.value}`}>
      <div
        className="project-card bg-white p-5 rounded-2xl h-full flex flex-col justify-between"
        style={{ background: "white" }}
      >
        <div>
          <Image
            width={300}
            height={256}
            className="object-cover w-full h-[256px] rounded-2xl"
            src={project.image.value[0]?.url}
            alt={project.name.value}
          />
          <div className="p-3">
            <div className="flex justify-between mb-5">
              <div>
                <h4 className="text-primary font-bold text-xl max-w-[250px]">
                  {project.name.value}
                </h4>

                <div className="flex items-center gap-2">
                  <MdLocationPin color="gray" />{" "}
                  <span className="font-light text-tertiary">
                    {project.location.value[0]?.name}
                  </span>
                </div>
              </div>

              <p className="font-light text-tertiary text-sm max-w-[100px]">
                {project.developer.value[0]?.name}
              </p>
            </div>

            <div className="flex gap-10 mb-5">
              <div className="flex items-center gap-2">
                <MdOutlineKingBed className="text-primary" size={20} />{" "}
                <span>
                  {project.bedroom.value.map((bed: any) => bed.name).join(", ")}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <LuImageUpscale className="text-primary" size={20} />
                <span>{project.propertysize.value}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="">
                <p>Starting Price</p>
                <div className="flex items-center gap-2">
                  <p className="text-primary text-xl font-bold">
                    {formatAEDPrice(project.price.value)}
                  </p>
                </div>
              </div>

              <hr className="h-14 w-[1px] bg-gray-400" />

              <div className=" ">
                <p>Completion</p>
                <p className="text-primary text-xl font-bold">
                  <span className="mx-2">
                    {project.handoverqr.value[0]?.name}
                  </span>
                  {project.handoveryr.value[0]?.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3">
          <div className="flex gap-2 mt-5 flex-wrap">
            <Link
              onClick={(e) => e.stopPropagation()}
              href={`https://wa.me/+971569916229`}
              target="_blank"
              className="bg-primary p-2 rounded-lg flex-1 flex items-center justify-center gap-1"
            >
              <FaWhatsapp className="text-white" size={20} />
              <p className="text-white text-sm">Whatsapp</p>
            </Link>

            <Link
              onClick={(e) => e.stopPropagation()}
              href={`tel:+971569916229`}
              target="_blank"
              className="bg-primary p-2 rounded-lg flex-1 flex items-center justify-center gap-1"
            >
              <IoCall className="text-white" size={20} />
              <p className="text-white text-sm">Call</p>
            </Link>

            <Link
              href={`/contact?referrer=${project.name.value}/#form`}
              scroll={false}
              onClick={(e) => e.stopPropagation()}
              className="bg-primary p-2 rounded-lg flex-1 flex items-center justify-center gap-1"
            >
              <IoMail className="text-white" size={20} />
              <p className="text-white text-sm">Email</p>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
