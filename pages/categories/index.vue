<style lang="scss" scoped>
@import '@/scss/boxShadows.scss';
@import '@/scss/colors.scss';
@import '@/scss/navButton.scss';

section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  animation: appear 200ms;
  div.cat-box {
    @include bs-white-0;
    margin: 4px;
    padding: 2px 1px;
    width: 150px;
    // max-width: 46%;
    min-width: 150px;
    // max-width: 225px;
    flex-grow: 1;
    // flex-basis: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    border-radius: 3px;
    border: 1px solid $white-ulite;
    transition: all ease 190ms;
    &.active {
      border-color: $white-light;
      @include bs-white-0b;
      background-color: rgba(63, 61, 86, 0.2);
      background-color: rgba(59, 128, 112, 0.1);
      background-color: rgba(50, 205, 50, 0.09);
    }
    &.disabled {
      opacity: 0.2;
    }
    &:last-of-type {
      flex-grow: 0;
      width: 48%;
      margin-right: auto;
    }
    svg {
      max-width: 220px;
      margin: auto 0;
    }
    p {
      color: $white-med;
    }
  }
  a {
    position: fixed;
    bottom: 30px;
    right: 5%;
    text-decoration: none;
    font-weight: bold;
    font-size: 40px;
    svg {
      @include nav-button(84px);
      @include bs-white-1;
      background-color: $primary;
    }
    &:hover,
    &:active {
      svg {
        @include nav-button-active;
        @include bs-white-0b;
        background-color: $primary-highlight;
      }
    }
  }
}
</style>

<template>
  <!-- There was formerly an angry comment about disabling eslint here -->
  <!-- Having forgotten the original trauma, a shall put myself thru it all over again -->
  <main class="container">
    <h1 class="title">select your categories</h1>
    <section class="categories">
      <div
        v-for="obj in categoriesArray"
        :key="'cat-' + obj.key"
        @click="handleCategoryClick(obj.key)"
        :class="{ active: isSelected(obj.key), disabled: isDisabled(obj.key) }"
        class="cat-box"
      >
        <!-- eslint seems intent on gaslighting me. There is a v-bind:is on that line, so I dunno. I tried using the long-form syntax but that didnt help either -->
        <!-- eslint-disable-next-line vue/require-component-is -->
        <component :is="obj.componentName" />
        <p>
          {{ obj.displayName }}
        </p>
      </div>
      <nuxt-link
        v-show="selectedCategories.length > 0"
        :title="gameInProgress ? 'resume game' : 'play'"
        to="/play"
      >
        <RightArrow />
      </nuxt-link>
    </section>
  </main>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from 'vuex'
import _categoriesArray from '@/static/categoriesArray'

import RightArrow from '@/components/icons/right-arrow.svg'
import AnimalsIcon from '@/components/icons/animals.svg'
import AnimeIcon from '@/components/icons/anime.svg'
import AnyIcon from '@/components/icons/any.svg'
import ArtIcon from '@/components/icons/art.svg'
import BoardgamesIcon from '@/components/icons/boardgames.svg'
import BooksIcon from '@/components/icons/books.svg'
import CartoonsIcon from '@/components/icons/cartoons.svg'
import CelebritiesIcon from '@/components/icons/celebrities.svg'
import ComicsIcon from '@/components/icons/comics.svg'
import ComputersIcon from '@/components/icons/computers.svg'
import FilmIcon from '@/components/icons/film.svg'
import GadgetsIcon from '@/components/icons/gadgets.svg'
import GeneralKnowledgeIcon from '@/components/icons/generalKnowledge.svg'
import GeographyIcon from '@/components/icons/geography.svg'
import HistoryIcon from '@/components/icons/history.svg'
import MathIcon from '@/components/icons/math.svg'
import MusicalsIcon from '@/components/icons/musicals.svg'
import MusicIcon from '@/components/icons/music.svg'
import MythologyIcon from '@/components/icons/mythology.svg'
import PoliticsIcon from '@/components/icons/politics.svg'
import ScienceIcon from '@/components/icons/science.svg'
import SportsIcon from '@/components/icons/sports.svg'
import TelevisionIcon from '@/components/icons/television.svg'
import VehiclesIcon from '@/components/icons/vehicles.svg'
import VideogamesIcon from '@/components/icons/videogames.svg'

export default {
  name: 'CategoriesView',
  components: {
    AnyIcon,
    GeneralKnowledgeIcon,
    BooksIcon,
    FilmIcon,
    MusicIcon,
    MusicalsIcon,
    TelevisionIcon,
    VideogamesIcon,
    BoardgamesIcon,
    ScienceIcon,
    ComputersIcon,
    MathIcon,
    MythologyIcon,
    SportsIcon,
    GeographyIcon,
    HistoryIcon,
    PoliticsIcon,
    ArtIcon,
    CelebritiesIcon,
    AnimalsIcon,
    VehiclesIcon,
    ComicsIcon,
    GadgetsIcon,
    AnimeIcon,
    CartoonsIcon,
    RightArrow
  },
  data() {
    return {
      categoriesArray: _categoriesArray
    }
  },
  computed: {
    ...mapState(['selectedCategories', 'questionData']),
    gameInProgress() {
      return this.questionData.hasOwnProperty('question')
    }
  },
  methods: {
    ...mapActions(['setCategories']),
    isSelected(key) {
      return this.selectedCategories.includes(key)
    },
    isDisabled(key) {
      return key !== 'any' && this.isSelected('any')
    },
    camelToKebab(str) {
      return str
        .split('')
        .filter((val) => /[A-Za-z0-9]/.test(val)) // remove any non-alpha characters
        .map((val) =>
          val.toLocaleLowerCase() === val ? val : '-' + val.toLocaleLowerCase()
        ) // lowercase and prefix the uppercase letters
        .reduce((a, b) => a + b)
    },
    handleCategoryClick(key) {
      const alreadyExists = this.selectedCategories.includes(key)
      const disabled = this.isDisabled(key)
      const isAny = key === 'any'
      let output = []
      if ((isAny && !alreadyExists) || disabled) {
        output.push(key)
      } else if (isAny && alreadyExists) {
        // prettier does wierd stuff
        ;(() => {})() //noop
      } else if (!disabled && alreadyExists) {
        output.push(...this.selectedCategories.filter((val) => val !== key))
      } else if (!disabled) {
        output.push(...this.selectedCategories, key)
      }
      this.setCategories(output)
    }
  }
}
</script>
