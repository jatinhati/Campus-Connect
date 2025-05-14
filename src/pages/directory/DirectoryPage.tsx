import { useState, useEffect } from 'react';
import { Search, BookOpen, Users, MapPin, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

function DirectoryPage() {
  const [activeTab, setActiveTab] = useState('colleges');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState('all');
  
  const locations = ['all', 'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'];
  
  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Sample data
  const collegeData = [
    { 
      id: 1, 
      name: 'Indian Institute of Technology Delhi', 
      logo: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=150',
      location: 'Delhi',
      type: 'Engineering',
      students: 8500,
      established: 1961
    },
    { 
      id: 2, 
      name: 'Indian Institute of Technology Bombay', 
      logo: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=150',
      location: 'Mumbai',
      type: 'Engineering',
      students: 10000,
      established: 1958
    },
    { 
      id: 3, 
      name: 'Delhi University', 
      logo: 'https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=150',
      location: 'Delhi',
      type: 'Multidisciplinary',
      students: 132000,
      established: 1922
    },
    { 
      id: 4, 
      name: 'BITS Pilani', 
      logo: 'https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=150',
      location: 'Rajasthan',
      type: 'Engineering',
      students: 4500,
      established: 1964
    },
    { 
      id: 5, 
      name: 'NIT Trichy', 
      logo: 'https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=150',
      location: 'Tamil Nadu',
      type: 'Engineering',
      students: 6500,
      established: 1964
    },
    { 
      id: 6, 
      name: 'IIM Ahmedabad', 
      logo: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=150',
      location: 'Gujarat',
      type: 'Management',
      students: 1100,
      established: 1961
    },
  ];
  
  const clubData = [
    { 
      id: 1, 
      name: 'Coding Club IIT Delhi', 
      logo: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=150',
      college: 'IIT Delhi',
      location: 'Delhi',
      members: 250,
      category: 'Technical',
      established: 2005
    },
    { 
      id: 2, 
      name: 'Entrepreneurship Cell', 
      logo: 'https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&w=150',
      college: 'IIT Bombay',
      location: 'Mumbai',
      members: 180,
      category: 'Business',
      established: 1998
    },
    { 
      id: 3, 
      name: 'Music Society', 
      logo: 'https://images.pexels.com/photos/164693/pexels-photo-164693.jpeg?auto=compress&cs=tinysrgb&w=150',
      college: 'Delhi University',
      location: 'Delhi',
      members: 120,
      category: 'Cultural',
      established: 1985
    },
    { 
      id: 4, 
      name: 'Robotics Club', 
      logo: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=150',
      college: 'BITS Pilani',
      location: 'Rajasthan',
      members: 85,
      category: 'Technical',
      established: 2001
    },
    { 
      id: 5, 
      name: 'Drama Club', 
      logo: 'https://images.pexels.com/photos/236171/pexels-photo-236171.jpeg?auto=compress&cs=tinysrgb&w=150',
      college: 'NIT Trichy',
      location: 'Tamil Nadu',
      members: 60,
      category: 'Cultural',
      established: 1995
    },
    { 
      id: 6, 
      name: 'Finance Club', 
      logo: 'https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=150',
      college: 'IIM Ahmedabad',
      location: 'Gujarat',
      members: 110,
      category: 'Business',
      established: 1980
    },
  ];

  // Filter based on search query and location
  const filteredColleges = collegeData.filter(college => {
    return (
      (location === 'all' || college.location === location) &&
      (
        college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });
  
  const filteredClubs = clubData.filter(club => {
    return (
      (location === 'all' || club.location === location) &&
      (
        club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  return (
    <div className="container-custom py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Campus Directory</h1>
        <p className="text-gray-600">
          Discover colleges and clubs across India
        </p>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 input"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Location Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 flex-1">
            <span className="flex items-center text-sm text-gray-500">
              <MapPin size={16} className="mr-1" />
              Location:
            </span>
            {locations.map(loc => (
              <button
                key={loc}
                className={`px-3 py-1.5 text-sm rounded-full ${
                  location === loc
                    ? 'bg-primary-700 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setLocation(loc)}
              >
                {loc === 'all' ? 'All Locations' : loc}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            className={`py-3 font-medium text-sm border-b-2 ${
              activeTab === 'colleges'
                ? 'border-primary-700 text-primary-700'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('colleges')}
          >
            <div className="flex items-center">
              <BookOpen size={18} className="mr-2" />
              Colleges
            </div>
          </button>
          <button
            className={`py-3 font-medium text-sm border-b-2 ${
              activeTab === 'clubs'
                ? 'border-primary-700 text-primary-700'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('clubs')}
          >
            <div className="flex items-center">
              <Users size={18} className="mr-2" />
              Clubs
            </div>
          </button>
        </div>
      </div>
      
      {/* Directory Listings */}
      {isLoading ? (
        // Loading Skeletons
        <div className="grid grid-cols-1 gap-4">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 animate-pulse">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-gray-200 rounded-md mr-4"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-48 mb-2"></div>
                  <div className="h-4 bg-gray-100 rounded w-32"></div>
                </div>
                <div className="w-24 h-9 bg-gray-100 rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
      ) : activeTab === 'colleges' ? (
        // Colleges Tab
        filteredColleges.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredColleges.map(college => (
              <div 
                key={college.id} 
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <img 
                    src={college.logo} 
                    alt={college.name} 
                    className="h-12 w-12 object-cover rounded-md border border-gray-200 mr-4" 
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{college.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin size={14} className="mr-1" />
                      {college.location}
                      <span className="mx-2">•</span>
                      <span>{college.type}</span>
                      <span className="mx-2">•</span>
                      <span>{college.students.toLocaleString()} students</span>
                    </div>
                  </div>
                  <Link
                    to={`/directory/college/${college.id}`}
                    className="btn-primary btn-sm"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-3">
              <BookOpen size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No colleges found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter to find what you're looking for
            </p>
          </div>
        )
      ) : (
        // Clubs Tab
        filteredClubs.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredClubs.map(club => (
              <div 
                key={club.id} 
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <img 
                    src={club.logo} 
                    alt={club.name} 
                    className="h-12 w-12 object-cover rounded-md border border-gray-200 mr-4" 
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{club.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <span>{club.college}</span>
                      <span className="mx-2">•</span>
                      <span>{club.category}</span>
                      <span className="mx-2">•</span>
                      <span>{club.members} members</span>
                    </div>
                  </div>
                  <Link
                    to={`/directory/club/${club.id}`}
                    className="btn-primary btn-sm"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-3">
              <Users size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No clubs found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter to find what you're looking for
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default DirectoryPage;