<template>
  <main class="container">
    <section class="title">
      <logo />
      <h1 class="title">just trivia</h1>
      <h2 class="subtitle">no bullshit</h2>
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

<style>
h1,
h2 {
  animation: appear 1s;
}
a {
  animation: appear 1s;
}
</style>
