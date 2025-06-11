'use client';

import { motion } from 'framer-motion';
import { Heart, Bed, Bath, Square, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Property } from '@/types/property';
import { usePropertyStore } from '@/store/usePropertyStore';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const { toggleFavorite, isPropertyFavorited } = usePropertyStore();
  const isFavorited = isPropertyFavorited(property.id);
  const primaryImage = property.images?.find(img => img.isPrimary) || property.images?.[0];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(property.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Link href={`/properties/${property.id}`}>
        <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="p-0">
            <div className="relative aspect-[4/3] overflow-hidden">
              {primaryImage ? (
                <Image
                  src={primaryImage.url}
                  alt={primaryImage.alt || property.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <Square className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
              <Button
                size="icon"
                variant="secondary"
                className="absolute top-2 right-2"
                onClick={handleFavoriteClick}
              >
                <Heart
                  className={cn(
                    "h-4 w-4",
                    isFavorited && "fill-red-500 text-red-500"
                  )}
                />
              </Button>
              <Badge className="absolute top-2 left-2">
                {property.type}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg line-clamp-1">
                {property.title}
              </h3>
              <p className="text-2xl font-bold text-primary">
                {formatPrice(property.price)}
              </p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span className="line-clamp-1">{property.location}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Bed className="h-4 w-4 text-muted-foreground" />
                  <span>{property.bedrooms}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="h-4 w-4 text-muted-foreground" />
                  <span>{property.bathrooms}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Square className="h-4 w-4 text-muted-foreground" />
                  <span>{property.area} m²</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}