'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Bed, 
  Bath, 
  Square, 
  MapPin,
  Check,
  Phone,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageCarousel } from '@/components/ImageCarousel';
import { Property } from '@/types/property';
import { usePropertyStore } from '@/store/usePropertyStore';
import { cn } from '@/lib/utils';
import { useTelegramWebApp } from '@/components/TelegramProvider';

interface PropertyDetailClientProps {
  property: Property;
}

export function PropertyDetailClient({ property }: PropertyDetailClientProps) {
  const router = useRouter();
  const { toggleFavorite, isPropertyFavorited } = usePropertyStore();
  const isFavorited = isPropertyFavorited(property.id);
  const { isInTelegram, openTelegramLink, shareToStory, hapticFeedback } = useTelegramWebApp();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleShare = async () => {
    hapticFeedback.impact('light');
    
    if (isInTelegram && property.images?.[0]?.url) {
      // Use Telegram's share to story feature
      shareToStory(property.images[0].url, `Check out this property: ${property.title}`);
    } else if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Check out this property: ${property.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  const handleContact = () => {
    hapticFeedback.impact('medium');
    
    if (isInTelegram) {
      // Open direct chat in Telegram
      openTelegramLink('https://t.me/yourusername');
    } else {
      window.open('https://t.me/yourusername', '_blank');
    }
  };

  return (
    <>
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => toggleFavorite(property.id)}
              >
                <Heart
                  className={cn(
                    "h-5 w-5",
                    isFavorited && "fill-red-500 text-red-500"
                  )}
                />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ImageCarousel images={property.images} title={property.title} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold">{property.title}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <p className="text-muted-foreground">{property.address || property.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">
                  {formatPrice(property.price)}
                </p>
                <Badge variant="outline" className="mt-2">
                  {property.status}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-4">
                <Bed className="h-6 w-6 text-muted-foreground mb-2" />
                <p className="text-2xl font-semibold">{property.bedrooms}</p>
                <p className="text-sm text-muted-foreground">Bedrooms</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-4">
                <Bath className="h-6 w-6 text-muted-foreground mb-2" />
                <p className="text-2xl font-semibold">{property.bathrooms}</p>
                <p className="text-sm text-muted-foreground">Bathrooms</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-4">
                <Square className="h-6 w-6 text-muted-foreground mb-2" />
                <p className="text-2xl font-semibold">{property.area}</p>
                <p className="text-sm text-muted-foreground">m²</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {property.description}
              </p>
            </CardContent>
          </Card>

          {property.features && property.features.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {property.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </main>

      <div className="sticky bottom-0 bg-background border-t p-4">
        <div className="container mx-auto">
          <div className="flex gap-3">
            <Button 
              size="lg" 
              className="flex-1"
              onClick={handleContact}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Contact via Telegram
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.open('tel:+1234567890')}
            >
              <Phone className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}