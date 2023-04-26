<template>
  <div>
    <GlobalHeader />
    <h1>This is an reports page</h1>
  </div>
</template>

<script>
import GlobalHeader from "./components/GlobalHeader.vue";

export default {
  name: "ReportsPage",
  components: {
    GlobalHeader,
  },
};
</script>

<style scoped>
.reportsPage {
  margin-bottom: 40px;
}
</style>
