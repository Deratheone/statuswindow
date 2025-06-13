import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://statuswindow.vercel.app'
  
  // List all static routes
  const routes = [
    '',
    '/dashboard',
    '/login',
    '/onboarding',
    '/profile',
    '/progress',
    '/quests',
    '/skills',
    '/activities'
  ]
  
  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }))
}
