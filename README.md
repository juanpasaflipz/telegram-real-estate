# Telegram Real Estate Mini-App

A modern real estate property listing application built as a Telegram Mini-App using Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 📱 **Telegram Integration**: Built specifically for Telegram Mini-Apps with native features
- 🏠 **Property Listings**: Browse properties in grid or list view
- 🔍 **Search & Filters**: Advanced filtering by price, type, bedrooms, and more
- ❤️ **Favorites**: Save and manage favorite properties
- 🖼️ **Image Carousel**: Beautiful property image galleries
- 📱 **Responsive Design**: Mobile-first approach for optimal Telegram experience
- 🎨 **Animations**: Smooth transitions with Framer Motion
- 💾 **Persistent Storage**: Favorites and preferences saved locally

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Data Fetching**: React Query (TanStack Query)
- **Icons**: Lucide React
- **Telegram SDK**: @twa-dev/sdk

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Telegram Bot (created via BotFather)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/juanpasaflipz/telegram-real-estate.git
cd telegram-real-estate
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your API URL:
```
NEXT_PUBLIC_API_URL=https://your-api-url.com
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in browser.

### Telegram Setup

1. Create a bot using [@BotFather](https://t.me/botfather)
2. Set up your Mini App URL:
   ```
   /newapp
   /setmenubutton
   ```
3. Deploy your app to a public URL (HTTPS required)
4. Set the Mini App URL in BotFather

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Home page with property grid
│   ├── properties/[id]/   # Property detail page
│   ├── favorites/         # Favorites page
│   └── profile/           # User profile page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── PropertyCard.tsx  # Property card component
│   ├── PropertyGrid.tsx  # Property grid/list view
│   └── ...
├── services/             # API services
│   └── api.ts           # Property API client
├── store/               # Zustand stores
│   └── usePropertyStore.ts
└── types/               # TypeScript types
    └── property.ts
```

## API Integration

The app expects a REST API with the following endpoints:

- `GET /api/properties` - List properties with filters
- `GET /api/properties/:id` - Get property details
- `GET /api/properties/featured` - Get featured properties
- `GET /api/properties/locations` - Get available locations

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).