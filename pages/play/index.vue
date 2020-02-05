<style lang="scss" scoped>
@import '@/scss/colors.scss';
@import '@/scss/boxShadows.scss';
@import '@/scss/navButton.scss';

.container {
  nav {
    position: absolute;
    margin: 0;
    width: 100%;
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
            // padding: 4px;
            // width: 42px;
            // height: 42px;
            // background-color: $primary-faint;
            // border-radius: 25%;
            // @include bs-white-0;
            // transition: background-color, box-shadow 100ms ease-in-out;
            // -webkit-tap-highlight-color: $primary-bright;
            @include nav-button(42px);
          }
          &:hover, &:active {
            svg {
              // background-color: $primary-bright;
              // box-shadow: none;
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
    // &.game {
    //   // justify-content: flex-start;
    // }
    &.result {
      justify-content: flex-start;
      // overflow: hidden;
      svg.result-icon {
        width: 85%;
        max-width: 531px;
        margin-top: 64px;
      }
      svg.radial {
        max-width: 531px;
        position: fixed;
        top: 64px;
        z-index: -1;
        animation:rotate 30s infinite linear;
      }
      p {
        font-size: 28px;
        text-shadow: 0 0px 2px rgba(255,255,255,0.16),
                    0 0px 2px rgba(255,255,255,0.23);
      }
      a {
        margin: auto 0;
      }
    }
    div {
      margin: 3vh 0;
      margin: auto 0;
      width: 100%;
      h1.category {
        margin-top: 16px;
        padding-bottom: 4px;
        color: rgba(255,255,255,0.7);
        font-size: 24px;
        text-transform: capitalize;
      }
      svg {
        width: 25%;
      }
      .question-number {
        color: rgba(255,255,255,0.7);
        font-size: 18px;
        padding-bottom: 4px;
        margin-top: 16px;
      }
      .difficulty {
        display: block;
        width: 25%;
        color: rgba(255,255,255,0.7);
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
      color: rgba(255,255,255,0.7);
      // min-height: 15vh;
      // margin: 4px 10px;
      // margin-top: 16px;
      line-height: 1.3;
      margin: 5vh 1vw;
      margin: auto 1vw;
      font-size: 20px;
      text-align: center;
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
      li {
        width: 100%;
        // display: block;
        margin: 1.5vh 0;
        color: rgba(255,255,255,0.7);
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
      <nav>
        <ul>
          <li>
            <a href="#" @click.prevent="handleBack" title="back to categories">
              <LeftArrow />
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="handleClose" title="quit current game">
              <CloseIcon />
            </a>
          </li>
        </ul>
      </nav>
      <section v-if="isPlay" class="game">
        <div>
          <h1 class="category" title="category">
            {{ questionData.question.category.toLocaleLowerCase() }}
          </h1>
          <component :is="getCategorySvgComponent(questionData.question.category)" />
          <h2 class="question-number">
            Question {{ questionData.number + 1 }}/{{ questionsPerGame }}
          </h2>
          <span :class="questionData.question.difficulty" class="difficulty" title="difficulty">
            {{ questionData.question.difficulty }}
          </span>
        </div>
        <p>
          {{ questionData.question.question }}
        </p>
        <ol>
          <li
            v-for="(possibleAnswer, index) in questionData.question.possible_answers"
            :key="'option-' + index"
          >
            <a
              @click.prevent="handleGuess(index)"
              href="#"
              class="button--green"
            >
              {{ possibleAnswer }}
            </a>
          </li>
        </ol>
      </section>
      <section
        v-else-if="isResult"
        class="result"
        style="color:rgba(255,255,255,0.7);"
      >
        <component class="radial" :is="'RadialIcon'" />
        <component class="result-icon" :is="results.value.isCorrectGuess ? 'CorrectIcon' : 'WrongIcon'"/>
        <p>
          {{ results.value.isCorrectGuess ? 'Correct!' : 'Wrong!' }}
        </p>
        <aside
          v-if="results.value.gameOver"
          class="game-over"
        >
          <h2>Game Over!</h2>
          <p>
            {{ results.value.score }} / {{ questionsPerGame }}
          </p>
        </aside>
        <a @click="resultNextHandler" href="#" class="button--green">{{ resultButtonText(results) }}</a>
      </section>
      <section v-else>
        <!-- error -->
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

export default {
  name: 'PlayView',
  components: {
    LeftArrow,
    CloseIcon,
    AnimalsIcon: () => import('@/components/icons/animals.svg'),
    AnimeIcon: () => import('@/components/icons/anime.svg'),
    AnyIcon: () => import('@/components/icons/any.svg'),
    ArtIcon: () => import('@/components/icons/art.svg'),
    BoardgamesIcon: () => import('@/components/icons/boardgames.svg'),
    BooksIcon: () => import('@/components/icons/books.svg'),
    CartoonsIcon: () => import('@/components/icons/cartoons.svg'),
    CelebritiesIcon: () => import('@/components/icons/celebrities.svg'),
    ComicsIcon: () => import('@/components/icons/comics.svg'),
    ComputersIcon: () => import('@/components/icons/computers.svg'),
    FilmIcon: () => import('@/components/icons/film.svg'),
    GadgetsIcon: () => import('@/components/icons/gadgets.svg'),
    GeneralKnowledgeIcon: () => import('@/components/icons/generalKnowledge.svg'),
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
    CorrectIcon: () => import('@/components/icons/correct.svg'),
    WrongIcon: () => import('@/components/icons/wrong.svg'),
    RadialIcon: () => import('@/components/icons/radial-white.svg')
  },
  data() {
    return {
      // questionData: {},
      error: false,
    }
  },
  methods: {
    ...mapActions(['setQuestionData', 'clearQuestionData', 'setFetchError', 'setQuestionAndResults', 'setResults', 'clearResults', 'setGameStage']),
    getCategorySvgComponent(apiName) {
      const svgComponent = _categoriesArray.find(obj => obj.apiName === apiName)

      // the component name or an empty string if we didn't find a match.
      // Passing an empty string as the 'is' prop to the generic 'component' component will result in no component being rendered, which is acceptable error behaviour.
      const componentName = svgComponent ? svgComponent.componentName : ''
      return componentName
    },
    handleGuess(guessInt) {
      const guessString = String(guessInt)
      this.apiPost('/verify', { guess: guessString}, this.setQuestionAndResults, this.setFetchError)
    },
    initGame() {
    // checks for game-in-progress to resume or begins a new game
      if (!this.$isServer && this.selectedCategories.length) {
        // we are client-side and have categories set
        if ((!this.questionData.question && !this.results.active) || (this.results.value && this.results.value.gameOver && !this.results.active)) {
          // no question, begin new game. This runs on first load or after game over
          this.apiPost('/start', { categories: this.selectedCategories }, this.setQuestionData, this.setFetchError)
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
      let response
      fetch('http://192.168.0.10:8765' + path, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      })
        .then((resp) => resp.json())
        .then((json) =>
          json.success
            ? (success(json))
            : (fail(true))
        )
        .catch((e) => (this.setFetchError(e.message)))
    },
    resultNextHandler() {
      if (!this.results.value.gameOver) {
        this.setResults({ active: false }) // clear results to play next question
        this.setGameStage('play') // play next question
      } else {
        // clean up
        this.clearResults()
        this.setGameStage(null)
        // game is over, go back to categories
        this.$router.push('/categories')
      }
    },
    resultButtonText(results) {
      if (results.value.gameOver) {
        return 'New Game'
      } else {
        return 'Next'
      }
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
      this.clearQuestionData()
      this.clearResults()
      this.setGameStage(null)
      this.$router.push('/')
    }
  },
  mounted() {
    this.initGame()
  },
  computed: {
    ...mapState(['selectedCategories', 'questionData', 'fetchError', 'guess', 'results', 'questionsPerGame', 'game']),
    isPlay() {
      return this.game.stage === 'play' && !!this.questionData.question
    },
    isLoading() {
      return this.game.stage === 'loading'
    },
    isResult() {
      return this.game.stage === 'results' && this.results.active
    },
    // isGameOver() {
    //   return this.game.stage === 'game-over'
    // },
    questionObject() {
      return this.questionData.question
    }
  }
}
</script>
