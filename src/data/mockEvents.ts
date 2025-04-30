import { Event } from '../types/event';

// Sample data for events
export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'CodeFest 2023: Tech for Social Good',
    description: 'Annual hackathon focused on developing tech solutions for social challenges',
    image: 'https://images.pexels.com/photos/7103/writing-notes-idea-conference.jpg?auto=compress&cs=tinysrgb&w=1260&h=750',
    date: 'Sept 15-16, 2023',
    time: '9:00 AM - 6:00 PM',
    location: 'Main Auditorium, IIT Delhi Campus',
    college: 'IIT Delhi',
    organizer: {
      id: '2',
      name: 'Coding Club',
      avatar: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    attendees: 240,
    type: 'hackathon',
    dateObj: {
      day: '15',
      month: 'SEP'
    }
  },
  {
    id: '2',
    title: 'Annual Cultural Festival: Rendezvous',
    description: 'The biggest cultural festival in North India featuring music, dance, and drama performances',
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    date: 'Oct 20-23, 2023',
    time: 'All Day',
    location: 'IIT Delhi Campus',
    college: 'IIT Delhi',
    organizer: {
      id: '4',
      name: 'Cultural Board',
      avatar: 'https://images.pexels.com/photos/7432/pexels-photo-7432.jpg?auto=compress&cs=tinysrgb&w=150'
    },
    attendees: 1500,
    type: 'cultural',
    dateObj: {
      day: '20',
      month: 'OCT'
    }
  },
  {
    id: '3',
    title: 'AI Workshop: Deep Learning Fundamentals',
    description: 'Hands-on workshop covering the basics of deep learning and neural networks',
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    date: 'Aug 25, 2023',
    time: '10:00 AM - 2:00 PM',
    location: 'Computer Science Building, IIT Bombay',
    college: 'IIT Bombay',
    organizer: {
      id: '5',
      name: 'AI Research Group',
      avatar: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    attendees: 85,
    type: 'workshop',
    dateObj: {
      day: '25',
      month: 'AUG'
    }
  },
  {
    id: '4',
    title: 'Finance Conclave 2023',
    description: 'Annual event bringing together industry leaders to discuss the future of finance and economics',
    image: 'https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    date: 'Sept 8, 2023',
    time: '9:30 AM - 5:30 PM',
    location: 'Management Building, IIM Ahmedabad',
    college: 'IIM Ahmedabad',
    organizer: {
      id: '6',
      name: 'Finance Club',
      avatar: 'https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    attendees: 120,
    type: 'seminar',
    dateObj: {
      day: '08',
      month: 'SEP'
    }
  },
  {
    id: '5',
    title: 'Robotics Competition: TechTronics',
    description: 'Inter-college robotics competition featuring autonomous and manual robot challenges',
    image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    date: 'Nov 12-13, 2023',
    time: '10:00 AM - 4:00 PM',
    location: 'Engineering Block, BITS Pilani',
    college: 'BITS Pilani',
    organizer: {
      id: '7',
      name: 'Robotics Club',
      avatar: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    attendees: 150,
    type: 'workshop',
    dateObj: {
      day: '12',
      month: 'NOV'
    }
  },
  {
    id: '6',
    title: 'Literary Festival: WordCraft',
    description: 'Celebrating the art of writing with competitions, workshops, and guest author sessions',
    image: 'https://images.pexels.com/photos/159866/books-book-pages-story-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    date: 'Oct 5-6, 2023',
    time: '11:00 AM - 7:00 PM',
    location: 'Arts Faculty, Delhi University',
    college: 'Delhi University',
    organizer: {
      id: '8',
      name: 'Literary Society',
      avatar: 'https://images.pexels.com/photos/256450/pexels-photo-256450.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    attendees: 200,
    type: 'cultural',
    dateObj: {
      day: '05',
      month: 'OCT'
    }
  }
];