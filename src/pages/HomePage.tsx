import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Calendar, BookOpen, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import PostCard from '../components/posts/PostCard';
import EventCard from '../components/events/EventCard';
import { mockPosts } from '../data/mockPosts';
import { mockEvents } from '../data/mockEvents';

function HomePage() {
  const { user, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState(mockPosts);
  const [events, setEvents] = useState(mockEvents.slice(0, 3));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="container-custom py-6">
      {/* Hero Section */}
      {!isAuthenticated && (
        <section className="relative bg-gradient-to-r from-primary-700 to-primary-900 rounded-xl p-8 md:p-12 mb-8 overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Connect with India's Campus Community
            </h1>
            <p className="text-primary-100 mb-6 text-lg">
              Join CampusConnect to discover events, connect with clubs and students across India's colleges, and build your network.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="btn bg-white text-primary-700 hover:bg-gray-100">
                Get Started
              </Link>
              <Link to="/directory" className="btn bg-primary-600 text-white hover:bg-primary-500">
                Explore Directory
              </Link>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10">
            <Users size={300} />
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Search Box (for authenticated users) */}
          {isAuthenticated && (
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
              <div className="flex items-center">
                <img 
                  src={user?.avatar || "https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=150"} 
                  alt={user?.name} 
                  className="w-10 h-10 rounded-full object-cover mr-4" 
                />
                <div className="flex-1 relative">
                  <input
                    type="text"
                    className="w-full px-4 py-2 pr-10 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Share something with the campus community..."
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-700">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Posts Feed */}
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-gray-800">Recent Updates</h2>
            </div>
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 animate-pulse">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-100 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))
            ) : (
              posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>
        </div>
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Events Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800 flex items-center">
                  <Calendar size={18} className="mr-2 text-primary-700" />
                  Upcoming Events
                </h3>
                <Link to="/events" className="text-sm text-primary-700 hover:text-primary-800 font-medium">
                  View All
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {isLoading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="p-4 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/2 mb-1"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/4"></div>
                  </div>
                ))
              ) : (
                events.map(event => (
                  <div key={event.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <Link to={`/events/${event.id}`} className="block">
                      <h4 className="font-medium text-gray-800 hover:text-primary-700 mb-1">
                        {event.title}
                      </h4>
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <span>{event.date}</span>
                        <span className="mx-2">•</span>
                        <span>{event.college}</span>
                      </div>
                      <div className="text-xs">
                        <span className={`badge ${
                          event.type === 'hackathon' ? 'badge-primary' : 
                          event.type === 'cultural' ? 'badge-secondary' : 
                          'badge-accent'
                        }`}>
                          {event.type}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
          {/* Top Colleges */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800 flex items-center">
                  <BookOpen size={18} className="mr-2 text-primary-700" />
                  Top Colleges
                </h3>
                <Link to="/directory" className="text-sm text-primary-700 hover:text-primary-800 font-medium">
                  View All
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <div key={i} className="p-4 flex items-center animate-pulse">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                ))
              ) : (
                [
                  { id: 1, name: 'IIT Delhi', logo: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=150' },
                  { id: 2, name: 'IIT Bombay', logo: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=150' },
                  { id: 3, name: 'Delhi University', logo: 'https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=150' },
                  { id: 4, name: 'BITS Pilani', logo: 'https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&w=150' },
                  { id: 5, name: 'NIT Trichy', logo: 'https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=150' }
                ].map(college => (
                  <Link 
                    key={college.id} 
                    to={`/directory?college=${college.id}`}
                    className="p-4 flex items-center hover:bg-gray-50 transition-colors"
                  >
                    <img 
                      src={college.logo} 
                      alt={college.name} 
                      className="w-8 h-8 rounded-full object-cover mr-3 border border-gray-200" 
                    />
                    <span className="text-gray-800 font-medium">{college.name}</span>
                  </Link>
                ))
              )}
            </div>
          </div>
          {/* Find People */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Search size={18} className="mr-2 text-primary-700" />
                Find People
              </h3>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-2 pr-10 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Search for students or clubs..."
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-700">
                  <Search size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;