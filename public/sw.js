if(!self.define){let e,a={};const s=(s,i)=>(s=new URL(s+".js",i).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,c)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(a[t])return;let n={};const f=e=>s(e,t),d={module:{uri:t},exports:n,require:f};a[t]=Promise.all(i.map((e=>d[e]||f(e)))).then((e=>(c(...e),n)))}}define(["./workbox-83b758e3"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/1bfc9850-34737eacfd366323.js",revision:"34737eacfd366323"},{url:"/_next/static/chunks/41.abd04a71634fee94.js",revision:"abd04a71634fee94"},{url:"/_next/static/chunks/455-8fbd615bd59d2e87.js",revision:"8fbd615bd59d2e87"},{url:"/_next/static/chunks/d7eeaac4-82de33b41f9ce5da.js",revision:"82de33b41f9ce5da"},{url:"/_next/static/chunks/fb7d5399-dc9d0743c44e1acc.js",revision:"dc9d0743c44e1acc"},{url:"/_next/static/chunks/framework-0c7baedefba6b077.js",revision:"0c7baedefba6b077"},{url:"/_next/static/chunks/main-fe6c68750bbdb283.js",revision:"fe6c68750bbdb283"},{url:"/_next/static/chunks/pages/_app-e6bf5f7dc2deefdf.js",revision:"e6bf5f7dc2deefdf"},{url:"/_next/static/chunks/pages/_error-08a9db0f433628d8.js",revision:"08a9db0f433628d8"},{url:"/_next/static/chunks/pages/index-13258c84ae5a5fd2.js",revision:"13258c84ae5a5fd2"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-745a15ff943b2866.js",revision:"745a15ff943b2866"},{url:"/_next/static/css/494c932131206ea3.css",revision:"494c932131206ea3"},{url:"/_next/static/css/ea468937fdfe3fcf.css",revision:"ea468937fdfe3fcf"},{url:"/_next/static/jFcrIHU7hhyUEwC1ibNI_/_buildManifest.js",revision:"c79e7d82c7cc4d319b948ed5ebafbfe7"},{url:"/_next/static/jFcrIHU7hhyUEwC1ibNI_/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/1df443147fda9dd6-s.woff2",revision:"6c087bbe2c3ab33195e76409d3b98eed"},{url:"/_next/static/media/1ff84563a719c397-s.woff2",revision:"e712ed5089ed58f92ea8fdc63424ecf5"},{url:"/_next/static/media/23d817876504828e-s.p.woff2",revision:"352d504d49d925d0daa29ebee2bd7a3f"},{url:"/_next/static/media/26813eeabdf142eb-s.woff2",revision:"c08faa9b30a24a9f8ef93ff6fe824c49"},{url:"/_next/static/media/2e89d1420926fd62-s.woff2",revision:"7a1df7c515bfc06c33d8124eec76fbd6"},{url:"/_next/static/media/3af23731a34f346b-s.woff2",revision:"dfe7811f0a2ff4c2c7bf04e3c75c3266"},{url:"/_next/static/media/4c7655c11f7bd97b-s.p.woff2",revision:"38800f6020b9402854bbc3527199612c"},{url:"/_next/static/media/4ee653ca59c4e714-s.woff2",revision:"f6b108465ebdd47c3556ae32368e1bf9"},{url:"/_next/static/media/583e141224f61ace-s.woff2",revision:"54694d4da4b389b189e12d614dbfba2a"},{url:"/_next/static/media/5ac4b55274d78358-s.woff2",revision:"c970bda6f4995a50df907617db9984bc"},{url:"/_next/static/media/6138c9abaf585dc3-s.woff2",revision:"c925e2aae21dd555bbcabb47e327a057"},{url:"/_next/static/media/6b86e1d722146340-s.p.woff2",revision:"9666e3ea006ea9776049b8482b815061"},{url:"/_next/static/media/6d2d08ab767fe252-s.p.woff2",revision:"8a733f755bb85eb77674af96a781628e"},{url:"/_next/static/media/725610af6d7e9dc0-s.woff2",revision:"7ca931749b79ad36287a2a59fdc417f3"},{url:"/_next/static/media/75cde960c2842862-s.woff2",revision:"8ba5d067487510340d843c0a3c0d9949"},{url:"/_next/static/media/7f51ce006c61ba63-s.woff2",revision:"10090a595d031f9065236b3761d44101"},{url:"/_next/static/media/80cf8aae469a382c-s.p.woff2",revision:"1f12034662d48475d04afcdfc5bad1a8"},{url:"/_next/static/media/8a6e9cb6b2bae1e5-s.woff2",revision:"6c26b09327294ad876ef41086b1e1efc"},{url:"/_next/static/media/91da210830fde368-s.woff2",revision:"29f05cbbea79da6a9b033c25db11c5c5"},{url:"/_next/static/media/ab748541eb4e47c6-s.woff2",revision:"454a4bdc8379118a650bd22958552e6c"},{url:"/_next/static/media/b5eaf1e1f83a2954-s.woff2",revision:"fb0abc6f6e69196f32ab4032b0574e3a"},{url:"/_next/static/media/e0f2cc7e044d2ead-s.woff2",revision:"5d7ec2c3e2d762577b28ffa591c1d653"},{url:"/_next/static/media/e15b1cfda85f6579-s.p.woff2",revision:"d99430e0eab7aa47e74baf400399614f"},{url:"/_next/static/media/e966ba19c8856819-s.woff2",revision:"dab8b0acf391c065cdb0daa848f39382"},{url:"/_next/static/media/eaca0311b07f8476-s.woff2",revision:"5d09e1a494059a35cf942a883fa9d185"},{url:"/_next/static/media/logo.8e0bc83b.svg",revision:"f87c29053ed796f5f1f45cd498a3b76d"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:a}})=>!(!e||a.startsWith("/api/auth/")||!a.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:a},sameOrigin:s})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&s&&!a.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:a},sameOrigin:s})=>"1"===e.headers.get("RSC")&&s&&!a.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:a})=>a&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
