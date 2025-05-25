const CACHE_NAME = "statuswindow-v2"
const STATIC_CACHE = "statuswindow-static-v2"
const DYNAMIC_CACHE = "statuswindow-dynamic-v2"

// Essential files that must be cached for offline functionality
const ESSENTIAL_FILES = [
  "/",
  "/dashboard",
  "/activities",
  "/quests",
  "/skills",
  "/progress",
  "/profile",
  "/onboarding",
  "/login",
  "/manifest.json",
]

// Static assets to cache
const STATIC_ASSETS = [
  "/logo.png",
  "/character-creation.png",
  "/dashboard.png",
  "/mobile-view.png",
  "/quests.png",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/textures/parchment.jpg",
]

// Install event - cache essential resources
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...")
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        console.log("Caching static assets...")
        return cache.addAll(STATIC_ASSETS.concat(ESSENTIAL_FILES))
      }),
      caches.open(DYNAMIC_CACHE).then((cache) => {
        console.log("Dynamic cache ready...")
        return cache
      }),
    ])
      .then(() => {
        console.log("Service Worker installed successfully")
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error("Service Worker install failed:", error)
      }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...")
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log("Deleting old cache:", cacheName)
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => {
        console.log("Service Worker activated")
        return self.clients.claim()
      }),
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== "GET") {
    return
  }

  // Skip external requests
  if (url.origin !== location.origin) {
    return
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log("Serving from cache:", request.url)
        return cachedResponse
      }

      // Not in cache, fetch from network
      return fetch(request)
        .then((networkResponse) => {
          // Check if we received a valid response
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
            return networkResponse
          }

          // Clone the response
          const responseToCache = networkResponse.clone()

          // Determine which cache to use
          const cacheToUse = STATIC_ASSETS.some((asset) => request.url.includes(asset)) ? STATIC_CACHE : DYNAMIC_CACHE

          // Cache the response
          caches.open(cacheToUse).then((cache) => {
            console.log("Caching new resource:", request.url)
            cache.put(request, responseToCache)
          })

          return networkResponse
        })
        .catch(() => {
          console.log("Network failed, trying cache fallback for:", request.url)

          // If it's a navigation request, return the cached index page
          if (request.mode === "navigate") {
            return caches.match("/").then((cachedIndex) => {
              return (
                cachedIndex ||
                new Response("Offline - Please check your connection", {
                  status: 503,
                  statusText: "Service Unavailable",
                })
              )
            })
          }

          // For other requests, return a generic offline response
          return new Response("Offline", {
            status: 503,
            statusText: "Service Unavailable",
          })
        })
    }),
  )
})

// Background sync for offline data
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(syncOfflineData())
  }
})

// Message handling for manual cache updates
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})

async function syncOfflineData() {
  try {
    const offlineData = localStorage.getItem("statuswindow-offline-data")
    if (offlineData) {
      console.log("Syncing offline data...")
      // Sync implementation would go here
    }
  } catch (error) {
    console.log("Sync failed:", error)
  }
}

// Preload critical resources
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "CACHE_URLS") {
    const urlsToCache = event.data.payload
    event.waitUntil(
      caches.open(DYNAMIC_CACHE).then((cache) => {
        return cache.addAll(urlsToCache)
      }),
    )
  }
})
