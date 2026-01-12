# Movie Searcher App

A modern movie search application built with TanStack Router and React, featuring user authentication and a beautiful, responsive UI.

## Overview

This is a full-stack movie searcher application that allows users to sign up, log in, and search for movies. Built with TanStack Router, React, and TypeScript, it provides a seamless user experience with type-safe routing and modern web technologies.

## Features

- 🎬 **Movie Search**: Search and discover movies using TMDB API
- 🔐 **User Authentication**: Complete signup and login flow with form validation
- 💾 **Local Storage**: Persistent user data across sessions
- 🎨 **Modern UI**: Beautiful gradient designs with TailwindCSS
- ⚡️ **Fast Performance**: Hot Module Replacement (HMR) for rapid development
- 🔒 **TypeScript**: Type-safe code throughout the application
- 🛣️ **Type-Safe Routing**: TanStack Router with full TypeScript support
- 📱 **Responsive Design**: Works seamlessly on all devices
- 🎯 **Movie Details**: View detailed information about movies
- ⚙️ **User Settings**: Manage user profile and account settings

## Tech Stack

- **TanStack Router** - Type-safe routing with excellent developer experience
- **React 19** - Modern React with latest features
- **TypeScript** - Type safety and better developer experience
- **TailwindCSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **Local Storage API** - Client-side data persistence

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

### Preview Production Build

To preview the production build locally:

```bash
npm run build
npm run preview
```

## Application Structure

### Routes

- `/` - Main page (protected, movie search and discovery)
- `/signup` - User registration page with form validation
- `/login` - User login page
- `/home` - Welcome/home page
- `/settings` - User settings and profile page
- `/movie/:id` - Movie details page with full information

### Features in Detail

#### Authentication Flow

1. **First-time users**: Automatically redirected to signup page
2. **Signup**: Create account with validated form fields (first name, last name, email, password)
3. **Login**: Authenticate with stored credentials
4. **Main Page**: Personalized welcome screen after successful login

#### Form Validation

- Email format validation
- Password matching confirmation
- Name validation (letters only, minimum length)
- Real-time error messages on field blur
- Visual feedback with colored borders

## Building for Production

Create a production build:

```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

## Deployment

This is a client-side React application that can be deployed to any static hosting service:

**Static Hosting Options:**
- **Vercel** - Zero-config deployment
- **Netlify** - Easy deployment with continuous integration
- **GitHub Pages** - Free hosting for public repositories
- **Cloudflare Pages** - Fast global CDN
- **AWS S3 + CloudFront** - Scalable static hosting
- **Firebase Hosting** - Google's hosting solution

**Deployment Steps:**

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` directory to your chosen hosting service

### Docker Deployment

To build and run using Docker:

```bash
docker build -t movie-searcher .

# Run the container
docker run -p 3000:3000 movie-searcher
```

The containerized application can be deployed to any platform that supports Docker.

## Project Structure

```
react-movie-hooks/
├── app/
│   ├── components/       # Reusable React components
│   │   ├── MovieCard.tsx
│   │   ├── MovieDetails.tsx
│   │   └── SearchBar.tsx
│   ├── routes/          # Route components
│   │   ├── signup.tsx   # User registration
│   │   ├── login.tsx    # User login
│   │   ├── main.tsx     # Main dashboard (movie search)
│   │   ├── home.tsx     # Home/welcome page
│   │   ├── settings.tsx # User settings
│   │   └── movie-details.tsx # Movie details page
│   ├── services/        # API services
│   │   └── movieService.ts
│   ├── router.tsx       # TanStack Router configuration
│   ├── root.tsx         # Root layout component
│   ├── main.tsx         # Application entry point
│   └── app.css          # Global styles with TailwindCSS
├── public/              # Static assets
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
└── tsconfig.json       # TypeScript configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

---

Built with ❤️ using TanStack Router, React, and TailwindCSS.
