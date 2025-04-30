import { Link } from 'react-router-dom';
import { GraduationCap as Graduation, Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="bg-primary-700 text-white p-1 rounded-md">
                <Graduation size={20} />
              </div>
              <span className="text-lg font-semibold text-primary-700">CampusConnect</span>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              Connecting students, clubs, and colleges across India with opportunities, events, and communities.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary-700">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-700">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-700">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-700">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-800 uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/events" className="text-sm text-gray-600 hover:text-primary-700">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/directory" className="text-sm text-gray-600 hover:text-primary-700">
                  Directory
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-sm text-gray-600 hover:text-primary-700">
                  Chat
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-800 uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-primary-700">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-primary-700">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-primary-700">
                  Career Resources
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-primary-700">
                  Student Guides
                </a>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-800 uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-primary-700">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-primary-700">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-primary-700">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} CampusConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;