'use client';

import { usePropertyStore } from '@/store/usePropertyStore';
import { PropertyCard } from '@/components/PropertyCard';
import { PropertyListItem } from '@/components/PropertyListItem';
import { Grid3X3, List, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FavoritesPage() {
  const { getFavoriteProperties, viewMode, setViewMode } = usePropertyStore();
  const favoriteProperties = getFavoriteProperties();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">My Favorites</h1>
            {favoriteProperties.length > 0 && (
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {favoriteProperties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Heart className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6">
              Start exploring and save properties you love
            </p>
            <Link href="/">
              <Button>Browse Properties</Button>
            </Link>
          </div>
        ) : (
          <div>
            <p className="text-muted-foreground mb-6">
              {favoriteProperties.length} {favoriteProperties.length === 1 ? 'property' : 'properties'} saved
            </p>
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
            }>
              {favoriteProperties.map((property, index) => (
                viewMode === 'grid' ? (
                  <PropertyCard key={property.id} property={property} index={index} />
                ) : (
                  <PropertyListItem key={property.id} property={property} index={index} />
                )
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}