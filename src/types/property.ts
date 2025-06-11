export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: PropertyType;
  status: PropertyStatus;
  features: string[];
  images: PropertyImage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyImage {
  id: string;
  url: string;
  alt?: string;
  isPrimary: boolean;
}

export enum PropertyType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  VILLA = 'villa',
  STUDIO = 'studio',
  TOWNHOUSE = 'townhouse',
  PENTHOUSE = 'penthouse',
  DEPARTAMENTO = 'departamento',
  CASA = 'casa',
  TERRENO = 'terreno',
}

export enum PropertyStatus {
  AVAILABLE = 'available',
  SOLD = 'sold',
  RENTED = 'rented',
  PENDING = 'pending',
}

export interface FilterParams {
  search?: string;
  type?: PropertyType;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  location?: string;
  sortBy?: 'price' | 'date' | 'area';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}