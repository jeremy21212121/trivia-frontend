<template>
  <main class="container">
    <section class="title">
      <logo />
      <h1 class="title">just trivia</h1>
      <h2 class="subtitle">no nonsense</h2>
    </section>
    <nuxt-link :to="'/categories'" class="button--green">Let's play!</nuxt-link>
  </main>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
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
