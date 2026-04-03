const CACHE_NAME = 'ffes-sovereignty-v3';

// 1. Arquivos que o App baixa assim que é instalado (A Base)
const PRECACHE_ASSETS = [
  // Núcleo do Site
  '/',
  '/index.html',
  '/exercicios-e-artigos.html',
  '/cursos-e-ebook.html',
  '/CSS/universal.css',
  '/CSS/style.css',
  '/JS/script.js',

  // Núcleo do App
  '/index-app.html',
  '/CSS/style-app.css',
  '/manifest.json',

  // Imagens e Identidade
  '/Images/logo novo grande.webp',
  '/Images/Teacher-Leo-Ramos.webp',
  '/Images/logofavicion.png',

  // Índices das Pastas (Os Portais)
  '/Pasta001/indexpasta001.html',
  '/Pasta002/indexpasta002.html',
  '/Pasta003/indexpasta003.html',
  '/Pasta004/indexpasta004.html',
  '/Pasta005/indexpasta005.html',
  '/Pasta006/indexpasta006.html',
  '/Pasta007/indexpasta007.html',
  '/Pasta008/indexpasta008.html',
  '/Pasta009/indexpasta009.html',
  '/Pasta010/indexpasta010.html',
  '/Pasta011/indexpasta011.html',
  '/Pasta012/indexpasta012.html',
  '/Pasta013/indexpasta013.html',
  '/Pasta014/indexpasta014.html',
  '/Pasta015/indexpasta015.html',
  '/Pasta016/indexpasta016.html'
];

// Instalação - Carrega a base
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('FFES: Instalando Base de Dados...');
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
});

// Ativação - Deleta versões velhas do sistema
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('FFES: Deletando Cache Antigo:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Interceptação de Rede (O Segredo do Offline Total)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Se já estiver no cache, entrega agora (Performance)
      if (cachedResponse) {
        return cachedResponse;
      }

      // Se não estiver, busca na internet e SALVA NO CACHE dinamicamente
      // Isso vai salvar automaticamente todos os .html de exercícios que o aluno abrir
      return fetch(event.request).then((networkResponse) => {
        // Verifica se a resposta é válida antes de salvar
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          // Salva dinamicamente a página visitada (exercícios, fotos, etc)
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      });
    }).catch(() => {
      // Se falhar (sem internet e sem cache), você pode redirecionar para uma página de erro offline personalizada
      console.log('FFES: Usuário está Offline e o recurso não foi cacheado.');
    })
  );
});


