<style lang="scss" scoped>
@import '@/scss/navButton.scss';
@import '@/scss/colors.scss';
nav {
  position: absolute;
  margin: 0;
  width: 100%;
  animation: 300ms appear;
  opacity: 1;
  transition: opacity 250ms linear;
  background-color: $white-ulite;
  border-bottom: 1px solid $white-light;
  &.fade-out {
    opacity: 0;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    li {
      margin: 8px;
      a {
        svg {
          @include nav-button(7vw);
        }
        &:hover {
          svg {
            @include nav-button-active;
          }
        }
      }
    }
  }
}
</style>

<template>
  <nav :class="{ 'fade-out': disabled }">
    <ul>
      <li>
        <a @click.prevent="$emit('back')" href="#" title="back to categories">
          <LeftArrow />
        </a>
      </li>
      <li>
        <a @click.prevent="$emit('close')" href="#" title="quit current game">
          <CloseIcon />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import LeftArrow from '@/components/icons/left-arrow.svg'
import CloseIcon from '@/components/icons/close.svg'

export default {
  name: 'PlayNavControls',
  components: {
    LeftArrow,
    CloseIcon
  },
  props: {
    disabled: {
      type: Boolean,
      deafult: false
    }
  },
  // data() {
  //   return {
  //     fadeOut: false
  //   }
  // },
  methods: {
    // handleBack() {
    //   if (this.game.stage === 'game-over') {
    //     // clear results and game stage on back
    //     // otherwise the play button on /categories would return user to game over screen
    //     this.clearResults()
    //     this.setGameStage(null)
    //   }
    //   this.$router.push('/categories')
    // },
    // handleClose() {
    //   this.fadeOut = true
    //   this.$emit('')
    //   this.clearQuestionData()
    //   this.clearResults()
    //   this.setGameStage(null)
    //   this.setIsLoading(false)
    //   this.$router.push('/')
    // }
  }
}
</script>
