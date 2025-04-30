import { Post } from '../types/post';

// Sample data for posts
export const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      id: '1',
      name: 'Rahul Sharma',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'student',
      college: 'IIT Delhi'
    },
    content: 'Just submitted my research paper on machine learning algorithms for the IEEE conference! Excited to share my work with the academic community. 🎉',
    timeAgo: '2 hours ago',
    likes: 24,
    comments: 5,
    tags: ['research', 'machinelearning', 'academics'],
    visibility: 'public'
  },
  {
    id: '2',
    author: {
      id: '2',
      name: 'Coding Club',
      avatar: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'club',
      college: 'IIT Delhi'
    },
    content: 'We\'re excited to announce our annual hackathon - CodeFest 2023! Mark your calendars for Sept 15-16. This year\'s theme: "Tech for Social Good". Registration opens next week!',
    image: 'https://images.pexels.com/photos/7103/writing-notes-idea-conference.jpg?auto=compress&cs=tinysrgb&w=1260&h=750',
    timeAgo: '5 hours ago',
    likes: 145,
    comments: 32,
    tags: ['hackathon', 'coding', 'techforsocialgood'],
    visibility: 'public'
  },
  {
    id: '3',
    author: {
      id: '3',
      name: 'Delhi University',
      avatar: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'college'
    },
    content: 'Admissions for the 2023-24 academic year are now open! Visit our website for course details and application procedures. Last date to apply: July 31st.',
    timeAgo: '1 day ago',
    likes: 210,
    comments: 78,
    tags: ['admissions', 'highereducation'],
    visibility: 'public'
  },
  {
    id: '4',
    author: {
      id: '1',
      name: 'Rahul Sharma',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'student',
      college: 'IIT Delhi'
    },
    content: 'Looking for team members for the upcoming hackathon. Need someone with UI/UX skills and a backend developer familiar with Node.js. DM if interested!',
    timeAgo: '2 days ago',
    likes: 18,
    comments: 7,
    tags: ['teamwork', 'hackathon', 'development'],
    visibility: 'public'
  },
  {
    id: '5',
    author: {
      id: '2',
      name: 'Coding Club',
      avatar: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'club',
      college: 'IIT Delhi'
    },
    content: 'Yesterday\'s Python workshop was a huge success! Thanks to all 80+ participants who joined us. Special thanks to Prof. Gupta for the insightful keynote on AI applications.',
    image: 'https://images.pexels.com/photos/7108/notebook-computer-chill-relax.jpg?auto=compress&cs=tinysrgb&w=1260&h=750',
    timeAgo: '3 days ago',
    likes: 92,
    comments: 14,
    tags: ['workshop', 'python', 'programming'],
    visibility: 'public'
  }
];