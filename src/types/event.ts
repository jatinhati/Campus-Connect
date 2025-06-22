export interface EventOrganizer {
  id: string;
  name: string;
  avatar: string;
}

export interface EventDateObj {
  day: string;
  month: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  image: string;
  date: string;
  time: string;
  location: string;
  college: string;
  organizer: EventOrganizer;
  attendees: number;
  type: 'hackathon' | 'cultural' | 'workshop' | 'seminar';
  dateObj: EventDateObj;
  isRegistered?: boolean;
}