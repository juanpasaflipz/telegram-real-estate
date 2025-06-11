import axios from 'axios';
import { Property, FilterParams, PaginatedResponse } from '@/types/property';
import { mockProperties } from './mockData';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const USE_MOCK_DATA = false; // Using real API now

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const propertyService = {
  async getProperties(filters?: FilterParams): Promise<PaginatedResponse<Property>> {
    if (USE_MOCK_DATA) {
      // Apply filters to mock data
      let filteredProperties = [...mockProperties];
      
      if (filters) {
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filteredProperties = filteredProperties.filter(p => 
            p.title.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower) ||
            p.location.toLowerCase().includes(searchLower)
          );
        }
        
        if (filters.type) {
          filteredProperties = filteredProperties.filter(p => p.type === filters.type);
        }
        
        if (filters.minPrice) {
          filteredProperties = filteredProperties.filter(p => p.price >= filters.minPrice!);
        }
        
        if (filters.maxPrice) {
          filteredProperties = filteredProperties.filter(p => p.price <= filters.maxPrice!);
        }
        
        if (filters.bedrooms) {
          filteredProperties = filteredProperties.filter(p => p.bedrooms >= filters.bedrooms!);
        }
        
        if (filters.bathrooms) {
          filteredProperties = filteredProperties.filter(p => p.bathrooms >= filters.bathrooms!);
        }
        
        if (filters.sortBy) {
          filteredProperties.sort((a, b) => {
            switch (filters.sortBy) {
              case 'price':
                return filters.sortOrder === 'desc' ? b.price - a.price : a.price - b.price;
              case 'area':
                return filters.sortOrder === 'desc' ? b.area - a.area : a.area - b.area;
              case 'date':
              default:
                return filters.sortOrder === 'desc' 
                  ? b.createdAt.getTime() - a.createdAt.getTime()
                  : a.createdAt.getTime() - b.createdAt.getTime();
            }
          });
        }
      }
      
      const page = filters?.page || 1;
      const limit = filters?.limit || 12;
      const start = (page - 1) * limit;
      const paginatedData = filteredProperties.slice(start, start + limit);
      
      return {
        data: paginatedData,
        total: filteredProperties.length,
        page,
        totalPages: Math.ceil(filteredProperties.length / limit),
        hasNext: start + limit < filteredProperties.length,
        hasPrev: page > 1,
      };
    }
    
    try {
      const params = new URLSearchParams();
      
      // API requires at least one location parameter
      params.append('city', 'Santiago');
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });
      }
      
      const response = await api.get(`/properties?${params.toString()}`);
      
      // Transform API response to match our interface
      if (response.data.status === 'success' && response.data.data?.properties) {
        const properties = response.data.data.properties.map((p: any) => ({
          id: p.id,
          title: p.title,
          description: p.description || `${p.bedrooms || 0} bedrooms • ${p.bathrooms || 0} bathrooms • ${p.size || 0} m²`,
          price: p.price,
          location: p.location?.split(',')[0] || p.location,
          address: p.location,
          bedrooms: p.bedrooms || 0,
          bathrooms: p.bathrooms || 0,
          area: p.size || 0,
          type: p.propertyType?.toLowerCase() || 'apartment',
          status: 'available',
          features: [],
          images: p.images?.map((url: string, index: number) => ({
            id: `${p.id}-${index}`,
            url,
            isPrimary: index === 0
          })) || [],
          createdAt: new Date(p.createdAt || Date.now()),
          updatedAt: new Date(p.createdAt || Date.now())
        }));
        
        return {
          data: properties,
          total: properties.length,
          page: 1,
          totalPages: 1,
          hasNext: false,
          hasPrev: false
        };
      }
      
      throw new Error('Invalid API response');
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  },
  
  async getProperty(id: string): Promise<Property> {
    if (USE_MOCK_DATA) {
      const property = mockProperties.find(p => p.id === id);
      if (!property) {
        throw new Error('Property not found');
      }
      return property;
    }
    
    try {
      const response = await api.get(`/api/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching property ${id}:`, error);
      throw error;
    }
  },
  
  async getFeaturedProperties(): Promise<Property[]> {
    if (USE_MOCK_DATA) {
      return mockProperties.slice(0, 3);
    }
    
    try {
      const response = await api.get('/api/properties/featured');
      return response.data;
    } catch (error) {
      console.error('Error fetching featured properties:', error);
      throw error;
    }
  },
  
  async getLocations(): Promise<string[]> {
    if (USE_MOCK_DATA) {
      const locations = [...new Set(mockProperties.map(p => p.location))];
      return locations;
    }
    
    try {
      const response = await api.get('/api/properties/locations');
      return response.data;
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw error;
    }
  },
};

export default api;