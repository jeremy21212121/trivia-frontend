export default {
  mode: 'universal',
  server: {
    host: '0.0.0.0'
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'Just Trivia',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'A free mobile trivia game with no ads or tracking'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  pwa: {
    manifest: {
      name: 'Just Trivia',
      short_name: 'Just Trivia',
      lang: 'en-US',
      description: 'A mobile trivia game with no ads or tracking',
      start_page: '/?utm_source=homescreen',
      background_color: '#1d1d1d',
      theme_color: '#3b8070'
    },
    meta: {
      name: 'Just Trivia',
      description:
        'A mobile trivia game with no ads or tracking and very little data usage',
      author: 'Jeremy Poole',
      nativeUI: true,
      ogHost: 'https://justtrivia.fun',
      ogSiteName: 'Just Trivia',
      ogDescription:
        'A mobile trivia game with no ads or tracking and very little data usage'
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#1d1d1d' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    'nuxt-svg-loader'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
