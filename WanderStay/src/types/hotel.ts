export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  images: string[];
  description: string;
  facilities: string[];
  isRecommended?: boolean;
}

export interface FilterState {
  searchQuery: string;
  city: string;
  checkInDate: string | null;
  checkOutDate: string | null;
  guests: number;
  rooms: number;
  priceRange: [number, number];
  minRating: number | null;
  facilities: string[];
  sortBy: 'recommended' | 'price_low_high' | 'price_high_low' | 'rating';
}

export interface BookingSummary {
  hotel: Hotel;
  checkInDate: string;
  checkOutDate: string;
  totalNights: number;
  guests: number;
  rooms: number;
  pricePerNight: number;
  subtotal: number;
  tax: number;
  grandTotal: number;
}