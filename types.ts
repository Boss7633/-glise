
export enum Page {
  HOME = 'home',
  ABOUT = 'about',
  CALENDAR = 'calendar',
  SERMONS = 'sermons',
  GALLERY = 'gallery',
  CONTACT = 'contact',
  DONATE = 'donate',
  LOGIN = 'login'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'member' | 'deacon' | 'pastor' | 'admin';
}

export type AuthMode = 'login' | 'register';

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  sermon_date: string;
  description: string;
  youtube_id: string;
  thumbnail_url: string;
  category: string;
  is_featured: boolean;
}

export interface Event {
  id: string;
  title: string;
  event_date: string;
  event_time: string;
  location: string;
  category: 'cult' | 'youth' | 'study' | 'special' | 'community';
  description: string;
}

export interface Language {
  code: 'fr' | 'en';
  label: string;
}
