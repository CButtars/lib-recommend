<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <recommend-card msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import RecommendCard from './components/RecommendCard.vue'

export default {
  name: 'App',
  components: {
    RecommendCard
  }
}
</script>

<style>
#app {
  text-align: center;
}
</style>
