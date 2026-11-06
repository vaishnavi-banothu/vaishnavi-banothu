// NeedBridge - Server Integration Test
const http = require('http');
const server = require('./server.js');

const testPaths = [
  '/',
  '/index.html',
  '/explore.html',
  '/post-need.html',
  '/offer-help.html',
  '/listing-details.html',
  '/dashboard.html',
  '/messages.html',
  '/admin.html',
  '/about.html',
  '/privacy.html',
  '/auth.html',
  '/assets/logo.svg',
  '/css/styles.css',
  '/js/db.js',
  '/js/matching.js'
];

setTimeout(async () => {
  let passed = 0;
  for (const p of testPaths) {
    try {
      await new Promise((resolve, reject) => {
        http.get(`http://localhost:3000${p}`, (res) => {
          if (res.statusCode === 200) {
            console.log(`✅ 200 OK: ${p}`);
            passed++;
            resolve();
          } else {
            console.error(`❌ HTTP ${res.statusCode} for ${p}`);
            reject(new Error(`Status ${res.statusCode}`));
          }
        }).on('error', reject);
      });
    } catch (e) {
      console.error(`Failed request for ${p}:`, e.message);
    }
  }

  console.log(`\nServer Verification: ${passed}/${testPaths.length} routes served with HTTP 200 OK!`);
  process.exit(passed === testPaths.length ? 0 : 1);
}, 1000);
