import { PropertyGrid } from '@/components/PropertyGrid';
import { PropertyFilters } from '@/components/PropertyFilters';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Real Estate Properties</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 space-y-6">
        <PropertyFilters />
        <PropertyGrid />
      </main>
    </div>
  );
}