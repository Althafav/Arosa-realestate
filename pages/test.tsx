import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { useEffect, useState } from "react";

interface Agent {
  name: string;
  email: string;
  phone: string;
  license_no: string;
  photo: string;
}

interface Photo {
  url: string[];
}

interface Property {
  permit_number: string;
  reference_number: string;
  title_en: string;
  offering_type: string;
  property_type: string;
  price_on_application: string;
  price: string;
  photo: any;
  agent: Agent;
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await fetch("/api/properties");
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  if (loading) return <SpinnerComponent />;

  console.log(properties);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 container mx-auto">
        Available Properties
      </h1>
      {properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto">
          {properties.map((property, index) => (
            <li key={index} className="border rounded-lg p-4 shadow-md">
              {property.photo ? (
                <img
                  src={property.photo.url[0]._}
                  alt="Property Image"
                  className="w-full h-48 object-cover rounded"
                />
              ) : (
                <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                  <span>No Image</span>
                </div>
              )}
              <h2 className="text-lg font-semibold mt-2">
                {property.title_en}
              </h2>
              <p className="text-gray-600">
                <strong>Type:</strong> {property.property_type}
              </p>
              <p className="text-gray-500">
                <strong>Price:</strong>{" "}
                {property.price_on_application === "Yes"
                  ? "On Request"
                  : property.price}
              </p>

              {/* Agent Details */}
              <div className="mt-4 p-2 border-t">
                <h3 className="text-md font-semibold">Agent Details</h3>
                {property.agent.photo && (
                  <img
                    src={property.agent.photo}
                    alt="Agent Photo"
                    className="w-12 h-12 rounded-full mt-2"
                  />
                )}
                <p>
                  <strong>Name:</strong> {property.agent.name}
                </p>
                <p>
                  <strong>Email:</strong> {property.agent.email}
                </p>
                <p>
                  <strong>Phone:</strong> {property.agent.phone}
                </p>
                <p>
                  <strong>License No:</strong> {property.agent.license_no}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
