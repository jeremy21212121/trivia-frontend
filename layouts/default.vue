<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['supportsLocalStorage'])
  },
  created() {
    // set localStorage support and populate state from localStorage
    // we want this to run once per app load, client-side only, as early as possible
    // it enables resuming games on browser reload etc

    // the backend could have a GET /currentQuestion endpoint to aid in resuming a game
    // but then we'd need a GET /lastResults endpoint too in order to fully re-create state and ditch localStorage.
    // or perhaps we could send the whole state along with each guess, let the backend keep track of it
    // that would only require one endpoint: GET /gameState.

    // Currently, all state is managed client-side and backend only has POST endpoints.
    // i will overhaul the backend if there is a compelling reason. PROs: reduce client init code complexity
    // CONS: It's a PWA not a thin client. loading from local storage is faster than a network request.
    // "is it a thick client? thin client? no it's a medium client!" :P
    this.initApp()
  },
  methods: {
    ...mapActions(['setSupportsLocalStorage', 'syncStoreWithLocalStorage']),
    detectLocalStorage() {
      const testVal = 'test583745'
      try {
        localStorage.setItem(testVal, testVal)
        const checkVal = localStorage.getItem(testVal)
        localStorage.removeItem(testVal)
        return testVal === checkVal
      } catch (e) {
        return false
      }
    },
    initApp() {
      if (!this.$isServer) {
        const lsSupport = this.detectLocalStorage()
        this.setSupportsLocalStorage(lsSupport)
        if (lsSupport) {
          this.syncStoreWithLocalStorage()
        }
      }
    }
  }
}
</script>
<style lang="scss">
@import '@/scss/spaceEvenlyHack.scss';
@import '@/scss/colors.scss';

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: #1d1d1d;
}

.container {
  margin: 0 auto;
  min-height: 98vh;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  @include space-evenly-hack; // simulates `justify-content: space-evenly` because ios safari sucks
  align-items: center;
  text-align: center;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

h1 {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 48px;
  color: #35495e;
  letter-spacing: 1px;
}

h1.title {
  font-size: 32px;
  color: $primary;
  margin: 10px 0;
  text-shadow: 0 0px 2px rgba(255, 255, 255, 0.16),
    0 0px 2px rgba(255, 255, 255, 0.23);
}

h2 {
  font-weight: 300;
  font-size: 32px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid $primary;
  color: $primary;
  text-decoration: none;
  padding: 10px 30px;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color, color 100ms ease;
  // hover state isn't reliably triggered on mobile
  -webkit-tap-highlight-color: $primary;
  // transition: background-color 150ms ease;
}
.button--green.hover {
  color: #fff;
  background-color: $primary;
}
.button--green.loading {
  border: none;
}
.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}
.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes disappear {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes partial-appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.5;
  }
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
