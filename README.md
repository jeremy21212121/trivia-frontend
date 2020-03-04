# just-trivia-nuxt

> trivia game frontend for [express-trivia-server](https://github.com/jeremy21212121/express-trivia-server)

> try it live at [JustTrivia.fun](https://justtrivia.fun)

Just Trivia is a free, open-source, mobile-focused trivia game. It is a progressive web app (PWA), with offline play coming in the near future.

The idea is to be a simple game without user-hostile features. Ultimately, I built it for myself.

## Status

This game is now live at [JustTrivia.fun!](https://justtrivia.fun). I haven't done detailed benchmarks yet, but the app bundle and first game will transfer less than 700kb. Subsequent games result in about 7.7kb of data transfer. Very lean, IMHO.

In the near future, I will include the db and server logic in a service worker to allow offline play when 'added to home screen' or 'installed'.

## Why?

I wanted a simple, ad-free trivia web app to play on my phone. I couldn't find one that I liked, so I [made one](https://github.com/jeremy21212121/trivia) a couple years ago. It has some limitations, but mostly I really wanted multiple arbitrary categories per game. Instead of making the client increasingly complex, I split this game into a REST-ish backend and a simpler client.

## Technical overview

This is a PWA made with Nuxt.js/Vue.js. It is server-side rendered (SSR), with the exception of dynamic content on the Play view (/play).

Vuex is used to store game state. I integrated local storage support to the store mutations, allowing persistance across refresh/browsing sessions. This allows resuming games as long as they are still active in the [back end]((https://github.com/jeremy21212121/express-trivia-server)) (currently 24 hours).

Dependencies are as minimal as possible to keep it lean. No CSS libraries are used, it is all custom written SCSS. For the most part, styles are located in and scoped to the component they are used in, with some select global styles in `default.vue`.

The SVG icons are imported as vue components. They have all been agressively minified with [SVGO](https://github.com/svg/svgo) to reduce file size.

## visual design

I'm not much of a visual designer, so I used some styles and colors from [create-nuxt-app](https://github.com/nuxt/create-nuxt-app). I also loosly imitated some elements from [this screenshot](https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/2093643/580/387/m1/fpnw/wm0/cover_quiz-app-hd-.jpg?1483633934&s=4307898fa8f1577f937496d0abf9a5a5) of a mobile quiz app framework.

## production

This runs on tiny Ubuntu VM on digital ocean. NGINX is used as reverse-proxy and TLS termination. It is run as a `systemd` service which handles logging, starting/stopping the process. Check the systemd folder for the service file.

I wrote a [minimal CI/CD server](https://github.com/jeremy21212121/webhooks_nuxt/tree/just-trivia) to handle re-deploying new versions. It receives webhooks from github and, on push, re-deploys the new version. It handles failures by rolling back to the last known good version and emails me if anything goes wrong.



## Thanks

> Shoulders of giants and whatnot

> - Bernard of Chartres

This project is only possible due to millions of man hours dedicated to open source software. It is found all throughout the stack: the linux kernel, GNU core-utils, git, nginx, Debian, V8, node, Vue.js, just off the top of my head.

The questions come from the [open trivia database](https://opentdb.com/). It is the only open source trivia collection of decent quality that I could find. If I find any more, I will surely incorporate them.

Many thanks to [UnDraw](https://undraw.co/) for the awesome open-source SVG illustrations. I managed to find an illustration for every category, as well as a logo.

[BrowserStack](https://www.browserstack.com/) graciously offers open-source projects [100 minutes of free cross-browser testing](https://www.browserstack.com/open-source) on their wide array of devices. This has been a huge help. Microsoft also offers [free BrowserStack testing on their latest desktop browsers](https://www.browserstack.com/test-on-microsoft-edge-browser), both the MSHTML and new chromium-based versions of Edge.

Thanks to github user [shun1x](https://github.com/shun1x) for being the first person to star this repo!

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
# this is handled automatically in prod by this [minimal CI/CD server](https://github.com/jeremy21212121/webhooks_nuxt/tree/just-trivia)
$ npm run build
$ npm run start

# generate static project - this may work as intended, I haven't tried it yet
$ npm run generate
```

