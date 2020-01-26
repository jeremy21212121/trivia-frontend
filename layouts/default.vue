<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
  mounted() {
    if (!this.$isServer) {
      const lsSupport = this.detectLocalStorage();
      this.setSupportsLocalStorage(lsSupport)
      if (lsSupport) {
        console.log('syncing')
        this.syncStoreWithLocalStorage()
      }
    }
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
    }
  },
  computed: {
    ...mapState(['supportsLocalStorage'])
  }
}
</script>
<style lang="scss">
@import '@/scss/spaceEvenlyHack.scss';

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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  // justify-content: space-evenly;
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
  // color: #3F3D56;
  color: #3b8070;
  margin: 10px 0;
  text-shadow: 0 0px 2px rgba(255,255,255,0.16),
              0 0px 2px rgba(255,255,255,0.23);
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
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
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
@keyframes rotate {
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
}
</style>
