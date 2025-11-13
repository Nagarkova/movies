# Movie Searcher App

A modern movie search application built with React Router, featuring user authentication and a beautiful, responsive UI.

## Overview

This is a full-stack movie searcher application that allows users to sign up, log in, and search for movies. Built with React Router and TypeScript, it provides a seamless user experience with server-side rendering and modern web technologies.

## Features

- 🎬 **Movie Search**: Search and discover movies
- 🔐 **User Authentication**: Complete signup and login flow with form validation
- 💾 **Local Storage**: Persistent user data across sessions
- 🎨 **Modern UI**: Beautiful gradient designs with TailwindCSS
- ⚡️ **Fast Performance**: Hot Module Replacement (HMR) for rapid development
- 🔒 **TypeScript**: Type-safe code throughout the application
- 📱 **Responsive Design**: Works seamlessly on all devices

## Tech Stack

- **React Router** - Modern routing and data loading
- **TypeScript** - Type safety and better developer experience
- **TailwindCSS** - Utility-first CSS framework
- **Local Storage API** - Client-side data persistence
- **Vite** - Fast build tool and development server

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

## Application Structure

### Routes

- `/` - Main page (protected, shows welcome message with user's name)
- `/signup` - User registration page with form validation
- `/login` - User login page
- `/home` - Additional home route

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

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t movie-searcher .

# Run the container
docker run -p 3000:3000 movie-searcher
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Project Structure

```
react-movie-hooks/
├── app/
│   ├── routes/
│   │   ├── signup.tsx    # User registration
│   │   ├── login.tsx     # User login
│   │   ├── main.tsx      # Main dashboard
│   │   └── home.tsx      # Home page
│   ├── routes.ts         # Route configuration
│   └── root.tsx          # Root layout
├── .cursor/
│   ├── hooks.json        # Custom hooks configuration
│   └── debug.sh          # Debug script
└── public/               # Static assets
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

---

Built with ❤️ using React Router.
