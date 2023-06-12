<template>
  <section class="ui two column centered grid">
    <!-- <div>
      <h1>Страница для авторизации студента на паре</h1>
    </div> -->
    <b-button @click="locatorButtonPressed">Получить координаты</b-button>
    <h1>TeacherDisciplineID: {{ $route.params.tDiscID }}</h1>
    <h1>Date: {{ $route.params.dt }}</h1>
    <h1>ClassOrderID: {{ $route.params.classOrderID }}</h1>
    <div>
      <h1>Вы успешно отмечены на занятии!</h1>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      address: "",
    };
  },
  methods: {
    locatorButtonPressed() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
  },
  beforeRouteUpdate(to, from, next) {
    // обрабатываем изменение параметров маршрута...
    console.log("TO: ", to);
    console.log("FROM: ", from);
    // не забываем вызвать next()
    next();
  },
};
</script>

<style scoped>
h1 {
  margin: 2em 0;
}
</style>
