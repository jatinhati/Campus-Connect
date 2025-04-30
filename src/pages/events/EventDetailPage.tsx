import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Share2, Heart, Clock, ArrowLeft, ExternalLink } from 'lucide-react';
import { mockEvents } from '../../data/mockEvents';
import { useAuth } from '../../contexts/AuthContext';

function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const [event, setEvent] = useState(mockEvents.find(e => e.id === id));
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleRegistration = () => {
    if (!isAuthenticated) {
      // Redirect to login page
      window.location.href = '/login';
      return;
    }
    setIsRegistered(!isRegistered);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  if (isLoading) {
    return (
      <div className="container-custom py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-6 bg-gray-100 rounded w-1/4 mb-8"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-100 rounded w-full"></div>
                <div className="h-4 bg-gray-100 rounded w-full"></div>
                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                    <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                    <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                    <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                  </div>
                </div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container-custom py-12 text-center">
        <div className="text-gray-400 mb-3">
          <Calendar size={48} className="mx-auto" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h1>
        <p className="text-gray-600 mb-6">Sorry, the event you're looking for does not exist or has been removed.</p>
        <Link to="/events" className="btn-primary">
          <ArrowLeft size={16} className="mr-2" />
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link to="/events" className="text-sm text-primary-700 hover:text-primary-800 flex items-center">
          <ArrowLeft size={16} className="mr-1" />
          Back to Events
        </Link>
      </div>
      
      {/* Title and Meta */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={`badge ${
            event.type === 'hackathon' ? 'badge-primary' : 
            event.type === 'cultural' ? 'badge-secondary' : 
            'badge-accent'
          }`}>
            {event.type}
          </span>
          <span className="badge badge-primary">
            {event.college}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
        <p className="text-gray-600">{event.description}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Event Image */}
          <div className="rounded-lg overflow-hidden mb-8">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-auto object-cover" 
            />
          </div>
          
          {/* Event Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About this event</h2>
            <div className="prose max-w-none text-gray-700">
              <p>
                Join us for an exciting {event.type} event at {event.college}! This event is designed to bring together students from across India to collaborate, learn, and showcase their talents.
              </p>
              <p>
                {event.title} will feature:
              </p>
              <ul>
                <li>Expert speakers and industry professionals</li>
                <li>Hands-on workshops and learning opportunities</li>
                <li>Networking sessions with peers from top colleges</li>
                <li>Exciting prizes and recognition for participants</li>
              </ul>
              <p>
                Whether you're a beginner or an expert, this event offers something for everyone. Don't miss this opportunity to expand your skills and connect with the broader campus community.
              </p>
              <p>
                <strong>Important Note:</strong> Registration closes 48 hours before the event. Make sure to secure your spot early!
              </p>
            </div>
          </div>
          
          {/* Organizer Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Organizer</h2>
            <div className="flex items-center">
              <img 
                src={event.organizer.avatar} 
                alt={event.organizer.name} 
                className="w-12 h-12 rounded-full object-cover border border-gray-200 mr-4" 
              />
              <div>
                <h3 className="font-medium text-gray-900">
                  {event.organizer.name}
                </h3>
                <p className="text-sm text-gray-600">{event.college}</p>
                <div className="mt-2">
                  <Link 
                    to={`/profile/${event.organizer.id}`} 
                    className="text-sm text-primary-700 hover:text-primary-800 font-medium"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Registration Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Details</h2>
            
            {/* Date and Time */}
            <div className="flex items-start mb-4">
              <Calendar size={20} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-800">Date and Time</h3>
                <p className="text-sm text-gray-600">{event.date}</p>
                <p className="text-sm text-gray-600">{event.time}</p>
              </div>
            </div>
            
            {/* Location */}
            <div className="flex items-start mb-4">
              <MapPin size={20} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-800">Location</h3>
                <p className="text-sm text-gray-600">{event.location}</p>
                <a 
                  href="#" 
                  className="text-xs text-primary-700 hover:text-primary-800 font-medium flex items-center mt-1"
                >
                  View on map
                  <ExternalLink size={12} className="ml-1" />
                </a>
              </div>
            </div>
            
            {/* Attendees */}
            <div className="flex items-start mb-4">
              <Users size={20} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-800">Attendees</h3>
                <p className="text-sm text-gray-600">{event.attendees} people attending</p>
              </div>
            </div>
            
            {/* Duration */}
            <div className="flex items-start mb-6">
              <Clock size={20} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-800">Duration</h3>
                <p className="text-sm text-gray-600">3 hours</p>
              </div>
            </div>
            
            {/* Registration Button */}
            <button
              onClick={handleRegistration}
              className={
                isRegistered 
                  ? "w-full btn bg-gray-100 text-gray-800 hover:bg-gray-200" 
                  : "w-full btn-primary"
              }
            >
              {isRegistered ? "Cancel Registration" : "Register Now"}
            </button>
            
            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-4">
              <button 
                onClick={toggleLike}
                className="flex items-center text-sm text-gray-600 hover:text-primary-700"
              >
                <Heart 
                  size={18} 
                  className={isLiked ? "text-error-500 fill-error-500" : "text-gray-500"} 
                />
                <span className="ml-1">Like</span>
              </button>
              
              <button className="flex items-center text-sm text-gray-600 hover:text-primary-700">
                <Share2 size={18} className="text-gray-500" />
                <span className="ml-1">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailPage;