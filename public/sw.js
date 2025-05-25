const CACHE_NAME = "statuswindow-v1"
const urlsToCache = [
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
  // Add static assets
  "/logo.png",
  "/character-creation.png",
  "/dashboard.png",
  "/mobile-view.png",
  "/quests.png",
]

// Install event - cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache")
        return cache.addAll(urlsToCache)
      })
      .catch((error) => {
        console.log("Cache install failed:", error)
      }),
  )
})

// Fetch event - serve from cache when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      if (response) {
        return response
      }

      // Clone the request because it's a stream
      const fetchRequest = event.request.clone()

      return fetch(fetchRequest)
        .then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response
          }

          // Clone the response because it's a stream
          const responseToCache = response.clone()

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
        .catch(() => {
          // Return offline page or cached content
          return caches.match("/")
        })
    }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})

// Background sync for offline data
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(
      // Sync offline data when connection is restored
      syncOfflineData(),
    )
  }
})

async function syncOfflineData() {
  try {
    // Get offline data from IndexedDB or localStorage
    const offlineData = localStorage.getItem("statuswindow-offline-data")
    if (offlineData) {
      // Sync with server when online
      console.log("Syncing offline data...")
      // Implementation would depend on your backend API
    }
  } catch (error) {
    console.log("Sync failed:", error)
  }
}
