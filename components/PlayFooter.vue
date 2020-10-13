<template>
  <footer :class="{ 'fade-out': disabled }">
    <span>
      <a
        href="https://github.com/jeremy21212121/trivia-frontend"
        title="GitHub repository"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="@/assets/images/github.png" alt="GitHub repository" />
      </a>
    </span>
    <p>
      Made in Vancouver by
      <a
        title="Hire me"
        href="https://jeremypoole.ca"
        target="_blank"
        rel="noopener"
        >Jeremy Poole</a
      >
    </p>
  </footer>
</template>

<style lang="scss" scoped>
@import '@/scss/colors.scss';
footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  opacity: 1;
  transition: opacity 250ms linear;
  &.fade-out {
    opacity: 0;
  }
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
        width: 32px;
        height: 32px;
        border-radius: 50%;
        padding: 1px;
      }
    }
  }
}
</style>

<script>
export default {
  name: 'PlayFooter',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
