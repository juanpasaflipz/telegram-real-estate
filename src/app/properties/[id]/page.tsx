import { notFound } from 'next/navigation';
import { ImageCarousel } from '@/components/ImageCarousel';
import { PropertyDetailClient } from './PropertyDetailClient';
import { propertyService } from '@/services/api';

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>;
}

async function getProperty(id: string) {
  try {
    const property = await propertyService.getProperty(id);
    return property;
  } catch (error) {
    return null;
  }
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { id } = await params;
  const property = await getProperty(id);

  if (!property) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <PropertyDetailClient property={property} />
    </div>
  );
}