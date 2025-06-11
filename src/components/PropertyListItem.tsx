'use client';

import { motion } from 'framer-motion';
import { Heart, Bed, Bath, Square, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Property } from '@/types/property';
import { usePropertyStore } from '@/store/usePropertyStore';
import { cn } from '@/lib/utils';

interface PropertyListItemProps {
  property: Property;
  index?: number;
}

export function PropertyListItem({ property, index = 0 }: PropertyListItemProps) {
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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={`/properties/${property.id}`}>
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              <div className="relative w-full sm:w-64 h-48 sm:h-auto">
                {primaryImage ? (
                  <Image
                    src={primaryImage.url}
                    alt={primaryImage.alt || property.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 256px"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <Square className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                <Badge className="absolute top-2 left-2">
                  {property.type}
                </Badge>
              </div>
              <div className="flex-1 p-4 sm:p-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-lg sm:text-xl line-clamp-1">
                      {property.title}
                    </h3>
                    <p className="text-2xl font-bold text-primary">
                      {formatPrice(property.price)}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="line-clamp-1">{property.location}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {property.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4 text-muted-foreground" />
                        <span>{property.bedrooms} beds</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4 text-muted-foreground" />
                        <span>{property.bathrooms} baths</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Square className="h-4 w-4 text-muted-foreground" />
                        <span>{property.area} m²</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={handleFavoriteClick}
                  >
                    <Heart
                      className={cn(
                        "h-4 w-4",
                        isFavorited && "fill-red-500 text-red-500"
                      )}
                    />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}