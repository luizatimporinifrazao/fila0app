const CACHE_NAME = "filazero-static-v1";
const STATIC_ASSETS = [
  "/manifest.webmanifest",
  "/icons/icon.svg",
  "/css/style.css",
  "/js/app.js"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);

  // Nunca armazenar respostas de API, login, logout ou conteúdo pessoal.
  if (request.method !== "GET" || url.origin !== self.location.origin ||
      url.pathname.startsWith("/api/") || ["/login", "/logout"].includes(url.pathname)) return;

  // Páginas precisam validar sessão no servidor; não servir páginas autenticadas do cache.
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(() =>
      new Response(
        "<!doctype html><html lang='pt-br'><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>FilaZero offline</title><body style='font:16px Arial;padding:32px;background:#f2f7f4;color:#17231d'><h1>Você está sem conexão</h1><p>Conecte-se à internet para acessar seus pedidos e o cardápio.</p></body></html>",
        { headers: { "Content-Type": "text/html; charset=utf-8" } }
      )
    ));
    return;
  }

  if (STATIC_ASSETS.includes(url.pathname) || /\.(?:png|jpe?g|webp|svg|css|js)$/i.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      }))
    );
  }
});
