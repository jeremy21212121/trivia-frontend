# just-trivia-nuxt

> trivia game frontend for [express-trivia-server] backend

## Status

MVP. It is largely playable. Needs an end of game view and for game state transitions to be made more explicit and reliable.

## Why?

I wanted a simple, ad-free trivia web app to play on my phone. I couldn't find one that I liked, so I [made one](https://github.com/jeremy21212121/trivia) a couple years ago. It has some limitations, mostly a really wanted multiple arbitrary categories per game. Instead of making the client increasingly complex, I split this game into a REST-ish backend and a simpler client. Once this frontend is done, I want to make one with native script.

I'm not much of a visual designer, so I used some styles and colors from [create-nuxt-app](https://github.com/nuxt/create-nuxt-app). I also imitated some elements from [this screenshot](https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/2093643/580/387/m1/fpnw/wm0/cover_quiz-app-hd-.jpg?1483633934&s=4307898fa8f1577f937496d0abf9a5a5) of a mobile quiz app framework.

I used the excellent open-source illustrations from https://undraw.co/. I managed to find one for every single category, which is pretty impressive. Much thanks to undraw.

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project - this won't work right now. Wrapping dynamic stuff with `<client-only>` should allow this to work properly.
# Then we can benefit from a pre-rendered landing page and client-side from there, while serving static files (no frontend node server required)
$ npm run generate
```

