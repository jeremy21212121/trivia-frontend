<style lang="scss" scoped>
@import '@/scss/boxShadows.scss';

section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  animation: appear 1s;
  div.cat-box {
    @include bs-white-0;
    margin: 8px 4px;
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
    border: 1px solid rgba(255, 255, 255, 0.01);
    transition: all ease-in-out 190ms;
    &.active {
      border-color: rgba(255, 255, 255, 0.1);
      @include bs-white-0b;
      background-color: rgba(63, 61, 86, 0.2);
      background-color: rgba(59, 128, 112, 0.1);
      background-color: rgba(50, 205, 50, 0.09);
    }
    &.disabled {
      opacity: 0.2;
    }
    svg {
      max-width: 220px;
      margin: auto 0;
    }
    p {
      color: rgba(255, 255, 255, 0.6);
    }
  }
  a {
    @include bs-black-3;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 100%;
    background-color: #7BBD00;
    position: fixed;
    bottom: 30px;
    right: 5%;
    width: 60px;
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, 0.75);
    text-decoration: none;
    font-weight: bold;
    font-size: 40px;
    
  }
}
// @media screen and (min-width: 450px){
// }
</style>

<template>
  <!-- eslint-disable -->
  <!-- spent two hours debugging some eslint bullshit -->
  <main class="container">
    <h1 class="title">select your categories</h1>
    <section class="categories">
        <div
          v-for="obj in categoriesDict"
          :key="'cat-' + obj.key"
          @click="handleCategoryClick(obj.key)"
          :class="{ active: isSelected(obj.key), disabled: isDisabled(obj.key) }"
          class='cat-box'
        >
          <component :is="obj.componentName" />
          <p>
            {{ obj.displayName }}
          </p>
        </div>
        <nuxt-link to="/play" title="Start game">
          &#x1f86a;
        </nuxt-link>
    </section>
  </main>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from 'vuex'

import AnimalsIcon from '@/components/icons/animals.svg'
import AnimeIcon from '@/components/icons/anime.svg'
import AnyIcon from '@/components/icons/any.svg'
import ArtIcon from '@/components/icons/art.svg'
import BoardgamesIcon from '@/components/icons/boardgames.svg'
import BooksIcon from '@/components/icons/books.svg'
// import CancelIcon from '@/components/icons/cancel.svg'
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
  name: 'PlayView',
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
    CartoonsIcon
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['selectedCategories', 'categoriesDict'])
  },
  methods: {
    ...mapActions([
      'setCategories'
    ]),
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
      let output = [];
      if ((isAny && !alreadyExists || disabled)) {
        output.push(key)
      } else if (isAny && alreadyExists) {
        () => {} //noop
      } else if (!disabled && alreadyExists) {
        output.push(...this.selectedCategories.filter(val => val !== key))
      } else if (!disabled) {
        output.push(...this.selectedCategories, key)
      }
      this.setCategories(output)
    }
  }
}
</script>
