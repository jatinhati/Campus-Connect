import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap as Graduation, AtSign, Lock, User, Users, Eye, EyeOff } from 'lucide-react';
import { useAuth, UserRole } from '../../contexts/AuthContext';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [college, setCollege] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState<number>(1);
  const [userType, setUserType] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }
    
    try {
      const userData = {
        name,
        email,
        role: userType,
        college: userType !== 'college' ? college : undefined,
        department: userType === 'student' ? department : undefined,
        year: userType === 'student' ? year : undefined,
      };

      await register(userData, password);
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-6">
            <div className="flex justify-center">
              <div className="bg-primary-700 text-white p-2 rounded-md inline-flex">
                <Graduation size={24} />
              </div>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Create your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Join the CampusConnect community
            </p>
          </div>
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-error-50 text-error-800 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            {/* Account Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I am a:
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className={`flex flex-col items-center justify-center py-3 px-4 border ${
                    userType === 'student' 
                      ? 'border-primary-700 bg-primary-50 text-primary-800' 
                      : 'border-gray-200 bg-white text-gray-700'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  onClick={() => setUserType('student')}
                >
                  <User size={20} className={userType === 'student' ? 'text-primary-700' : 'text-gray-500'} />
                  <span className="mt-1 text-sm font-medium">Student</span>
                </button>
                <button
                  type="button"
                  className={`flex flex-col items-center justify-center py-3 px-4 border ${
                    userType === 'club' 
                      ? 'border-primary-700 bg-primary-50 text-primary-800' 
                      : 'border-gray-200 bg-white text-gray-700'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  onClick={() => setUserType('club')}
                >
                  <Users size={20} className={userType === 'club' ? 'text-primary-700' : 'text-gray-500'} />
                  <span className="mt-1 text-sm font-medium">Club</span>
                </button>
                <button
                  type="button"
                  className={`flex flex-col items-center justify-center py-3 px-4 border ${
                    userType === 'college' 
                      ? 'border-primary-700 bg-primary-50 text-primary-800' 
                      : 'border-gray-200 bg-white text-gray-700'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  onClick={() => setUserType('college')}
                >
                  <Graduation size={20} className={userType === 'college' ? 'text-primary-700' : 'text-gray-500'} />
                  <span className="mt-1 text-sm font-medium">College</span>
                </button>
              </div>
            </div>
            
            {/* Full Name / Club Name / College Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                {userType === 'student' ? 'Full Name' : userType === 'club' ? 'Club Name' : 'College Name'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 input"
                  placeholder={userType === 'student' ? 'John Doe' : userType === 'club' ? 'Coding Club' : 'IIT Delhi'}
                />
              </div>
            </div>
            
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AtSign size={18} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 input"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            
            {/* College (for students and clubs) */}
            {userType !== 'college' && (
              <div>
                <label htmlFor="college" className="block text-sm font-medium text-gray-700 mb-1">
                  {userType === 'student' ? 'Your College' : 'Associated College'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Graduation size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="college"
                    name="college"
                    type="text"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="pl-10 input"
                    placeholder="IIT Delhi"
                  />
                </div>
              </div>
            )}

            {/* Department and Year (for students only) */}
            {userType === 'student' && (
              <>
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    id="department"
                    name="department"
                    type="text"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="input"
                    placeholder="Computer Science"
                  />
                </div>

                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                    Year of Study
                  </label>
                  <select
                    id="year"
                    name="year"
                    required
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                    className="input"
                  >
                    <option value={1}>1st Year</option>
                    <option value={2}>2nd Year</option>
                    <option value={3}>3rd Year</option>
                    <option value={4}>4th Year</option>
                    <option value={5}>5th Year</option>
                  </select>
                </div>
              </>
            )}
            
            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 input"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-gray-400" />
                  ) : (
                    <Eye size={18} className="text-gray-400" />
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Password must be at least 6 characters
              </p>
            </div>
            
            {/* Terms and Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-primary-700 focus:ring-primary-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-700">
                  I agree to the <a href="#" className="text-primary-700 hover:text-primary-800 font-medium">Terms of Service</a> and <a href="#" className="text-primary-700 hover:text-primary-800 font-medium">Privacy Policy</a>
                </label>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-2.5 relative"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  "Create account"
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary-700 hover:text-primary-800">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;