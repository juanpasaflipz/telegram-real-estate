'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePropertyStore } from '@/store/usePropertyStore';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function Navigation() {
  const pathname = usePathname();
  const { favorites } = usePropertyStore();

  const navItems = [
    {
      href: '/',
      label: 'Home',
      icon: Home,
    },
    {
      href: '/favorites',
      label: 'Favorites',
      icon: Heart,
      badge: favorites.length > 0 ? favorites.length : null,
    },
    {
      href: '/profile',
      label: 'Profile',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className="flex-1">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full flex flex-col items-center gap-1 h-auto py-2 relative",
                    isActive && "text-primary"
                  )}
                >
                  <div className="relative">
                    <item.icon className="h-5 w-5" />
                    {item.badge && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}