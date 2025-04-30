import { useState, useEffect } from 'react';
import { Calendar, Search, Filter, Plus } from 'lucide-react';
import EventCard from '../../components/events/EventCard';
import { mockEvents } from '../../data/mockEvents';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

function EventsPage() {
  const { isAuthenticated, user } = useAuth();
  const [events, setEvents] = useState(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter events based on search query and filter type
  useEffect(() => {
    let result = events;
    
    // Filter by type
    if (selectedFilter !== 'all') {
      result = result.filter(event => event.type === selectedFilter);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        event => 
          event.title.toLowerCase().includes(query) || 
          event.college.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query)
      );
    }
    
    setFilteredEvents(result);
  }, [searchQuery, selectedFilter, events]);

  const filterOptions = [
    { id: 'all', label: 'All Events' },
    { id: 'hackathon', label: 'Hackathons' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'workshop', label: 'Workshops' },
    { id: 'seminar', label: 'Seminars' },
  ];

  return (
    <div className="container-custom py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Calendar size={24} className="mr-2 text-primary-700" />
            Campus Events
          </h1>
          <p className="text-gray-600 mt-1">
            Discover upcoming events from colleges and clubs across India
          </p>
        </div>
        
        {isAuthenticated && (user?.role === 'club' || user?.role === 'college') && (
          <Link to="/events/create" className="btn-primary mt-4 md:mt-0">
            <Plus size={18} />
            Create Event
          </Link>
        )}
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
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 flex-1">
            <span className="flex items-center text-sm text-gray-500">
              <Filter size={16} className="mr-1" />
              Filter:
            </span>
            {filterOptions.map(option => (
              <button
                key={option.id}
                className={`px-3 py-1.5 text-sm rounded-full ${
                  selectedFilter === option.id
                    ? 'bg-primary-700 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedFilter(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Events Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-full"></div>
                  <div className="h-4 bg-gray-100 rounded w-full"></div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-3 bg-gray-100 rounded w-16 mt-1"></div>
                    </div>
                  </div>
                  <div className="w-20 h-8 bg-primary-100 rounded-md"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-3">
            <Calendar size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No events found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filter to find what you're looking for
          </p>
        </div>
      )}
    </div>
  );
}

export default EventsPage;