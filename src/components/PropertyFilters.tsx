'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { PropertyType, FilterParams } from '@/types/property';
import { usePropertyStore } from '@/store/usePropertyStore';

export function PropertyFilters() {
  const { filters, updateFilters, resetFilters } = usePropertyStore();
  const [localFilters, setLocalFilters] = useState<FilterParams>(filters);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchChange = (value: string) => {
    updateFilters({ search: value });
  };

  const handleFilterChange = (key: keyof FilterParams, value: any) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    updateFilters(localFilters);
    setIsOpen(false);
  };

  const clearFilters = () => {
    resetFilters();
    setLocalFilters({});
    setIsOpen(false);
  };

  const activeFiltersCount = Object.entries(filters).filter(
    ([key, value]) => value && key !== 'page' && key !== 'limit' && key !== 'sortBy' && key !== 'sortOrder'
  ).length;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search properties..."
            value={filters.search || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <SlidersHorizontal className="h-4 w-4" />
              {activeFiltersCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center"
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Properties</SheetTitle>
              <SheetDescription>
                Narrow down your property search
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <div className="space-y-2">
                <Label>Property Type</Label>
                <Select
                  value={localFilters.type || ''}
                  onValueChange={(value) => handleFilterChange('type', value as PropertyType)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All types</SelectItem>
                    <SelectItem value={PropertyType.DEPARTAMENTO}>Departamento</SelectItem>
                    <SelectItem value={PropertyType.CASA}>Casa</SelectItem>
                    <SelectItem value={PropertyType.TERRENO}>Terreno</SelectItem>
                    <SelectItem value={PropertyType.APARTMENT}>Apartment</SelectItem>
                    <SelectItem value={PropertyType.HOUSE}>House</SelectItem>
                    <SelectItem value={PropertyType.VILLA}>Villa</SelectItem>
                    <SelectItem value={PropertyType.STUDIO}>Studio</SelectItem>
                    <SelectItem value={PropertyType.TOWNHOUSE}>Townhouse</SelectItem>
                    <SelectItem value={PropertyType.PENTHOUSE}>Penthouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Price Range</Label>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={localFilters.minPrice || ''}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                    />
                    <span className="text-muted-foreground">to</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={localFilters.maxPrice || ''}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Bedrooms</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, '5+'].map((num) => (
                    <Button
                      key={num}
                      variant={localFilters.bedrooms === (num === '5+' ? 5 : num) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleFilterChange('bedrooms', num === '5+' ? 5 : num)}
                      className="flex-1"
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Bathrooms</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, '4+'].map((num) => (
                    <Button
                      key={num}
                      variant={localFilters.bathrooms === (num === '4+' ? 4 : num) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleFilterChange('bathrooms', num === '4+' ? 4 : num)}
                      className="flex-1"
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Sort By</Label>
                <Select
                  value={localFilters.sortBy || 'date'}
                  onValueChange={(value) => handleFilterChange('sortBy', value as 'price' | 'date' | 'area')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Newest First</SelectItem>
                    <SelectItem value="price">Price: Low to High</SelectItem>
                    <SelectItem value="area">Size: Large to Small</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-6">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="flex-1"
                >
                  Clear All
                </Button>
                <Button
                  onClick={applyFilters}
                  className="flex-1"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters.type && (
            <Badge variant="secondary">
              {filters.type}
              <button
                onClick={() => updateFilters({ type: undefined })}
                className="ml-1"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.minPrice && (
            <Badge variant="secondary">
              Min: ${filters.minPrice.toLocaleString()}
              <button
                onClick={() => updateFilters({ minPrice: undefined })}
                className="ml-1"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.maxPrice && (
            <Badge variant="secondary">
              Max: ${filters.maxPrice.toLocaleString()}
              <button
                onClick={() => updateFilters({ maxPrice: undefined })}
                className="ml-1"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.bedrooms && (
            <Badge variant="secondary">
              {filters.bedrooms}+ beds
              <button
                onClick={() => updateFilters({ bedrooms: undefined })}
                className="ml-1"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.bathrooms && (
            <Badge variant="secondary">
              {filters.bathrooms}+ baths
              <button
                onClick={() => updateFilters({ bathrooms: undefined })}
                className="ml-1"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}