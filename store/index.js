import _categoriesArray from '@/static/categoriesArray'

export const state = () => ({
  questionsPerGame: 10,
  selectedCategories: [],
  supportsLocalStorage: false,
  questionData: {},
  fetchError: false,
  guess: '',
  results: {
    active: false
  },
  game: {
    stage: null
  },
  isLoading: false
})

export const mutations = {
  SET_CATEGORIES(state, array) {
    state.selectedCategories = array
    if (state.supportsLocalStorage) {
      localStorage.setItem('categories', JSON.stringify(array))
    }
  },
  SET_SUPPORTS_LOCAL_STORAGE(state, bool) {
    state.supportsLocalStorage = bool
  },
  SET_QUESTION_DATA(state, object) {
    state.questionData = object // Object.assign to ensure reference is broken to object
    if (state.supportsLocalStorage) {
      localStorage.setItem('questionData', JSON.stringify(object))
    }
  },
  CLEAR_QUESTION_DATA(state) {
    state.questionData = {}
    if (state.supportsLocalStorage) {
      localStorage.setItem('questionData', '{}')
    }
  },
  SET_FETCH_ERROR(state, bool) {
    state.fetchError = bool
  },
  SET_GUESS(state, string) {
    state.guess = string
  },
  // object = { active: Boolean, value: { score: Int, isCorrectGuess: Boolean, ?optional gameOver: Boolean } }
  SET_RESULTS(state, object) {
    state.results.active = object.active
    state.results.value = object.active ? object.value : {}
    if (state.supportsLocalStorage) {
      localStorage.setItem('results', JSON.stringify(object))
    }
  },
  CLEAR_RESULTS(state) {
    state.results = { active: false }
    if (state.supportsLocalStorage) {
      localStorage.setItem('results', JSON.stringify({ active: false }))
    }
  },
  SET_GAME_STAGE(state, stringOrNull) {
    if (state.supportsLocalStorage) {
      localStorage.setItem('gameStage', JSON.stringify({ stage: stringOrNull }))
    }
    state.game.stage = stringOrNull
  },
  SET_IS_LOADING(state, boolean) {
    state.isLoading = boolean
  },
  CLEAR_IS_LOADING(state, boolean) {
    // seperate clear mutation to make debugging easier
    state.isLoading = boolean
  }
}

export const actions = {
  setCategories({ commit }, array) {
    // for use on the categories view only, there are side effects
    commit('SET_CATEGORIES', array)
    // clear game state when this action is called.
    // this ensures any game-in-progress is discarded if the categories are changed
    commit('CLEAR_QUESTION_DATA')
    commit('CLEAR_RESULTS')
    commit('SET_GAME_STAGE', null)
  },
  setSupportsLocalStorage({ commit }, bool) {
    commit('SET_SUPPORTS_LOCAL_STORAGE', bool)
  },
  syncStoreWithLocalStorage({ commit }) {
    // loads user-selected categories and any in-progress game state from localStorage
    // should only be called client-side after feature detection
    // NB - this method of loading from localStorage results in an unnecessary write to localStorage when suitable values are found in localStorage, for each commit() call. This is because writing to localStorage occurs in the mutation, and we call the mutation. Even though LS is synchronous, we are writing small strings. This isn't currently problematic.
    try {
      const array = JSON.parse(localStorage.getItem('categories'))
      if (
        // do basic validation of what we found in localStorage.
        Array.isArray(array) &&
        // make sure each category is valid
        array.every((val) => _categoriesArray.some((obj) => obj.key === val))
      ) {
        // localStorage value is valid
        commit('SET_CATEGORIES', array)
      }
      // load state from localStorage if it is there. This allows resuming preserving a game across browser reload. We could also change the backend to have seperate `/question` and `/verify`. The current architecture of the backend doesnt allow requesting a question twice, but that isn't necessary. If we could just request the current question again, this wouldnt be necessary.
      const questionData = JSON.parse(localStorage.getItem('questionData'))
      const gameStage = JSON.parse(localStorage.getItem('gameStage')).stage
      // basic validation of data
      if (questionData && questionData.question && gameStage) {
        // passed validation, set relevant state
        commit('SET_QUESTION_DATA', questionData)
        commit('SET_GAME_STAGE', gameStage)
      }
      // try to load results from localStorage if game stage is 'results'
      if (gameStage === 'results') {
        const results = JSON.parse(localStorage.getItem('results'))
        if (results) {
          commit('SET_RESULTS', JSON.stringify(results))
        }
      }
    } catch (e) {
      // console.log(e)
      // swallow error.
      // shouldn't actually be possible as long as localStorage support is verified before calling this action and it's only called client-side
    }
  },
  setQuestionData({ commit, state }, jsonResponse) {
    // set question data and game stage to play
    commit('SET_QUESTION_DATA', jsonResponse.questionData)
    commit('SET_GAME_STAGE', 'play')
  },
  clearQuestionData({ commit }) {
    commit('CLEAR_QUESTION_DATA')
  },
  setFetchError({ commit }, bool) {
    commit('SET_FETCH_ERROR', bool)
    // ensure questionData is cleared on fetchError
    commit('CLEAR_QUESTION_DATA')
    commit('SET_GAME_STAGE', null)
    commit('CLEAR_IS_LOADING')
  },
  setResults({ commit }, obj) {
    commit('SET_RESULTS', obj)
  },
  clearResults({ commit }) {
    commit('CLEAR_RESULTS')
  },
  setQuestionAndResults({ commit }, obj) {
    /**
     * param 'obj' is the API response from /verify
     *
     * {
     *   success: Boolean,
     *   results: {
     *     score: Int,
     *     isCorrectGuess: Boolean,
     *     ?gameOver: Boolean
     *   },
     *   ?questionData: {
     *     number: Int,
     *     question: {
     *       category: String,
     *       type: String,
     *       difficulty: String,
     *       question: String,
     *       possibleAnswers: [ String ]
     *     }
     *   }
     * }
     */
    const questionData = obj.questionData
    // use seperate mutations for easier debugging
    const questionMutation = questionData
      ? 'SET_QUESTION_DATA'
      : 'CLEAR_QUESTION_DATA'
    const stage = !obj.results ? 'play' : 'results'

    commit('SET_RESULTS', { active: true, value: obj.results })
    commit(questionMutation, questionData)
    commit('SET_GAME_STAGE', stage)
  },
  setGameStage({ commit }, stringOrNull) {
    commit('SET_GAME_STAGE', stringOrNull)
  },
  setIsLoading({ commit }, boolean) {
    // uses seperate mutations to make debugging easier
    const mutation = boolean ? 'SET_IS_LOADING' : 'CLEAR_IS_LOADING'
    commit(mutation, boolean)
  }
}
