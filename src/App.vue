<template>
  <div id="app">
    <b-row>
      <b-col></b-col>
      <b-col class="justify-content-center">
        <!-- Header title -->
        <b-row class="page-header" align-v="center" align-h="center">
          <img class="leaf-image" src="@/assets/leaf-solid.svg" alt="No Image found"/>
          Leaflet
        </b-row>
        <!-- Selection card -->
        <transition 
          name="slide-fade"
          v-on: after-leave="onTransitionLeave"
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
      show: true
    }
  },
  mounted: function () {
    this.show = true
  },
  components: {
    RecommendCard
  },
  methods: {
    onClickCard(value) {
      console.log(value); //debug
      this.show = false;
      setTimeout(() => this.show = true, 400)
    },
    onTransitionLeave() {
      console.log("Transistion Leave");
      this.show = true;
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

.page-header {
  color: #1caba0;
  padding: 24px;
  /* font-family: 'Arial Narrow Bold', Impact, Haettenschweiler, sans-serif; */
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: bold;
}

.leaf-image {
  filter: invert(52%) sepia(70%) saturate(498%) hue-rotate(126deg) brightness(93%) contrast(85%);
  width: 18px;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .4s ease;
}
.slide-fade-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

</style>
