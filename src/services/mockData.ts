import { Property, PropertyType, PropertyStatus } from '@/types/property';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    description: 'Beautiful 2-bedroom apartment in the heart of downtown with stunning city views. Recently renovated with modern appliances and finishes.',
    price: 350000,
    location: 'Downtown',
    address: '123 Main Street, Downtown',
    bedrooms: 2,
    bathrooms: 2,
    area: 95,
    type: PropertyType.APARTMENT,
    status: PropertyStatus.AVAILABLE,
    features: [
      'City View',
      'Gym',
      'Swimming Pool',
      'Parking',
      'Security',
      'Balcony',
    ],
    images: [
      {
        id: '1-1',
        url: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800',
        alt: 'Living room',
        isPrimary: true,
      },
      {
        id: '1-2',
        url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
        alt: 'Kitchen',
        isPrimary: false,
      },
      {
        id: '1-3',
        url: 'https://images.unsplash.com/photo-1565623006066-82f23c79210b?w=800',
        alt: 'Bedroom',
        isPrimary: false,
      },
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Spacious Family House',
    description: 'Perfect family home with 4 bedrooms, large backyard, and located in a quiet neighborhood with excellent schools nearby.',
    price: 650000,
    location: 'Suburbs',
    address: '456 Oak Avenue, Westside',
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    type: PropertyType.HOUSE,
    status: PropertyStatus.AVAILABLE,
    features: [
      'Garden',
      'Garage',
      'Fireplace',
      'Storage Room',
      'Renovated Kitchen',
      'Home Office',
    ],
    images: [
      {
        id: '2-1',
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
        alt: 'House exterior',
        isPrimary: true,
      },
      {
        id: '2-2',
        url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
        alt: 'Front view',
        isPrimary: false,
      },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    title: 'Luxury Beachfront Villa',
    description: 'Exclusive villa with private beach access, infinity pool, and breathtaking ocean views. A perfect retreat for luxury living.',
    price: 2500000,
    location: 'Beachfront',
    address: '789 Coastal Highway',
    bedrooms: 5,
    bathrooms: 4,
    area: 450,
    type: PropertyType.VILLA,
    status: PropertyStatus.AVAILABLE,
    features: [
      'Ocean View',
      'Private Beach',
      'Infinity Pool',
      'Wine Cellar',
      'Home Theater',
      'Smart Home',
    ],
    images: [
      {
        id: '3-1',
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        alt: 'Villa exterior',
        isPrimary: true,
      },
      {
        id: '3-2',
        url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
        alt: 'Pool view',
        isPrimary: false,
      },
    ],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    id: '4',
    title: 'Cozy Studio Apartment',
    description: 'Efficient studio apartment perfect for students or young professionals. Close to public transportation and shopping.',
    price: 150000,
    location: 'City Center',
    address: '321 University Blvd',
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    type: PropertyType.STUDIO,
    status: PropertyStatus.AVAILABLE,
    features: [
      'Furnished',
      'High-Speed Internet',
      'Laundry',
      'Security',
    ],
    images: [
      {
        id: '4-1',
        url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        alt: 'Studio interior',
        isPrimary: true,
      },
    ],
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    id: '5',
    title: 'Modern Townhouse',
    description: 'Contemporary 3-story townhouse with rooftop terrace and garage. Located in a trendy neighborhood with cafes and restaurants.',
    price: 480000,
    location: 'Midtown',
    address: '555 Modern Lane',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    type: PropertyType.TOWNHOUSE,
    status: PropertyStatus.AVAILABLE,
    features: [
      'Rooftop Terrace',
      'Garage',
      'Walk-in Closet',
      'Modern Kitchen',
      'Energy Efficient',
    ],
    images: [
      {
        id: '5-1',
        url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
        alt: 'Townhouse exterior',
        isPrimary: true,
      },
      {
        id: '5-2',
        url: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800',
        alt: 'Interior',
        isPrimary: false,
      },
    ],
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
  {
    id: '6',
    title: 'Penthouse with City Views',
    description: 'Luxurious penthouse on the 30th floor with panoramic city views, private elevator, and premium finishes throughout.',
    price: 1800000,
    location: 'Downtown',
    address: '999 Skyline Tower',
    bedrooms: 3,
    bathrooms: 3,
    area: 280,
    type: PropertyType.PENTHOUSE,
    status: PropertyStatus.AVAILABLE,
    features: [
      'Panoramic Views',
      'Private Elevator',
      'Wine Bar',
      'Designer Kitchen',
      'Floor-to-Ceiling Windows',
      'Concierge Service',
    ],
    images: [
      {
        id: '6-1',
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
        alt: 'Penthouse living room',
        isPrimary: true,
      },
      {
        id: '6-2',
        url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
        alt: 'City view',
        isPrimary: false,
      },
    ],
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
  },
];