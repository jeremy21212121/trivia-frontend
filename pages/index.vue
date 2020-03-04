<template>
  <main class="container">
    <section class="title" :class="{ fadeOut }">
      <logo />
      <h1 class="title">just trivia</h1>
      <h2 class="subtitle">no nonsense</h2>
    </section>
    <span class="description" :class="{ fadeOut }">
      A free, open-source trivia game with no ads, tracking or other nonsense.
    </span>
    <div class="play" :class="{ fadeOut }">
      <a
        href="/categories"
        @click.prevent="() => { fadeOut = true; setActiveIndex(0, () => { $router.push('/categories') }) }"
        class="button--green"
        :class="{ hover: activeIndex === 0 }"
      >Let's play!</a>
    </div>
    <footer :class="{ fadeOut }">
      <span>
        <a href="https://github.com/jeremy21212121/trivia-frontend" title="GitHub repository" target="_blank" rel="noopener noreferrer">
          <img src="@/assets/images/github.png" alt="GitHub repository">
        </a>
      </span>
      <p>
        Made in Vancouver by <a title="Hire me" href="https://jeremypoole.ca" target="_blank" rel="noopener">Jeremy Poole</a>
      </p>
    </footer>
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
      activeIndex: null,
      fadeOut: false
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
        }, 100)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/colors.scss';
main.container {
  animation: appear 1s;
  .fadeOut {
    opacity: 0 !important;
  }
  section.title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 2;
    opacity: 1;
    transition: opacity 250ms linear;
    h1.title {
      font-size: 40px;
    }
  }
  div.play {
    flex-grow: 1;
    opacity: 1;
    transition: opacity 250ms linear 250ms;
  }
  span.description {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 1.5rem;
    flex-grow: 2;
    padding: 0 16px;
    color: $white-med;
    opacity: 1;
    transition: opacity 250ms linear;
  }
  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    opacity: 1;
    transition: opacity 250ms linear;
    p {
      text-shadow: 0 0 1px $grey-faint;
      color: $grey-faint;
      a {
        color: $grey-med;
      }
    }
    span {
      margin-right: 16px;
      a {
        display: block;
        img {
          background-color: $grey-faint;
          border-radius: 50%;
          padding: 1px;
        }
      }
    }
  }
}
</style>
