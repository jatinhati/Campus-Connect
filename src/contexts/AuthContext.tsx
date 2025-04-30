import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export type UserRole = 'student' | 'club' | 'college';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  college?: string;
  department?: string;
  year?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample user data with passwords (temporary)
interface MockUser extends User {
  password: string;
}

const MOCK_USERS: MockUser[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    password: 'password123', // In a real app, this would be hashed
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'student' as UserRole,
    college: 'IIT Delhi',
    department: 'Computer Science',
    year: 3
  },
  {
    id: '2',
    name: 'Coding Club',
    email: 'coding@iitd.ac.in',
    password: 'password123', // In a real app, this would be hashed
    avatar: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'club' as UserRole,
    college: 'IIT Delhi'
  }
];

// Auth Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('campusConnectUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find user with matching email (in a real app, this would be handled by your backend)
      const foundUser = MOCK_USERS.find(u => u.email === email);
      
      if (!foundUser || foundUser.password !== password) {
        throw new Error('Invalid credentials');
      }
      
      // Remove password before storing in localStorage
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Store user in local storage
      localStorage.setItem('campusConnectUser', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: Partial<User>, password: string) => {
    setIsLoading(true);
    try {
      // Validate required fields
      if (!userData.email || !userData.name || !userData.role) {
        throw new Error('Missing required fields');
      }

      // Check if email already exists
      const existingUser = MOCK_USERS.find(u => u.email === userData.email);
      if (existingUser) {
        throw new Error('Email already registered');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new user
      const newUser: MockUser = {
        id: Math.random().toString(36).substring(2, 9),
        name: userData.name,
        email: userData.email,
        password, // In a real app, this would be hashed
        role: userData.role,
        college: userData.college,
        department: userData.department,
        year: userData.year,
        avatar: `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000)}/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=150`
      };
      
      // Add to mock users (in a real app, this would be handled by your backend)
      MOCK_USERS.push(newUser);
      
      // Remove password before storing in localStorage
      const { password: _, ...userWithoutPassword } = newUser;
      
      // Store user in local storage
      localStorage.setItem('campusConnectUser', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('campusConnectUser');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}