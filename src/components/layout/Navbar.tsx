import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Bell, MessageCircle, ChevronDown, GraduationCap as Graduation, Users, Calendar, LogOut, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 py-2">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="bg-primary-700 text-white p-1.5 rounded-md">
                  <Graduation size={22} />
                </div>
                <span className="text-lg font-semibold text-primary-700">CampusConnect</span>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Search people, clubs, events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>
          
          {/* Right Side - User Actions */}
          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <>
                {/* Notification Icon */}
                <button className="p-2 rounded-full text-gray-500 hover:text-primary-700 hover:bg-gray-100 relative">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-secondary-500"></span>
                </button>
                
                {/* Messages Icon */}
                <Link to="/chat" className="p-2 rounded-full text-gray-500 hover:text-primary-700 hover:bg-gray-100 relative">
                  <MessageCircle size={20} />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-secondary-500"></span>
                </Link>
                
                {/* Profile Dropdown */}
                <div className="relative ml-3">
                  <button 
                    onClick={toggleProfileMenu}
                    className="flex items-center gap-2 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <img 
                      className="h-8 w-8 rounded-full object-cover border border-gray-200" 
                      src={user?.avatar || "/profile.jpg"} 
                      alt={user?.name} 
                    />
                    <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                    <ChevronDown size={16} />
                  </button>
                  
                  {/* Profile Dropdown Menu */}
                  {isProfileMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 animate-fade-in">
                      <div className="py-1">
                        <Link 
                          to={`/profile/${user?.id}`} 
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <Users size={16} />
                          Your Profile
                        </Link>
                        <Link 
                          to="/profile/edit" 
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <Users size={16} />
                          Edit Profile
                        </Link>
                        <Link 
                          to="/events" 
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <Calendar size={16} />
                          Your Events
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <LogOut size={16} />
                          Log Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="btn-outline btn-sm">
                  Log In
                </Link>
                <Link to="/register" className="btn-primary btn-sm">
                  Register
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {isAuthenticated && (
              <>
                <Link to="/chat" className="p-2 rounded-full text-gray-500 hover:text-primary-700 relative">
                  <MessageCircle size={20} />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-secondary-500"></span>
                </Link>
                <button className="p-2 rounded-full text-gray-500 hover:text-primary-700 relative ml-2">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-secondary-500"></span>
                </button>
              </>
            )}
            <button
              onClick={toggleMenu}
              className="p-2 ml-2 rounded-md text-gray-700 hover:text-primary-700 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search (visible when menu is open) */}
        {isOpen && (
          <div className="md:hidden pt-2 pb-3">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Search people, clubs, events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>
        )}
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-slide-down">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-700 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/events" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-700 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Events
            </Link>
            <Link 
              to="/directory" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-700 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Directory
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to={`/profile/${user?.id}`} 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-700 hover:bg-gray-50"
                  onClick={toggleMenu}
                >
                  Your Profile
                </Link>
                <Link 
                  to="/profile/edit" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-700 hover:bg-gray-50"
                  onClick={toggleMenu}
                >
                  Edit Profile
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-700 hover:bg-gray-50"
                >
                  Log Out
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-3 px-3">
                <Link to="/login" className="btn-outline btn-sm" onClick={toggleMenu}>
                  Log In
                </Link>
                <Link to="/register" className="btn-primary btn-sm" onClick={toggleMenu}>
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;