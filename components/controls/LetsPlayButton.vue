<template>
  <div :class="{ fadeOut }" class="play">
    <a
      @click.prevent="
        () => {
          fadeOut = true
          setActiveIndex(0, () => {
            $router.push('/categories')
          })
        }
      "
      :class="{ hover: activeIndex === 0 }"
      class="button--green"
      href="/categories"
      >Let's play!</a
    >
  </div>
</template>

<script>
export default {
  name: 'LetsPlayButton',
  data() {
    return {
      fadeOut: false
    }
  },
  methods: {
    clickHandler() {
      this.fadeOut = true
      this.$emit('clicked')
    }
  }
}
</script>
