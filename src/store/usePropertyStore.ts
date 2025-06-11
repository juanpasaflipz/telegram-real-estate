import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Property, FilterParams } from '@/types/property';

interface PropertyStore {
  properties: Property[];
  favorites: string[];
  filters: FilterParams;
  viewMode: 'grid' | 'list';
  isLoading: boolean;
  error: string | null;
  
  setProperties: (properties: Property[]) => void;
  addProperties: (properties: Property[]) => void;
  toggleFavorite: (propertyId: string) => void;
  updateFilters: (filters: Partial<FilterParams>) => void;
  resetFilters: () => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getFavoriteProperties: () => Property[];
  isPropertyFavorited: (propertyId: string) => boolean;
}

const defaultFilters: FilterParams = {
  search: '',
  sortBy: 'date',
  sortOrder: 'desc',
  page: 1,
  limit: 12,
};

export const usePropertyStore = create<PropertyStore>()(
  persist(
    (set, get) => ({
      properties: [],
      favorites: [],
      filters: defaultFilters,
      viewMode: 'grid',
      isLoading: false,
      error: null,
      
      setProperties: (properties) => set({ properties }),
      
      addProperties: (newProperties) => set((state) => ({
        properties: [...state.properties, ...newProperties],
      })),
      
      toggleFavorite: (propertyId) => set((state) => ({
        favorites: state.favorites.includes(propertyId)
          ? state.favorites.filter(id => id !== propertyId)
          : [...state.favorites, propertyId],
      })),
      
      updateFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters, page: 1 },
      })),
      
      resetFilters: () => set({ filters: defaultFilters }),
      
      setViewMode: (mode) => set({ viewMode: mode }),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error }),
      
      getFavoriteProperties: () => {
        const state = get();
        return state.properties.filter(property => 
          state.favorites.includes(property.id)
        );
      },
      
      isPropertyFavorited: (propertyId) => {
        const state = get();
        return state.favorites.includes(propertyId);
      },
    }),
    {
      name: 'property-store',
      partialize: (state) => ({
        favorites: state.favorites,
        viewMode: state.viewMode,
      }),
    }
  )
);