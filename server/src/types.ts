export interface Agent {
  name: string;
  phone: string;
  email: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: 'House' | 'Apartment';
  bedrooms: number;
  bathrooms: number;
  area: number; 
  agent: Agent;
  images: string[];
  coords: {
    lat: number;
    lng: number;
  };
  datePosted: string;
  status: 'For Sale' | 'For Rent';
}

export interface User {
  id: string;
  name: string;
  email: string;
  favorites: string[]; // Array of property IDs
} 