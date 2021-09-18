<template>
  <div id="app">
    <b-row>
      <b-col></b-col>
      <b-col class="justify-content-center">
        <button @click="show = !show">
          Toggle render
        </button>
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
    }
  }
}
</script>

<style>
#app {
  text-align: center;
}
.centered {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

</style>
