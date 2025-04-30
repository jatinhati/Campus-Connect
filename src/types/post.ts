import { User } from '../contexts/AuthContext';

export interface PostAuthor {
  id: string;
  name: string;
  avatar: string;
  role: 'student' | 'club' | 'college';
  college?: string;
}

export interface Post {
  id: string;
  author: PostAuthor;
  content: string;
  image?: string;
  timeAgo: string;
  likes: number;
  comments: number;
  tags?: string[];
  visibility: 'public' | 'private' | 'connections';
}