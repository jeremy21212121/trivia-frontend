<style lang="scss" scoped>
section {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  animation: 1s appear;
  &.game {
    justify-content: flex-start;
  }
  &.result {
    justify-content: flex-start;
    // overflow: hidden;
    svg.result-icon {
      width: 85%;
      margin-top: 64px;
    }
    svg.radial {
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
    min-height: 33vh;
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
    min-height: 15vh;
    margin: 0 10px;
    margin-top: 16px;
    font-size: 20px;
    text-align: center;
  }
  ol {
    width: 100%;
    padding: 0;
    margin: auto 0;
    list-style-type: none;
    height: 33vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    li {
      width: 100%;
      // display: block;
      color: rgba(255,255,255,0.7);
      a {
        width: 66%;
      }
    }
  }

}
</style>

<template>
  <main class="container">
    <section v-if="isPlay" class="game">
      <div>
        <h1 class="category" title="category">
          {{ questionObject.category.toLocaleLowerCase() }}
        </h1>
        <component :is="categoriesDict.find(obj => obj.apiName === questionData.question.category).componentName" />
        <h2 class="question-number">
          Question {{ questionData.number + 1 }}/{{ questionsPerGame }}
        </h2>
        <span :class="questionObject.difficulty" class="difficulty" title="difficulty">
          {{ questionObject.difficulty }}
        </span>
        <!-- <span class="difficulty" title="question type">
          {{ questionObject.type === 'multiple' ? 'multiple choice' : 'true or false' }}
        </span> -->
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
      <a @click="()=> !results.value.gameOver ? setResults({ active: false }) : null" class="button--green">Next question</a>
    </section>
    <section
      v-else-if="this.results.value && this.results.value.gameOver"
    >
      <p>
        Game Over!
      </p>
      <p>
        {{this.results.value.score}} / 10
      </p>
    </section>
    <section v-else>
      <h1>Whoops</h1>
      <nuxt-link :to="'/categories'">Go back</nuxt-link>
    </section>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PlayView',
  components: {
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
      error: false
    }
  },
  methods: {
    ...mapActions(['setQuestionData', 'setFetchError', 'setGuess', 'setQuestionAndResults', 'setResults']),
    handleGuess(guessInt) {
      const guessString = String(guessInt)
      this.setGuess(guessString)
      // clear question data
      this.setQuestionData({})
      this.apiPost('/verify', { guess: guessString}, this.setQuestionAndResults, this.setFetchError)
      // clear guess after submit
      this.setGuess('')
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
    }
  },
  mounted() {
    if (!this.$isServer && this.selectedCategories.length && !this.questionData.question) {
      this.apiPost('/start', { categories: this.selectedCategories }, this.setQuestionData, this.setFetchError)
    }
  },
  computed: {
    ...mapState(['selectedCategories', 'questionData', 'fetchError', 'guess', 'results', 'questionsPerGame', 'categoriesDict']),
    isPlay() {
      return !this.isResult &&!this.guess.length && !!Object.keys(this.questionData).length
    },
    isGuess() {
      return (!this.isPlay && typeof this.guess === 'string' && !!this.guess.length)
    },
    isResult() {
      return this.results.active
    },
    questionObject() {
      return this.questionData.question
    }
  }
}
</script>
