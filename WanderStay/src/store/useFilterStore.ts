import { create } from 'zustand';
import type { FilterState } from '../types/hotel';

interface FilterStore extends FilterState {
  setSearchQuery: (query: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setMinRating: (rating: number | null) => void;
  toggleFacility: (facility: string) => void;
  setSortBy: (sortBy: FilterState['sortBy']) => void;
  resetFilters: () => void;
}

const initialFilters: FilterState = {
  searchQuery: '',
  city: 'Ball, Indonesia',
  checkInDate: null,
  checkOutDate: null,
  guests: 1,
  rooms: 1,
  priceRange: [50, 1000],
  minRating: null,
  facilities: [],
  sortBy: 'recommended',
};

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialFilters,
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setMinRating: (minRating) => set({ minRating }),
  toggleFacility: (facility) =>
    set((state) => ({
      facilities: state.facilities.includes(facility)
        ? state.facilities.filter((f) => f !== facility)
        : [...state.facilities, facility],
    })),
  setSortBy: (sortBy) => set({ sortBy }),
  resetFilters: () => set(initialFilters),
}));