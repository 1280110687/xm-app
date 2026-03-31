import fs from 'fs'
import path from 'path'

const dist = path.resolve('dist')
const files = []

function walk(dir) {
    for (const file of fs.readdirSync(dir)) {
        const full = path.join(dir, file)
        if (fs.statSync(full).isDirectory()) {
            walk(full)
        } else {
            files.push(full.replace(dist, '').replace(/\\/g, '/'))
        }
    }
}
walk(dist)

const content = `
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('v1').then(cache => cache.addAll(${JSON.stringify(files)}))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
`

fs.writeFileSync(path.join(dist, 'service-worker.js'), content)
console.log('✅ Service Worker generated successfully!')
