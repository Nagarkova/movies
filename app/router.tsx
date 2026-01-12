import { createRouter, createRoute } from '@tanstack/react-router'
import { Root } from './root'
import { Main } from './routes/main'
import { Signup } from './routes/signup'
import { Login } from './routes/login'
import { Settings } from './routes/settings'
import { MovieDetailsPage } from './routes/movie-details'
import { Home } from './routes/home'

const rootRoute = Root

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Main,
  validateSearch: (search: Record<string, unknown>): { q?: string } => {
    return {
      q: typeof search.q === 'string' ? search.q : undefined,
    }
  },
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/home',
  component: Home,
})

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: Signup,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
})

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: Settings,
})

const movieDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/movie/$id',
  component: MovieDetailsPage,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  homeRoute,
  signupRoute,
  loginRoute,
  settingsRoute,
  movieDetailsRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
