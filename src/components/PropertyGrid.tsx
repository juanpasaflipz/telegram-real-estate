'use client';

import { useState, useEffect } from 'react';
import { Grid3X3, List, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PropertyCard } from './PropertyCard';
import { PropertyListItem } from './PropertyListItem';
import { Property } from '@/types/property';
import { usePropertyStore } from '@/store/usePropertyStore';
import { propertyService } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

interface PropertyGridProps {
  initialProperties?: Property[];
}

export function PropertyGrid({ initialProperties = [] }: PropertyGridProps) {
  const { 
    properties, 
    setProperties, 
    filters, 
    viewMode, 
    setViewMode,
    isLoading,
    setLoading,
    setError 
  } = usePropertyStore();
  
  const { data, isLoading: queryLoading, error } = useQuery({
    queryKey: ['properties', filters],
    queryFn: () => propertyService.getProperties(filters),
    initialData: initialProperties.length > 0 ? {
      data: initialProperties,
      total: initialProperties.length,
      page: 1,
      totalPages: 1,
      hasNext: false,
      hasPrev: false,
    } : undefined,
  });

  useEffect(() => {
    if (data) {
      setProperties(data.data);
    }
  }, [data, setProperties]);

  useEffect(() => {
    setLoading(queryLoading);
  }, [queryLoading, setLoading]);

  useEffect(() => {
    if (error) {
      setError(error.message);
    }
  }, [error, setError]);

  const renderSkeletons = () => {
    return Array.from({ length: 6 }).map((_, index) => (
      <div key={index}>
        {viewMode === 'grid' ? (
          <Card className="overflow-hidden">
            <Skeleton className="aspect-[4/3] w-full" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-3 w-full" />
              <div className="flex gap-4">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </Card>
        ) : (
          <Card className="overflow-hidden">
            <div className="flex">
              <Skeleton className="w-64 h-48" />
              <div className="flex-1 p-6 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {data ? `${data.total} Properties Found` : 'Properties'}
        </h2>
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
      </div>

      {isLoading ? (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
        }>
          {renderSkeletons()}
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No properties found.</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
        }>
          {properties.map((property, index) => (
            viewMode === 'grid' ? (
              <PropertyCard key={property.id} property={property} index={index} />
            ) : (
              <PropertyListItem key={property.id} property={property} index={index} />
            )
          ))}
        </div>
      )}

      {data && data.hasNext && (
        <div className="flex justify-center pt-6">
          <Button
            variant="outline"
            onClick={() => {
              // Load more functionality
            }}
          >
            Load More
            <Loader2 className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}