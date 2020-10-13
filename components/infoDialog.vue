<template>
  <aside :class="{ active: isActive }">
    <a href="#" title="close"></a>
    <slot></slot>
  </aside>
</template>

<script>
export default {
  name: 'InfoDialog',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    body: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/colors.scss';
aside {
  position: absolute;
  top: 0;
  left: 0;
  transition: all 250ms ease-in-out;
  min-width: 0px;
  min-height: 0px;
  width: 0px;
  height: 0px;
  background-color: $grey-med;
  opacity: 0;
}
aside.active {
  top: 1vh;
  left: 1vw;
  min-width: 98vw;
  min-height: 98vh;
  z-index: 901;
  opacity: 1;
}
</style>
