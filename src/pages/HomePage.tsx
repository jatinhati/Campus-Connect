import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Calendar, BookOpen, ArrowRight, Image, MapPin, Clock, Tag, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import PostCard from '../components/posts/PostCard';
import EventCard from '../components/events/EventCard';
import CreateEventForm from '../components/events/CreateEventForm';
import { mockPosts } from '../data/mockPosts';
import { mockEvents } from '../data/mockEvents';
import { Post } from '../types/post';
import { Event } from '../types/event';

function HomePage() {
  const { user, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [events, setEvents] = useState<Event[]>(mockEvents.slice(0, 3));
  const [isLoading, setIsLoading] = useState(true);
  const [showEventForm, setShowEventForm] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postImages, setPostImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim() && postImages.length === 0) return;

    setIsPosting(true);
    try {
      // In a real app, you would upload images to your server/cloud storage here
      // For now, we'll use the preview URLs as the image URLs
      const imageUrls = imagePreviewUrls;

      // Create new post object
      const newPost: Post = {
        id: Date.now().toString(),
        author: {
          id: user?.id || '1',
          name: user?.name || 'Anonymous',
          avatar: user?.avatar || "https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=150",
          role: user?.role || 'student',
          college: user?.college
        },
        content: postContent,
        image: imageUrls[0], // For now, we'll only use the first image
        timeAgo: 'Just now',
        likes: 0,
        comments: 0,
        visibility: 'public',
        tags: extractTags(postContent)
      };

      // Add the new post to the beginning of the posts array
      setPosts(prevPosts => [newPost, ...prevPosts]);

      // Reset form
      setPostContent('');
      setPostImages([]);
      setImagePreviewUrls([]);
    } catch (error) {
      console.error('Error creating post:', error);
      // You would typically show an error message to the user here
    } finally {
      setIsPosting(false);
    }
  };

  const handleEventCreated = (newEvent: Event) => {
    setEvents(prevEvents => [newEvent, ...prevEvents]);
  };

  const handleEventRegister = async (eventId: string) => {
    // In a real app, you would make an API call to register the user for the event
    // For now, we'll just update the local state
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId 
          ? { ...event, attendees: event.attendees + 1, isRegistered: true }
          : event
      )
    );
  };

  const extractTags = (content: string): string[] => {
    const hashtagRegex = /#[\w\u0590-\u05ff]+/g;
    const matches = content.match(hashtagRegex);
    return matches ? matches.map(tag => tag.slice(1)) : [];
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const totalFiles = postImages.length + newFiles.length;
      
      if (totalFiles > 4) {
        alert('You can only upload up to 4 images per post');
        return;
      }

      setPostImages(prev => [...prev, ...newFiles]);

      // Create preview URLs
      newFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviewUrls(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setPostImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

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
          {/* Post Creation Box (for authenticated users) */}
          {isAuthenticated && (
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
              <form onSubmit={handlePostSubmit}>
                <div className="flex items-center mb-4">
                  <img 
                    src={user?.avatar || "https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=150"} 
                    alt={user?.name} 
                    className="w-10 h-10 rounded-full object-cover mr-4" 
                  />
                  <div className="flex-1 relative">
                    <textarea
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      className="w-full px-4 py-2 pr-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                      placeholder="Share something with the campus community..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Image Previews */}
                {imagePreviewUrls.length > 0 && (
                  <div className="mb-4">
                    <div className="grid grid-cols-2 gap-2">
                      {imagePreviewUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-4">
                    <button 
                      type="button"
                      onClick={() => setShowEventForm(true)}
                      className="flex items-center gap-2 text-gray-600 hover:text-primary-700"
                    >
                      <Calendar size={20} />
                      <span>Create Event</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 text-gray-600 hover:text-primary-700"
                    >
                      <Image size={20} />
                      <span>Add Photo</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={(!postContent.trim() && postImages.length === 0) || isPosting}
                    className={`btn-primary ${isPosting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isPosting ? 'Posting...' : 'Post'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Events Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
              <Link to="/events" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {events.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onRegister={handleEventRegister}
                />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
            <div className="space-y-2">
              <Link to="/directory" className="flex items-center gap-2 text-gray-700 hover:text-primary-700 p-2 rounded-lg hover:bg-gray-50">
                <Users size={20} />
                <span>College Directory</span>
              </Link>
              <Link to="/events" className="flex items-center gap-2 text-gray-700 hover:text-primary-700 p-2 rounded-lg hover:bg-gray-50">
                <Calendar size={20} />
                <span>All Events</span>
              </Link>
              <Link to="/resources" className="flex items-center gap-2 text-gray-700 hover:text-primary-700 p-2 rounded-lg hover:bg-gray-50">
                <BookOpen size={20} />
                <span>Resources</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Event Creation Modal */}
      {showEventForm && (
        <CreateEventForm
          onClose={() => setShowEventForm(false)}
          onEventCreated={handleEventCreated}
        />
      )}
    </div>
  );
}

export default HomePage;