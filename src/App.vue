<template>
  <div id="app">
    <b-row>
      <b-col></b-col>
      <b-col class="justify-content-center">
        <!-- Header title -->
        <b-row class="page-header title-font" align-v="center" align-h="center">
          <img class="leaf-image" src="@/assets/leaf-solid.svg" alt="No Image found"/>
          Leaflet
        </b-row>
        <!-- Selection card -->
        <transition 
          name="slide-fade"
        >
          <recommend-card v-if="show" @clicked="onClickCard"/>
        </transition>
      </b-col>
      <b-col></b-col>
    </b-row>
  </div>
</template>

<script>
import RecommendCard from './components/RecommendCard.vue'

export default {
  name: 'App',
  data: function() {
    return {
      show: true // triggers fade away (false) and in (true) of card
    }
  },
  mounted: function () {
    this.show = true
  },
  components: {
    RecommendCard
  },
  methods: {
    /** Triggers on RecommendCard button press
     * Fades card out (this.show=false)
     * Waits for animation to complete, then fades new card in
     */
    onClickCard(value) {
      this.show = false;
      setTimeout(() => this.show = true, 400)
    }
  }
}
</script>

<style>
body {
  background-color: #dde4ea
}

#app {
  text-align: center;
  
}
.centered {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

/* General nice bold font for title-like items */
.title-font {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: bold;
}

/* Leaflet title at top of page */
.page-header {
  color: #1caba0;
  padding: 24px;
}

.leaf-image {
  /* filter because SVGs are weird with color */
  filter: invert(52%) sepia(70%) saturate(498%) hue-rotate(126deg) brightness(93%) contrast(85%);
  width: 20px;
  padding-right: 4px;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .4s ease;
}
.slide-fade-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

</style>
