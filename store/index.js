export const state = () => ({
  // this is no longer a dict really. rename me and change all references to me. categoriesArray i guess. This doesnt even belong in state, it doesnt change. Maybe put it in a seperate file, Object.freeze it, and import it into the  views where it is needed.
  categoriesDict: JSON.parse(
    '[{"componentName":"AnyIcon","displayName":"surprise me","key":"any","apiName":"Any Category"},{"componentName":"GeneralKnowledgeIcon","displayName":"general knowledge","key":"9","apiName":"General Knowledge"},{"componentName":"BooksIcon","displayName":"books","key":"10","apiName":"Entertainment: Books"},{"componentName":"FilmIcon","displayName":"films","key":"11","apiName":"Entertainment: Film"},{"componentName":"MusicIcon","displayName":"music","key":"12","apiName":"Entertainment: Music"},{"componentName":"MusicalsIcon","displayName":"theater & musicals","key":"13","apiName":"Musicals & Theatres"},{"componentName":"TelevisionIcon","displayName":"television","key":"14","apiName":"Entertainment: Television"},{"componentName":"VideogamesIcon","displayName":"video games","key":"15","apiName":"Entertainment: Video Games"},{"componentName":"BoardgamesIcon","displayName":"board games","key":"16","apiName":"Entertainment: Board Games"},{"componentName":"ScienceIcon","displayName":"science & nature","key":"17","apiName":"Science & Nature"},{"componentName":"ComputersIcon","displayName":"computers","key":"18","apiName":"Science: Computers"},{"componentName":"MathIcon","displayName":"math","key":"19","apiName":"Science: Mathematics"},{"componentName":"MythologyIcon","displayName":"mythology","key":"20","apiName":"Mythology"},{"componentName":"SportsIcon","displayName":"sports","key":"21","apiName":"Sports"},{"componentName":"GeographyIcon","displayName":"geography","key":"22","apiName":"Geography"},{"componentName":"HistoryIcon","displayName":"history","key":"23","apiName":"History"},{"componentName":"PoliticsIcon","displayName":"politics","key":"24","apiName":"Politics"},{"componentName":"ArtIcon","displayName":"art","key":"25","apiName":"Art"},{"componentName":"CelebritiesIcon","displayName":"celebrities","key":"26","apiName":"Celebrities"},{"componentName":"AnimalsIcon","displayName":"animals","key":"27","apiName":"Animals"},{"componentName":"VehiclesIcon","displayName":"vehicles","key":"28","apiName":"Vehicles"},{"componentName":"ComicsIcon","displayName":"comics","key":"29","apiName":"Entertainment: Comics"},{"componentName":"GadgetsIcon","displayName":"tech gadgets","key":"30","apiName":"Science: Gadgets"},{"componentName":"AnimeIcon","displayName":"anime & manga","key":"31","apiName":"Entertainment: Japanese Anime & Manga"},{"componentName":"CartoonsIcon","displayName":"cartoons & animation","key":"32","apiName":"Cartoon & Animations"}]'
  ),
  questionsPerGame: 10,
  selectedCategories: [],
  supportsLocalStorage: false,
  questionData: {},
  fetchError: false,
  guess: '',
  results: {
    active: false
  }
})

export const mutations = {
  SET_CATEGORIES(state, array) {
    state.selectedCategories = array
  },
  SET_SUPPORTS_LOCAL_STORAGE(state, bool) {
    state.supportsLocalStorage = bool
  },
  SET_QUESTION_DATA(state, object) {
    state.questionData = Object.assign({}, object) // Object.assign to ensure reference is broken to object
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
    // if (object.active) {
    //   state.results.value = object
    // } else {
    //   state.results.value = {}
    // }
    state.results.value = object.active ? object.value : {}
  }
}

export const actions = {
  setCategories({ commit, state }, array) {
    commit('SET_CATEGORIES', array)
    if (state.supportsLocalStorage) {
      localStorage.setItem('categories', JSON.stringify(array))
    }
  },
  setSupportsLocalStorage({ commit }, bool) {
    commit('SET_SUPPORTS_LOCAL_STORAGE', bool)
  },
  syncStoreWithLocalStorage({ commit, state }) {
    // loads user-selected categories from localStorage
    // should only be called client-side after feature detection
    try {
      const array = JSON.parse(localStorage.getItem('categories'))
      if (
        // do basic validation of what we found in localStorage. categoriesDict is now actually an array
        Array.isArray(array) &&
        // make sure each category is valid
        array.every((val) =>
          state.categoriesDict.some((obj) => obj.key === val)
        )
      ) {
        // localStorage value is valid
        commit('SET_CATEGORIES', array)
      }
    } catch (e) {
      // swallow error.
      // shouldn't actually be possible as long as localStorage support is verified before calling this action and it's only called client-side
    }
  },
  setQuestionData({ commit }, object) {
    commit('SET_QUESTION_DATA', object.questionData)
  },
  setFetchError({ commit }, bool) {
    commit('SET_FETCH_ERROR', bool)
    // ensure questionData is cleared on fetchError
    commit('SET_QUESTION_DATA', {})
  },
  setGuess({ commit }, string) {
    commit('SET_GUESS', string)
  },
  setResults({ commit }, obj) {
    commit('SET_RESULTS', obj)
  },
  setQuestionAndResults({ commit }, obj) {
    const question = !obj.results.gameOver ? obj.questionData : {}
    commit('SET_RESULTS', { active: true, value: obj.results })
    commit('SET_QUESTION_DATA', question)
  }
}
