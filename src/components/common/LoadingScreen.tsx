import { GraduationCap as Graduation } from 'lucide-react';

function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        <div className="bg-primary-700 text-white p-2 rounded-md mb-3 animate-pulse">
          <Graduation size={32} />
        </div>
        <h1 className="text-xl font-semibold text-primary-700 mb-2">CampusConnect</h1>
        <p className="text-gray-500 text-sm">Loading your campus experience...</p>
      </div>
    </div>
  );
}

export default LoadingScreen;