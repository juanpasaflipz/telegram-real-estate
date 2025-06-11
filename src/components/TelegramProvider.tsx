'use client';

import { useEffect, useState } from 'react';

interface TelegramProviderProps {
  children: React.ReactNode;
}

export function TelegramProvider({ children }: TelegramProviderProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Dynamically import WebApp only on client side
    const initTelegram = async () => {
      if (typeof window !== 'undefined') {
        const { default: WebApp } = await import('@twa-dev/sdk');
        
        if (WebApp.initDataUnsafe) {
          WebApp.ready();
          WebApp.expand();
          
          // Set theme colors based on Telegram theme
          if (WebApp.themeParams) {
            const root = document.documentElement;
            
            // Apply Telegram theme colors to CSS variables
            if (WebApp.colorScheme === 'dark') {
              root.classList.add('dark');
            } else {
              root.classList.remove('dark');
            }
            
            // Set header color
            if (WebApp.setHeaderColor && WebApp.themeParams.bg_color) {
              WebApp.setHeaderColor(WebApp.themeParams.bg_color);
            }
            
            // Set background color
            if (WebApp.setBackgroundColor && WebApp.themeParams.bg_color) {
              WebApp.setBackgroundColor(WebApp.themeParams.bg_color);
            }
          }
          
          // Enable closing confirmation
          WebApp.enableClosingConfirmation();
          
          setIsReady(true);
        }
      }
    };
    
    initTelegram();
  }, []);

  // Add haptic feedback to buttons
  useEffect(() => {
    if (!isReady) return;

    const handleClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        if (typeof window !== 'undefined') {
          const { default: WebApp } = await import('@twa-dev/sdk');
          if (WebApp.HapticFeedback) {
            WebApp.HapticFeedback.impactOccurred('light');
          }
        }
      }
    };

    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isReady]);

  return <>{children}</>;
}

// Hook to use Telegram WebApp features
export function useTelegramWebApp() {
  const [user, setUser] = useState<any>(null);
  const [isInTelegram, setIsInTelegram] = useState(false);
  const [webApp, setWebApp] = useState<any>(null);

  useEffect(() => {
    const initWebApp = async () => {
      if (typeof window !== 'undefined') {
        const { default: WebApp } = await import('@twa-dev/sdk');
        setWebApp(WebApp);
        if (WebApp.initDataUnsafe) {
          setIsInTelegram(true);
          setUser(WebApp.initDataUnsafe.user);
        }
      }
    };
    
    initWebApp();
  }, []);

  const showMainButton = (text: string, onClick: () => void) => {
    if (webApp?.MainButton) {
      webApp.MainButton.text = text;
      webApp.MainButton.show();
      webApp.MainButton.onClick(onClick);
    }
  };

  const hideMainButton = () => {
    if (webApp?.MainButton) {
      webApp.MainButton.hide();
    }
  };

  const showBackButton = (onClick: () => void) => {
    if (webApp?.BackButton) {
      webApp.BackButton.show();
      webApp.BackButton.onClick(onClick);
    }
  };

  const hideBackButton = () => {
    if (webApp?.BackButton) {
      webApp.BackButton.hide();
    }
  };

  const openTelegramLink = (url: string) => {
    if (webApp?.openTelegramLink) {
      webApp.openTelegramLink(url);
    } else {
      window.open(url, '_blank');
    }
  };

  const shareToStory = (mediaUrl: string, text?: string) => {
    if (webApp?.shareToStory) {
      webApp.shareToStory(mediaUrl, { text });
    }
  };

  const showPopup = (params: any) => {
    if (webApp?.showPopup) {
      return webApp.showPopup(params);
    }
  };

  const showAlert = (message: string) => {
    if (webApp?.showAlert) {
      return webApp.showAlert(message);
    } else {
      alert(message);
    }
  };

  const showConfirm = (message: string) => {
    if (webApp?.showConfirm) {
      return webApp.showConfirm(message);
    } else {
      return confirm(message);
    }
  };

  const hapticFeedback = {
    impact: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'light') => {
      if (webApp?.HapticFeedback) {
        webApp.HapticFeedback.impactOccurred(style);
      }
    },
    notification: (type: 'error' | 'success' | 'warning' = 'success') => {
      if (webApp?.HapticFeedback) {
        webApp.HapticFeedback.notificationOccurred(type);
      }
    },
    selection: () => {
      if (webApp?.HapticFeedback) {
        webApp.HapticFeedback.selectionChanged();
      }
    },
  };

  return {
    user,
    isInTelegram,
    showMainButton,
    hideMainButton,
    showBackButton,
    hideBackButton,
    openTelegramLink,
    shareToStory,
    showPopup,
    showAlert,
    showConfirm,
    hapticFeedback,
    webApp,
  };
}