<style lang="scss" scoped>
.reveal-animate {
  transition: all 750ms ease-in-out;
}

.reveal-widget {
  position: relative;
  width: 180px;
  height: 180px;
  margin: 0 auto;
  backface-visibility: hidden;
  user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -webkit-touch-callout: none;
  .sticky {
    transform: rotate(45deg);
    position: absolute;
    top: 0;
    left: 0;
    width: 180px;
    height: 180px;
  }
  &:active {
    .sticky {
      transform: rotate(10deg);
    }
    .back {
      height: 90px;
      top: 110px;
    }
    .back .circle {
      margin-top: -50px;
    }
    .front {
      height: 70px;
      box-shadow: 0 -60px 10px -60px rgba(0, 0, 0, 0.1);
      -webkit-box-shadow: 0 -60px 10px -60px rgba(0, 0, 0, 0.1);
      .circle {
        margin-top: -90px;
        background-color: #e2d439;
        background-position: 0 100px;
      }
    }
    .reveal {
      .circle {
        opacity: 1;
      }
    }
    h4 {
      opacity: 0;
      transition: opacity 50ms linear 300ms;
    }
  }
  .reveal {
    .circle {
      opacity: 0;
      // color: rgba(0, 0, 0, 0.85);
      // background: #fafafa;
      box-shadow: 0 1px 0px rgba(0, 0, 0, 0.15);
      font-family: 'helvetica neue', arial;
      font-weight: 200;
      line-height: 140px;
      text-align: center;
      cursor: pointer;
      transition: opacity 50ms linear 400ms;
      span {
        display: block;
        position: relative;
        bottom: 18px;
      }
    }
  }
  .circle_wrapper {
    position: absolute;
    width: 180px;
    height: 180px;
    left: 0px;
    top: 0px;
    overflow: hidden;
  }
  .circle {
    position: absolute;
    width: 140px;
    height: 140px;
    margin: 20px;
    border-radius: 999px;
  }
  .back {
    height: 10px;
    top: 30px;
    .circle {
      margin-top: -130px;
      background-color: #fbec3f;
      background-image: -webkit-linear-gradient(
        to top,
        rgba(251, 236, 63, 0),
        rgba(255, 255, 255, 0.8)
      );
    }
  }
  .front {
    height: 150px;
    bottom: 0;
    top: auto;
    box-shadow: 0 -140px 20px -140px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 -140px 20px -140px rgba(0, 0, 0, 0.3);
    .circle {
      margin-top: -10px;
      background: #fbec3f;

      background-image: -webkit-linear-gradient(
        to top,
        rgba(251, 236, 63, 0) 75%,
        #f7bb37 95%
      );
      background-image: -moz-linear-gradient(
        to top,
        rgba(251, 236, 63, 0) 75%,
        #f7bb37 95%
      );
      background-image: linear-gradient(
        to top,
        rgba(251, 236, 63, 0) 75%,
        #f7bb37 95%
      );
    }
  }
  h4 {
    font-family: 'helvetica neue', arial;
    // font-weight: 200;
    color: rgba(0, 0, 0, 0.85);
    text-align: center;
    position: absolute;
    top: 18px;
    width: 180px;
    height: 140px;
    line-height: 140px;
    transition: opacity 50ms linear 400ms;
  }
}
@media screen and (min-width: 650px) {
  .reveal-widget {
    margin-right: 18px;
  }
}
</style>

<template>
  <aside class="reveal-animate reveal-widget">
    <div class="reveal circle_wrapper">
      <div class="circle">
        <span>{{ revealText }}</span>
      </div>
    </div>
    <div class="sticky reveal-animate">
      <div class="front circle_wrapper reveal-animate">
        <div class="circle reveal-animate"></div>
      </div>
    </div>
    <h4>{{ headingText }}</h4>
    <div class="sticky reveal-animate">
      <div class="back circle_wrapper reveal-animate">
        <div class="circle reveal-animate"></div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'RevealWidget',
  props: {
    headingText: {
      type: String,
      default: 'Buongiorno!',
    },
    revealText: {
      type: String,
      default: 'Reveal',
    },
  },
}
</script>
