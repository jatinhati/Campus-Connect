import { Calendar, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Event } from '../../types/event';

interface EventCardProps {
  event: Event;
}

function EventCard({ event }: EventCardProps) {
  return (
    <div className="card group hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      {/* Event Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <Link to={`/events/${event.id}`}>
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Event Type Badge */}
        <div className="absolute top-3 right-3">
          <span className={`badge ${
            event.type === 'hackathon' ? 'badge-primary' : 
            event.type === 'cultural' ? 'badge-secondary' : 
            'badge-accent'
          }`}>
            {event.type}
          </span>
        </div>
        
        {/* Date Box */}
        <div className="absolute left-3 top-3 bg-white text-center rounded shadow-md p-2 w-14">
          <span className="block text-sm font-bold text-primary-700">{event.dateObj.day}</span>
          <span className="block text-xs text-gray-700">{event.dateObj.month}</span>
        </div>
      </div>
      
      {/* Event Content */}
      <div className="p-4">
        <Link to={`/events/${event.id}`} className="block mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
            {event.title}
          </h3>
        </Link>
        
        {/* Event Meta Info */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={16} className="mr-2 text-gray-500" />
            <span>{event.date}, {event.time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={16} className="mr-2 text-gray-500" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users size={16} className="mr-2 text-gray-500" />
            <span>{event.attendees} attending</span>
          </div>
        </div>
        
        {/* Organizer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <img 
              src={event.organizer.avatar} 
              alt={event.organizer.name} 
              className="w-8 h-8 rounded-full mr-2 object-cover border border-gray-100" 
            />
            <div>
              <span className="block text-sm font-medium text-gray-900">{event.organizer.name}</span>
              <span className="block text-xs text-gray-500">{event.college}</span>
            </div>
          </div>
          
          {/* Register Button */}
          <Link 
            to={`/events/${event.id}`} 
            className="btn-primary btn-sm"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCard;