<template>
  <div id="app">
    <GlobalHeader />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import GlobalHeader from "./components/GlobalHeader.vue";

export default {
  name: "App",
  components: {
    GlobalHeader,
  },
  mounted() {
    this.fetchMovies();
  },
  methods: {
    ...mapActions("movies", ["fetchMovies"]),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
