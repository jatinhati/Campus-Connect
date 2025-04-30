import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Mail, BookOpen, Calendar, Link as LinkIcon, Edit, Award, Star, Heart, Users, Briefcase as BriefcaseBusiness } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import PostCard from '../../components/posts/PostCard';
import { mockPosts } from '../../data/mockPosts';

// Mock profile data
const mockProfiles = {
  '1': {
    id: '1',
    name: 'Rahul Sharma',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    coverPhoto: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    role: 'student',
    college: 'IIT Delhi',
    department: 'Computer Science Engineering',
    year: 3,
    location: 'New Delhi, India',
    email: 'rahul@example.com',
    bio: 'Computer Science student passionate about AI and machine learning. Actively participating in hackathons and coding competitions.',
    website: 'https://rahulsharma.dev',
    joined: 'September 2021',
    achievements: [
      { id: 1, title: 'Hackathon Winner', description: 'First place at CodeFest 2023' },
      { id: 2, title: 'Research Paper', description: 'Published in IEEE Conference 2022' }
    ],
    skills: ['Python', 'Machine Learning', 'React', 'Node.js', 'Data Structures'],
    education: [
      { id: 1, institution: 'IIT Delhi', degree: 'B.Tech in Computer Science', year: '2021-2025' }
    ],
    connections: 245
  },
  '2': {
    id: '2',
    name: 'Coding Club',
    avatar: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=150',
    coverPhoto: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    role: 'club',
    college: 'IIT Delhi',
    location: 'New Delhi, India',
    email: 'coding@iitd.ac.in',
    bio: 'Official coding club of IIT Delhi. We organize workshops, hackathons, and coding competitions to foster a culture of programming excellence.',
    website: 'https://codingclub.iitd.ac.in',
    joined: 'January 2019',
    achievements: [
      { id: 1, title: 'Best College Club', description: 'Awarded by TechFest 2022' },
      { id: 2, title: 'Hackathon Host', description: 'Organized HackIITD with 500+ participants' }
    ],
    members: 120,
    upcomingEvents: [
      { id: 1, title: 'Intro to ML Workshop', date: 'June 15, 2023' },
      { id: 2, title: 'Summer Coding Camp', date: 'July 5-10, 2023' }
    ]
  }
};

function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');
  
  const isOwnProfile = user?.id === id;
  
  useEffect(() => {
    // Simulate API loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      // Get profile data based on ID
      setProfile(mockProfiles[id as keyof typeof mockProfiles] || null);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        {/* Cover Photo */}
        <div className="h-64 bg-gray-200 w-full"></div>
        
        {/* Profile Header */}
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-16">
            <div className="flex flex-col sm:flex-row sm:items-end">
              <div className="h-32 w-32 rounded-xl bg-gray-300 border-4 border-white shadow-sm"></div>
              <div className="mt-4 sm:mt-0 sm:ml-4 flex-1">
                <div className="h-7 bg-gray-300 rounded w-48 mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-64"></div>
              </div>
              <div className="mt-4 sm:mt-0">
                <div className="h-10 bg-gray-200 rounded-md w-28"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container-custom py-12 text-center">
        <div className="text-gray-400 mb-3">
          <Users size={48} className="mx-auto" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h1>
        <p className="text-gray-600 mb-6">Sorry, the profile you're looking for does not exist or has been removed.</p>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Cover Photo */}
      <div className="h-64 w-full bg-gray-200 overflow-hidden">
        <img 
          src={profile.coverPhoto} 
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Profile Header */}
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-5">
            <div className="h-32 w-32 rounded-xl bg-white border-4 border-white shadow-sm overflow-hidden">
              <img 
                src={profile.avatar} 
                alt={profile.name} 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 sm:mt-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                {profile.name}
                {profile.role === 'club' && (
                  <span className="ml-2 badge badge-primary">Club</span>
                )}
                {profile.role === 'college' && (
                  <span className="ml-2 badge badge-accent">College</span>
                )}
              </h1>
              <p className="text-gray-600 mt-1">
                {profile.role === 'student' ? (
                  <>
                    {profile.department}, {profile.college} • {profile.year}rd Year
                  </>
                ) : (
                  profile.college
                )}
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              {isOwnProfile ? (
                <button className="btn-outline">
                  <Edit size={16} className="mr-2" />
                  Edit Profile
                </button>
              ) : (
                <button className="btn-primary">
                  <Users size={16} className="mr-2" />
                  Connect
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Profile Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column: Bio and Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Bio Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 mb-4">{profile.bio}</p>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{profile.location}</span>
                </div>
                
                <div className="flex items-start">
                  <Mail size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{profile.email}</span>
                </div>
                
                {profile.website && (
                  <div className="flex items-start">
                    <LinkIcon size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:text-primary-800">
                      {profile.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
                
                {profile.role === 'student' && (
                  <div className="flex items-start">
                    <BookOpen size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{profile.department}</span>
                  </div>
                )}
                
                <div className="flex items-start">
                  <Calendar size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Joined {profile.joined}</span>
                </div>
                
                {/* Role-specific Information */}
                {profile.role === 'club' && (
                  <div className="flex items-start">
                    <Users size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{profile.members} members</span>
                  </div>
                )}
                
                {profile.role === 'student' && (
                  <div className="flex items-start">
                    <Users size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{profile.connections} connections</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Achievements/Education */}
            {profile.role === 'student' && (
              <>
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Award size={18} className="mr-2 text-primary-700" />
                    Achievements
                  </h2>
                  <div className="space-y-4">
                    {profile.achievements.map((achievement: any) => (
                      <div key={achievement.id} className="flex items-start">
                        <div className="p-1 bg-primary-50 rounded-full text-primary-700 mr-3">
                          <Star size={16} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <BookOpen size={18} className="mr-2 text-primary-700" />
                    Education
                  </h2>
                  <div className="space-y-4">
                    {profile.education.map((edu: any) => (
                      <div key={edu.id} className="flex items-start">
                        <div className="p-1 bg-primary-50 rounded-full text-primary-700 mr-3">
                          <BriefcaseBusiness size={16} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{edu.institution}</h3>
                          <p className="text-sm text-gray-600">{edu.degree}</p>
                          <p className="text-xs text-gray-500">{edu.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Star size={18} className="mr-2 text-primary-700" />
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            {/* Upcoming Events (for clubs) */}
            {profile.role === 'club' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar size={18} className="mr-2 text-primary-700" />
                  Upcoming Events
                </h2>
                <div className="space-y-4">
                  {profile.upcomingEvents.map((event: any) => (
                    <div key={event.id} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{event.title}</h3>
                        <p className="text-sm text-gray-600">{event.date}</p>
                      </div>
                      <Link to={`/events/${event.id}`} className="btn-primary btn-sm">
                        Register
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column: Posts and Activities */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
              <div className="border-b border-gray-100">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('posts')}
                    className={`px-4 py-3 text-sm font-medium border-b-2 ${
                      activeTab === 'posts'
                        ? 'border-primary-700 text-primary-700'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Posts
                  </button>
                  
                  {profile.role === 'club' && (
                    <button
                      onClick={() => setActiveTab('events')}
                      className={`px-4 py-3 text-sm font-medium border-b-2 ${
                        activeTab === 'events'
                          ? 'border-primary-700 text-primary-700'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Events
                    </button>
                  )}
                  
                  {profile.role === 'student' && (
                    <button
                      onClick={() => setActiveTab('activities')}
                      className={`px-4 py-3 text-sm font-medium border-b-2 ${
                        activeTab === 'activities'
                          ? 'border-primary-700 text-primary-700'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Activities
                    </button>
                  )}
                </div>
              </div>
              
              {/* New Post Box (only on own profile) */}
              {isOwnProfile && activeTab === 'posts' && (
                <div className="p-4">
                  <div className="flex items-center">
                    <img 
                      src={profile.avatar} 
                      alt={profile.name} 
                      className="w-10 h-10 rounded-full object-cover mr-4 border border-gray-100" 
                    />
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        className="w-full px-4 py-2 pr-10 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Share something with your network..."
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Content Based on Active Tab */}
            {activeTab === 'posts' && (
              <div className="space-y-6">
                {/* Filter posts for this profile */}
                {mockPosts.filter(post => post.author.id === profile.id).length > 0 ? (
                  mockPosts
                    .filter(post => post.author.id === profile.id)
                    .map(post => (
                      <PostCard key={post.id} post={post} />
                    ))
                ) : (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
                    <p className="text-gray-500">No posts to show</p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'events' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Organized Events</h3>
                {/* Events organized by this club */}
                <div className="space-y-4">
                  {profile.upcomingEvents.map((event: any) => (
                    <div key={event.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <div>
                        <h3 className="font-medium text-gray-900">{event.title}</h3>
                        <p className="text-sm text-gray-600">{event.date}</p>
                      </div>
                      <Link to={`/events/${event.id}`} className="btn-primary btn-sm">
                        View
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'activities' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Recent Activities</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="p-1 rounded-full text-primary-700 mr-3">
                      <Star size={16} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">
                        <span className="font-medium">{profile.name}</span> attended the hackathon <span className="text-primary-700">CodeFest 2023</span>
                      </p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="p-1 rounded-full text-secondary-700 mr-3">
                      <Heart size={16} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">
                        <span className="font-medium">{profile.name}</span> liked the post from <span className="text-primary-700">Robotics Club</span>
                      </p>
                      <p className="text-xs text-gray-500">5 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="p-1 rounded-full text-accent-700 mr-3">
                      <Users size={16} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">
                        <span className="font-medium">{profile.name}</span> joined <span className="text-primary-700">Coding Club</span>
                      </p>
                      <p className="text-xs text-gray-500">2 weeks ago</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;