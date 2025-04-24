import { useState, useEffect } from 'react';
import { Projectitem } from '@/models/projectitem'; 
import Globals from '@/modules/Globals';

interface SearchFilters {
  searchTerm: string;
  location: string;
  propertyType: string;
  developer: string;
  bedroom: string;
  handoverYear: string;
  // minPrice: string;
  // maxPrice: string;
}

const SelfContainedSearchFilter = () => {
  // State for filter options
  const [locations, setLocations] = useState<string[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [bedrooms, setBedrooms] = useState<string[]>([]);
  const [handoverYears, setHandoverYears] = useState<string[]>([]);
  const [developers, setDevelopers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for current filter selections
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Cities');
  const [selectedType, setSelectedType] = useState('Type');
  const [selectedDeveloper, setSelectedDeveloper] = useState('All Developers');
  const [selectedBedroom, setSelectedBedroom] = useState('Bedrooms');
  const [selectedHandover, setSelectedHandover] = useState('Handover');
  const [priceRange, setPriceRange] = useState({ min: '9.72M', max: '37.85M' });
  const [isExpanded, setIsExpanded] = useState(false);

  // Fetch filter options from Kontent.ai
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const response = await Globals.KontentClient.item("project_page").toPromise();
        const allProjects: Projectitem[] = response.item.projectitems.value;

        // Extract unique locations
        const uniqueLocations = Array.from(new Set(
          allProjects.flatMap((item) => item.location?.value?.map(loc => loc.name) || [])
        ));
        setLocations(uniqueLocations);

        // Extract unique property types
        const uniquePropertyTypes = Array.from(new Set(
          allProjects.flatMap((item) => item.propertytype?.value?.map(type => type.name) || [])
        ));
        setPropertyTypes(uniquePropertyTypes);

        // Extract unique bedrooms
        const uniqueBedrooms = Array.from(new Set(
          allProjects.flatMap(
            (item) => item.bedroom?.value?.map((choice) => choice.name) || []
          )
        )).sort();
        setBedrooms(uniqueBedrooms);

        // Extract unique handover years
        const uniqueHandoverYears = Array.from(new Set(
          allProjects.flatMap((item) => item.handoveryr?.value?.map(year => year.name) || [])
        ));
        setHandoverYears(uniqueHandoverYears);

        // Extract unique developers
        const uniqueDevelopers = Array.from(new Set(
          allProjects.flatMap(
            (item) => item.developer?.value?.map((choice) => choice.name) || []
          )
        ));
        setDevelopers(uniqueDevelopers);

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching filter data:", err);
        setError("Failed to load filter options. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchFilterData();
  }, []);

  const handleSearch = () => {
    const filters: SearchFilters = {
      searchTerm,
      location: selectedLocation === 'All Cities' ? '' : selectedLocation,
      propertyType: selectedType === 'Type' ? '' : selectedType,
      developer: selectedDeveloper === 'All Developers' ? '' : selectedDeveloper,
      bedroom: selectedBedroom === 'Bedrooms' ? '' : selectedBedroom,
      handoverYear: selectedHandover === 'Handover' ? '' : selectedHandover,
      // minPrice: priceRange.min,
      // maxPrice: priceRange.max,
    };

    // Here you can either:
    // 1. Redirect to search results page with filters as query params
    redirectToSearchResults(filters);
    
    // OR
    // 2. Call an onSearch callback if you prefer
    // onSearch(filters);
  };

  const redirectToSearchResults = (filters: SearchFilters) => {
    const queryParams = new URLSearchParams();
    
    if (filters.searchTerm) queryParams.append('q', filters.searchTerm);
    if (filters.location) queryParams.append('location', filters.location);
    if (filters.propertyType) queryParams.append('type', filters.propertyType);
    if (filters.developer) queryParams.append('developer', filters.developer);
    if (filters.bedroom) queryParams.append('bedroom', filters.bedroom);
    if (filters.handoverYear) queryParams.append('handover', filters.handoverYear);
    // if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
    // if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);

    window.location.href = `/search?${queryParams.toString()}`;
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedLocation('All Cities');
    setSelectedType('Type');
    setSelectedDeveloper('All Developers');
    setSelectedBedroom('Bedrooms');
    setSelectedHandover('Handover');
    setPriceRange({ min: '9.72M', max: '37.85M' });
  };

  if (error) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md text-center text-red-500">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-6 relative">
     

      {/* Main search row - always visible */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search Project"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primarydark transition-colors"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Toggle for advanced filters */}
      <div className="text-center">
        <button
          className="text-primary hover:text-primarydark text-sm font-medium"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
        </button>
      </div>

      {/* Advanced filters - conditionally rendered */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="All Cities">All Cities</option>
              {locations.map((location, index) => (
                <option key={`location-${index}`} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="Type">All Types</option>
              {propertyTypes.map((type, index) => (
                <option key={`type-${index}`} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Developer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Developer</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedDeveloper}
              onChange={(e) => setSelectedDeveloper(e.target.value)}
            >
              <option value="All Developers">All Developers</option>
              {developers.map((developer, index) => (
                <option key={`developer-${index}`} value={developer}>
                  {developer}
                </option>
              ))}
            </select>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedBedroom}
              onChange={(e) => setSelectedBedroom(e.target.value)}
            >
              <option value="Bedrooms">Any</option>
              {bedrooms.map((bedroom, index) => (
                <option key={`bedroom-${index}`} value={bedroom}>
                  {bedroom}
                </option>
              ))}
            </select>
          </div>

          {/* Handover Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Handover Year</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedHandover}
              onChange={(e) => setSelectedHandover(e.target.value)}
            >
              <option value="Handover">Any Year</option>
              {handoverYears.map((year, index) => (
                <option key={`year-${index}`} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
            <div className="flex items-center gap-2">
              <select
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
              >
                <option value="9.72M">9.72M</option>
                <option value="10M">10M</option>
                <option value="15M">15M</option>
                <option value="20M">20M</option>
              </select>
              <span className="text-gray-500">to</span>
              <select
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
              >
                <option value="37.85M">37.85M</option>
                <option value="30M">30M</option>
                <option value="25M">25M</option>
                <option value="20M">20M</option>
              </select>
            </div>
          </div> */}
        </div>
      )}

      {/* Reset button - only shown when expanded */}
      {isExpanded && (
        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium"
            onClick={handleReset}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SelfContainedSearchFilter;