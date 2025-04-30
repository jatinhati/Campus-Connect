import { Link } from 'react-router-dom';
import { Frown, Home } from 'lucide-react';

function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        <div className="text-primary-700 mb-4">
          <Frown size={64} className="mx-auto" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center">
          <Home size={18} className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;