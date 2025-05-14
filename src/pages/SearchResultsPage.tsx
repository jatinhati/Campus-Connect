import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, BookOpen, Calendar } from 'lucide-react';
import { mockEvents } from '../data/mockEvents';
import { mockPosts } from '../data/mockPosts';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResultsPage() {
  const query = useQuery().get('q') || '';
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [query]);

  // Sample data (same as in DirectoryPage)
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

  // Filter based on search query
  const filteredColleges = collegeData.filter(college => {
    return (
      college.name.toLowerCase().includes(query.toLowerCase()) ||
      college.location.toLowerCase().includes(query.toLowerCase()) ||
      college.type.toLowerCase().includes(query.toLowerCase())
    );
  });
  
  const filteredClubs = clubData.filter(club => {
    return (
      club.name.toLowerCase().includes(query.toLowerCase()) ||
      club.college.toLowerCase().includes(query.toLowerCase()) ||
      club.category.toLowerCase().includes(query.toLowerCase())
    );
  });

  // Filter events
  const filteredEvents = mockEvents.filter(event => {
    return (
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      event.description.toLowerCase().includes(query.toLowerCase()) ||
      event.college.toLowerCase().includes(query.toLowerCase()) ||
      event.location.toLowerCase().includes(query.toLowerCase()) ||
      event.type.toLowerCase().includes(query.toLowerCase())
    );
  });

  // Filter posts
  const filteredPosts = mockPosts.filter(post => {
    return (
      post.content.toLowerCase().includes(query.toLowerCase()) ||
      post.author.name.toLowerCase().includes(query.toLowerCase())
    );
  });

  if (isLoading) {
    return (
      <div className="container-custom py-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-6">
      <h2 className="text-xl font-semibold mb-4">Search Results for: <span className="text-primary-700">"{query}"</span></h2>
      
      {/* Colleges Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
          <span className="p-1 bg-primary-50 rounded text-primary-700"><BookOpen size={18} /></span> Colleges
          <span className="text-sm text-gray-500 font-normal">({filteredColleges.length})</span>
        </h3>
        
        {filteredColleges.length === 0 ? (
          <p className="text-gray-500 italic">No colleges found matching your search.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredColleges.map(college => (
              <div key={college.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-4 flex items-center gap-3">
                  <img 
                    src={college.logo} 
                    alt={college.name} 
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{college.name}</h4>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <span>{college.location}</span>
                      <span className="mx-1.5">•</span>
                      <span>{college.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Clubs Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
          <span className="p-1 bg-primary-50 rounded text-primary-700"><Users size={18} /></span> Clubs
          <span className="text-sm text-gray-500 font-normal">({filteredClubs.length})</span>
        </h3>
        
        {filteredClubs.length === 0 ? (
          <p className="text-gray-500 italic">No clubs found matching your search.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClubs.map(club => (
              <div key={club.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-4 flex items-center gap-3">
                  <img 
                    src={club.logo} 
                    alt={club.name} 
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{club.name}</h4>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <span>{club.college}</span>
                      <span className="mx-1.5">•</span>
                      <span>{club.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Events Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
          <span className="p-1 bg-primary-50 rounded text-primary-700"><Calendar size={18} /></span> Events
          <span className="text-sm text-gray-500 font-normal">({filteredEvents.length})</span>
        </h3>
        
        {filteredEvents.length === 0 ? (
          <p className="text-gray-500 italic">No events found matching your search.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEvents.slice(0, 6).map(event => (
              <div key={event.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <Link to={`/events/${event.id}`}>
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-32 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <Link to={`/events/${event.id}`}>
                    <h4 className="font-medium text-gray-900 hover:text-primary-700">{event.title}</h4>
                  </Link>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <span>{event.date}</span>
                    <span className="mx-1.5">•</span>
                    <span>{event.college}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Posts Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
          <span className="p-1 bg-primary-50 rounded text-primary-700"><Search size={18} /></span> Posts
          <span className="text-sm text-gray-500 font-normal">({filteredPosts.length})</span>
        </h3>
        
        {filteredPosts.length === 0 ? (
          <p className="text-gray-500 italic">No posts found matching your search.</p>
        ) : (
          <div className="space-y-4">
            {filteredPosts.slice(0, 5).map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow p-4">
                <div className="flex items-start gap-3">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{post.author.name}</h4>
                    <p className="text-gray-500 text-sm">{post.timestamp}</p>
                    <p className="mt-2">{post.content.length > 150 ? post.content.substring(0, 150) + '...' : post.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResultsPage;