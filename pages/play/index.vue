<style lang="scss" scoped>
@import '@/scss/colors.scss';
@import '@/scss/boxShadows.scss';
@import '@/scss/navButton.scss';
$med-grey: rgba(170, 170, 170, 0.1);
$gris-brilliant: rgba(190, 190, 190, 0.2);
$med-white: rgba(255, 255, 255, 0.1);

@keyframes loading {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
body,
.container,
#__nuxt,
section {
  overflow: hidden;
  max-height: 98vh;
}
.loading {
  background-color: $med-grey;
  background: linear-gradient(270deg, $med-grey, $gris-brilliant, $med-grey);
  background-size: 600% 600%;
  animation: loading 2s ease infinite !important;
  color: rgba(255, 255, 255, 0.01) !important;
  transition: all ease 0.5s;
}
.appear-enter-active {
  animation: 1s appear ease;
}
.appear-leave-active {
  animation: 10ms disappear ease;
}
.container {
  animation: appear 1s;
  nav {
    position: absolute;
    margin: 0;
    width: 100%;
    animation: appear 1s;
    opacity: 1;
    transition: opacity 250ms linear;
    &.fadeOut {
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
            @include nav-button(42px);
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
  section {
    width: 100%;
    min-height: 98vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    animation: 1s appear;
    transition: all ease 0.5s;
    &.result {
      justify-content: flex-start;
      a {
        opacity: 1;
        transition: opacity 250ms linear;
        &.fadeOut {
          opacity: 0;
        }
      }
      svg.loading {
        border-radius: 45%;
        animation: 500ms appear;
      }
      svg.result-icon {
        width: 85%;
        max-width: 531px;
        margin-top: 64px;
        z-index: 99;
        animation: appear 0.5s;
      }
      svg.radial {
        max-width: 531px;
        position: fixed;
        top: 64px;
        z-index: 1;
        animation: rotate 30s infinite linear, 1s appear ease;
      }
      p {
        font-size: 28px;
        text-shadow: 0 0px 2px rgba(255, 255, 255, 0.16),
          0 0px 2px rgba(255, 255, 255, 0.23);
      }
      a {
        margin: auto 0;
      }
    }
    div {
      margin: 3vh 0;
      margin: auto 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      // animation: 1s appear ease;
      h1.category {
        margin-top: 16px;
        padding: 4px 8px;
        border-radius: 4px;
        color: rgba(255, 255, 255, 0.7);
        font-size: 24px;
        text-transform: capitalize;
        &.loading {
          color: rgba(255, 255, 255, 0.7) !important;
          width: 66%;
        }
      }
      svg {
        width: 25%;
        margin: 6px 0;
        border-radius: 4px;
        &.loading {
          fill-opacity: 0.3;
        }
      }
      h2 {
        padding: 4px 8px;
        border-radius: 4px;
      }
      .question-number {
        color: rgba(255, 255, 255, 0.7);
        font-size: 18px;
        padding-bottom: 4px;
        margin-top: 16px;
      }
      .difficulty {
        display: block;
        width: 25%;
        color: rgba(255, 255, 255, 0.7);
        padding: 4px 8px;
        margin: 6px auto;
        border-radius: 4px;
        font-size: 16px;
        font-weight: bold;
        text-transform: capitalize;
        &.easy {
          background-color: rgba(0, 128, 0, 0.5);
        }
        &.medium {
          background-color: rgba(255, 255, 0, 0.5);
        }
        &.hard {
          background-color: rgba(255, 0, 0, 0.5);
        }
      }
    }
    p {
      display: flex;
      align-items: center;
      color: rgba(255, 255, 255, 0.7);
      border-radius: 4px;
      line-height: 1.3;
      margin: 5vh 1vw;
      margin: auto 1vw;
      padding: 4px 8px;
      font-size: 20px;
      text-align: center;
      // animation: 1s appear ease;
    }
    ol {
      width: 100%;
      padding: 0;
      margin: 0;
      margin-top: 3vh;
      margin: auto 0;
      list-style-type: none;
      // height: 33vh;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      // animation: 1s appear ease;
      li {
        width: 100%;
        margin: 1.5vh 0;
        color: rgba(255, 255, 255, 0.7);
        a {
          width: 66%;
        }
      }
    }
  }
}
</style>

<template>
  <client-only>
    <main class="container">
      <nav :class="{ fadeOut }">
        <ul>
          <li>
            <a href="#" title="back to categories" @click.prevent="handleBack">
              <LeftArrow />
            </a>
          </li>
          <li>
            <a href="#" title="quit current game" @click.prevent="handleClose">
              <CloseIcon />
            </a>
          </li>
        </ul>
      </nav>
      <section v-if="isPlay" key="playview" class="game">
        <div>
          <!-- mark everything else aria-hidden during loading so screen readers don't read out "Loading" over and over again -->
          <h1 class="category" title="category" :class="{ loading: isLoading }">
            {{ currentCategory }}
          </h1>
          <component
            :is="currentCategoryIconComponent"
            :class="{ loading: isLoading }"
          />
          <h2
            class="question-number"
            :class="{ loading: isLoading }"
            :aria-hidden="isLoading"
          >
            Question {{ questionData ? questionData.number + 1 : ' ' }}/{{
              questionsPerGame ? questionsPerGame : '  '
            }}
          </h2>
          <span
            :class="[currentDifficulty, { loading: isLoading }]"
            class="difficulty"
            title="difficulty"
            :aria-hidden="isLoading"
          >
            {{ currentDifficulty }}
          </span>
        </div>

        <p :class="{ loading: isLoading }" :aria-hidden="isLoading">
          {{
            !isLoading && questionObject && questionObject.question
              ? questionObject.question
              : 'Loading...........................................................................................'
          }}
        </p>

        <ol :aria-hidden="isLoading">
          <li
            v-for="(possibleAnswer, index) in currentPossibleAnswers"
            :key="'option-' + index"
            :aria-hidden="isLoading"
          >
            <a
              href="#"
              class="button--green"
              :class="[
                { hover: activeIndex === index },
                { loading: isLoading },
              ]"
              @click.prevent="handleGuess(index)"
            >
              {{ possibleAnswer }}
            </a>
          </li>
        </ol>
      </section>
      <section
        v-else-if="isResult"
        key="resultview"
        class="result"
        style="color: rgba(255, 255, 255, 0.7)"
      >
        <component
          :is="'EllipsisIcon'"
          v-if="isLoading"
          class="result-icon loading"
        />
        <component
          :is="results.value.isCorrectGuess ? 'CorrectIcon' : 'WrongIcon'"
          v-else-if="!isLoading"
          class="result-icon"
        />
        <component
          :is="'RadialIcon'"
          v-if="results.active && results.value.isCorrectGuess"
          class="radial"
        />
        <p :class="{ loading: isLoading }">
          {{
            isLoading || !results.active
              ? 'Loading...'
              : results.value.isCorrectGuess
              ? 'Correct!'
              : 'Wrong!'
          }}
        </p>
        <reveal-widget
          v-if="results.active && results.value.isCorrectGuess === false"
          :heading-text="'Reveal answer'"
          :reveal-text="results.value.correctAnswer"
        />
        <article
          v-if="results.active && results.value.gameOver"
          class="game-over"
        >
          <h2>Game Over!</h2>
          <p>{{ results.value.score }} / {{ questionsPerGame }}</p>
        </article>
        <a
          :aria-hidden="isLoading"
          :class="{ fadeOut, loading: isLoading, hover: activeIndex === 0 }"
          href="#"
          class="button--green"
          @click.prevent="resultNextHandler"
          >{{ resultButtonText }}</a
        >
      </section>
      <section v-else-if="isError" key="errorview">
        <h1>Whoops</h1>
        <nuxt-link :to="'/categories'">Go back</nuxt-link>
      </section>
    </main>
  </client-only>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import _categoriesArray from '@/static/categoriesArray'
import LeftArrow from '@/components/icons/left-arrow.svg'
import CloseIcon from '@/components/icons/close.svg'
// import AnyIcon from '@/components/icons/any.svg'
import EllipsisIcon from '@/components/icons/ellipsis.svg'
import CorrectIcon from '@/components/icons/correct.svg'
import WrongIcon from '@/components/icons/wrong.svg'
import RadialIcon from '@/components/icons/radial-white.svg'
import RevealWidget from '@/components/reveal.vue'

export default {
  name: 'PlayView',
  components: {
    LeftArrow,
    CloseIcon,
    EllipsisIcon,
    AnimalsIcon: () => import('@/components/icons/animals.svg'),
    AnimeIcon: () => import('@/components/icons/anime.svg'),
    // AnyIcon: () => import('@/components/icons/any.svg'),
    ArtIcon: () => import('@/components/icons/art.svg'),
    BoardgamesIcon: () => import('@/components/icons/boardgames.svg'),
    BooksIcon: () => import('@/components/icons/books.svg'),
    CartoonsIcon: () => import('@/components/icons/cartoons.svg'),
    CelebritiesIcon: () => import('@/components/icons/celebrities.svg'),
    ComicsIcon: () => import('@/components/icons/comics.svg'),
    ComputersIcon: () => import('@/components/icons/computers.svg'),
    FilmIcon: () => import('@/components/icons/film.svg'),
    GadgetsIcon: () => import('@/components/icons/gadgets.svg'),
    GeneralKnowledgeIcon: () =>
      import('@/components/icons/generalKnowledge.svg'),
    GeographyIcon: () => import('@/components/icons/geography.svg'),
    HistoryIcon: () => import('@/components/icons/history.svg'),
    MathIcon: () => import('@/components/icons/math.svg'),
    MusicalsIcon: () => import('@/components/icons/musicals.svg'),
    MusicIcon: () => import('@/components/icons/music.svg'),
    MythologyIcon: () => import('@/components/icons/mythology.svg'),
    PoliticsIcon: () => import('@/components/icons/politics.svg'),
    ScienceIcon: () => import('@/components/icons/science.svg'),
    SportsIcon: () => import('@/components/icons/sports.svg'),
    TelevisionIcon: () => import('@/components/icons/television.svg'),
    VehiclesIcon: () => import('@/components/icons/vehicles.svg'),
    VideogamesIcon: () => import('@/components/icons/videogames.svg'),
    CorrectIcon,
    WrongIcon,
    RadialIcon,
    RevealWidget,
  },
  data() {
    return {
      categoriesArray: _categoriesArray,
      activeIndex: null,
      fadeOut: false,
    }
  },
  computed: {
    ...mapState([
      'selectedCategories',
      'questionData',
      'fetchError',
      'guess',
      'results',
      'questionsPerGame',
      'game',
      'isLoading',
    ]),
    isPlay() {
      return this.game.stage === 'play'
    },
    isResult() {
      return this.game.stage === 'results'
    },
    isError() {
      return this.fetchError
    },
    questionObject() {
      return this.questionData.question
    },
    currentCategory() {
      return !this.isLoading && this.questionObject
        ? this.questionObject.category
        : 'Loading...'
    },
    currentQuestionType() {
      return this.questionObject && this.questionObject.type
        ? this.questionObject.type
        : ''
    },
    currentCategoryIconComponent() {
      let componentName = 'EllipsisIcon'
      // we will use the ellipsis icon when loading
      if (this.questionObject && !this.isLoading) {
        const svgComponent = this.categoriesArray.find(
          (obj) => obj.apiName === this.questionObject.category
        )
        if (svgComponent) {
          componentName = svgComponent.componentName
        }
      }
      return componentName
    },
    currentDifficulty() {
      return !this.isLoading &&
        this.questionObject &&
        this.questionObject.difficulty
        ? this.questionObject.difficulty
        : 'Loading...'
    },
    currentPossibleAnswers() {
      return !this.isLoading && this.questionObject.possible_answers
        ? this.questionObject.possible_answers
        : ['Loading...', 'Loading...', 'Loading...', 'Loading...']
    },
    currentQuestionNumberString() {
      return !this.isLoading
    },
    resultButtonText() {
      if (this.isLoading) {
        return 'Loading'
      } else if (this.results.active && this.results.value.gameOver) {
        return 'New Game'
      } else {
        return 'Next'
      }
    },
  },
  mounted() {
    this.initGame()
  },
  methods: {
    ...mapActions([
      'setQuestionData',
      'clearQuestionData',
      'setFetchError',
      'setQuestionAndResults',
      'setResults',
      'clearResults',
      'setGameStage',
      'setIsLoading',
    ]),
    setActiveIndex(index, cb) {
      if (window && window.setTimeout) {
        this.activeIndex = index
        window.setTimeout(() => {
          this.activeIndex = null
          if (cb && typeof cb === 'function') {
            cb()
          }
        }, 150)
      }
    },
    handleGuess(guessInt) {
      if (this.isLoading) {
        return
      }
      // emulates :active state in a more reliable manner across devices
      this.setActiveIndex(guessInt, () => {
        const guessString = String(guessInt)
        // set game stage to results for loading animations
        this.setGameStage('results')
        this.apiPost(
          '/verify',
          { guess: guessString },
          this.setQuestionAndResults,
          this.setFetchError
        )
      })
    },
    initGame() {
      // checks for game-in-progress to resume or begins a new game
      if (!this.$isServer && this.selectedCategories.length) {
        // we are client-side and have categories set
        if (
          (!this.questionData.question && !this.results.active) ||
          (this.results.value &&
            this.results.value.gameOver &&
            !this.results.active)
        ) {
          // no question, begin new game. This runs on first load or after game over
          // set game stage to play for loading animations
          this.setGameStage('play')
          // start session and handle response
          this.apiPost(
            '/start',
            { categories: this.selectedCategories },
            this.setQuestionData,
            this.setFetchError
          )
        } else if (this.results.active) {
          // results are active but there is no game over. This path runs when the browser is reloaded while gameSTage: 'results'
          this.setGameStage('results')
        } else {
          // We have a question but no results. Attempt to resume game. This path can be triggered by a browser reload during gameSTage: 'play'
          this.setGameStage('play')
        }
      }
    },
    apiPost(path, payload, success, fail) {
      this.setIsLoading(true)
      fetch('https://justtrivia.fun/api/v1' + path, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      })
        .then((resp) => resp.json())
        .then((json) => {
          if (json.success) {
            success(json)
            this.setIsLoading(false)
          } else {
            fail(true)
          }
        })
        .catch((e) => this.setFetchError(e.message))
    },
    resultNextHandler() {
      this.setActiveIndex(0, () => {
        this.fadeOut = true
        if (!this.results.value.gameOver) {
          this.setResults({ active: false }) // clear results to play next question
          this.setGameStage('play') // play next question
          this.fadeOut = false
        } else {
          // clean up
          this.clearResults()
          this.setGameStage(null)
          // game is over, go back to categories
          this.$router.push('/categories')
        }
      })
    },
    handleBack() {
      if (this.game.stage === 'game-over') {
        // clear results and game stage on back
        // otherwise the play button on /categories would return user to game over screen
        this.clearResults()
        this.setGameStage(null)
      }
      this.$router.push('/categories')
    },
    handleClose() {
      this.fadeOut = true
      this.clearQuestionData()
      this.clearResults()
      this.setGameStage(null)
      this.setIsLoading(false)
      this.$router.push('/')
    },
  },
}
</script>
