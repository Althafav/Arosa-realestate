import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Projectitem } from '../models/projectitem';
import ProjectCard from '@/components/UI/ProjectCard';
import Globals from '@/modules/Globals';


const SearchResultsPage = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<Projectitem[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Projectitem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract filters from URL query parameters
  const {
    q: searchTerm = '',
    location = '',
    type: propertyType = '',
    developer = '',
    bedroom = '',
    handover: handoverYear = '',
    // minPrice = '',
    // maxPrice = ''
  } = router.query;

  // Fetch all projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await Globals.KontentClient.item("project_page").toPromise();
        const allProjects: Projectitem[] = response.item.projectitems.value;
        setProjects(allProjects);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Apply filters whenever projects or query params change
  useEffect(() => {
    if (projects.length === 0) return;

    let results = [...projects];

    // Apply search term filter
    if (searchTerm) {
      results = results.filter(project =>
        project.name.value.toLowerCase().includes(searchTerm.toString().toLowerCase()) || 
        project.metadataKeywords.value.toLowerCase().includes(searchTerm.toString().toLowerCase()) ||
        project.location.value.some(loc => loc.name.toString().toLowerCase() === searchTerm.toString().toLowerCase())
      );
    }

    // Apply location filter
    if (location) {
      results = results.filter(project =>
        project.location.value.some(loc => loc.name === location)
      );
    }

    // Apply property type filter
    if (propertyType) {
      results = results.filter(project =>
        project.propertytype.value.some(type => type.name === propertyType)
      );
    }

    // Apply developer filter
    if (developer) {
      results = results.filter(project =>
        project.developer.value.some(dev => dev.name === developer)
      );
    }

    // Apply bedroom filter
    if (bedroom) {
      results = results.filter(project =>
        project.bedroom?.value?.some(bed => bed.name === bedroom)
      );
    }

    // Apply handover year filter
    if (handoverYear) {
      results = results.filter(project =>
        project.handoveryr.value.some(year => year.name === handoverYear)
      );
    }

    // // Apply price range filter
    // if (minPrice || maxPrice) {
    //   results = results.filter(project => {
    //     const priceStr = project.price.value.replace(/[^\d.]/g, '');
    //     const price = parseFloat(priceStr);
    //     const min = minPrice ? parseFloat(minPrice.toString().replace(/[^\d.]/g, '')) : 0;
    //     const max = maxPrice ? parseFloat(maxPrice.toString().replace(/[^\d.]/g, '')) : Infinity;

    //     return price >= min && price <= max;
    //   });
    // }

    setFilteredProjects(results);
  }, [projects, searchTerm, location, propertyType, developer, bedroom, handoverYear]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-96"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {filteredProjects.length} Properties Found
        </h1>
        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
          {searchTerm && (
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              Search: {searchTerm}
            </span>
          )}
          {location && (
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              Location: {location}
            </span>
          )}
          {propertyType && (
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              Type: {propertyType}
            </span>
          )}
          {developer && (
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              Developer: {developer}
            </span>
          )}
          {bedroom && (
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              Bedrooms: {bedroom}
            </span>
          )}
          {handoverYear && (
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              Handover: {handoverYear}
            </span>
          )}
          {/* {(minPrice || maxPrice) && (
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              Price: {minPrice || '0'} - {maxPrice || '∞'}
            </span>
          )} */}
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium text-gray-700 mb-4">
            No properties match your search criteria
          </h2>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primarydark"
          >
            Back to Home
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.system.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;