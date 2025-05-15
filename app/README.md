# CHIP 400 Intake-to-Ideation Web App & Conversational Coach

This application provides an intake form for collecting information about a business idea, followed by an AI-powered ideation assistant that helps users refine their value proposition.

## Features

- Single-page web application with a clean, modern design
- Responsive layout that adapts to mobile and desktop screens
- Accessible form with proper keyboard navigation and ARIA attributes
- Multi-step ideation process with guided conversation
- Summary report generation with download and copy options

## Technology Stack

- Next.js 14 (React framework)
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd chip400-intake
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `app/`: Next.js app directory containing pages and layouts
- `components/`: Reusable React components
- `lib/`: Utility functions and type definitions
- `public/`: Static assets

## Building for Production

To build the application for production:

```
npm run build
# or
yarn build
```

To start the production server:

```
npm run start
# or
yarn start
```

## Deployment

This application can be deployed to any platform that supports Next.js applications, such as Vercel, Netlify, or Abacus AI.

## Accessibility

The application is designed to meet WCAG 2.1 AA standards:
- All interactive elements are keyboard accessible
- Proper focus management is implemented
- ARIA attributes are used for screen reader support
- Color contrast meets accessibility guidelines

## License

This project is licensed under the MIT License - see the LICENSE file for details.