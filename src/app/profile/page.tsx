'use client';

import { User, Settings, Heart, Clock, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePropertyStore } from '@/store/usePropertyStore';
import { useTelegramWebApp } from '@/components/TelegramProvider';
import Link from 'next/link';

export default function ProfilePage() {
  const { favorites } = usePropertyStore();
  const { user, isInTelegram } = useTelegramWebApp();

  const menuItems = [
    {
      icon: Heart,
      label: 'My Favorites',
      value: `${favorites.length} properties`,
      href: '/favorites',
    },
    {
      icon: Clock,
      label: 'Recently Viewed',
      value: 'Coming soon',
      href: '#',
    },
    {
      icon: Settings,
      label: 'Settings',
      value: '',
      href: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {isInTelegram && user ? `${user.first_name} ${user.last_name || ''}` : 'Guest User'}
                </h2>
                {isInTelegram && user && (
                  <p className="text-sm text-muted-foreground">@{user.username || user.id}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link key={item.label} href={item.href}>
              <Card className="hover:bg-accent transition-colors cursor-pointer">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.value && (
                    <span className="text-sm text-muted-foreground">{item.value}</span>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Real Estate Properties v1.0.0</p>
            <p>Find your dream property with ease</p>
            {isInTelegram && (
              <p className="text-xs">Running in Telegram Mini App</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}