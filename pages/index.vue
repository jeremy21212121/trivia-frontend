<template>
  <main class="container">
    <section class="title">
      <logo />
      <h1 class="title">just trivia</h1>
      <h2 class="subtitle">no nonsense</h2>
    </section>
    <a
      href="'/categories'"
      @click.prevent="() => { setActiveIndex(0, () => { $router.push('/categories') }) }"
      class="button--green"
      :class="{ hover: activeIndex === 0 }"
    >Let's play!</a>
  </main>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data() {
    return {
      activeIndex: null
    }
  },
  methods: {
    setActiveIndex(index, cb) {
      if (window && window.setTimeout) {
        this.activeIndex = index
        window.setTimeout(() => {
          this.activeIndex = null
          if (cb && (typeof cb === 'function')) {
            cb()
          }
        }, 150)
      }
    },
  }
}
</script>

<style scoped>
h1.title {
  font-size: 40px;
}
h1,
h2 {
  animation: appear 1s;
}
a {
  animation: appear 1s;
}
</style>
