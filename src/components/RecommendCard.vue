<template>
  <div class="lib-card">
    <p>Text is {{ text }}</p>
    <p>Test returns {{ test }}</p>

    <button v-on:click="testFunc">TEST</button>
  </div>
</template>

<script>
export default {
  name: 'RecommendCard',
  props: {
    msg: String
  },
  data: function() {
      return {
        text: "This is just some test text",
        test: "empty"
      }
  },
  methods : {
      testFunc: function() {
          // A simple test function.
          this.test = "TEST";
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
