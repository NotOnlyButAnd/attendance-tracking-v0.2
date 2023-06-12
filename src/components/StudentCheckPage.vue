<template>
  <section class="ui two column centered grid">
    <!-- <div>
      <h1>Страница для авторизации студента на паре</h1>
    </div> -->
    <h1>Отметка о посещении занятия</h1>
    <h5>Дисциплина: {{ discName }}</h5>
    <h5>Дата: {{ getNormDt($route.params.dt) }}</h5>
    <h5>Номер пары: {{ $route.params.classOrderID }}</h5>
    <h5>Преподаватель: {{ teacher }}</h5>
    <h5>lat: {{ lat }}; long: {{ long }}</h5>
    <b-button @click="locatorButtonPressed">Получить координаты</b-button>
    <h1>TeacherDisciplineID: {{ $route.params.tDiscID }}</h1>
    <h1>Date: {{ $route.params.dt }}</h1>
    <h1>ClassOrderID: {{ $route.params.classOrderID }}</h1>
    <div>
      <h1>Вы успешно отмечены на занятии!</h1>
    </div>
    <div>{{ getDiscInfo }}</div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
//import axios from "axios";

export default {
  data() {
    return {
      address: "",
      discName: "",
      teacher: "",
      lat: -1,
      long: -1,
    };
  },
  computed: {
    ...mapGetters("teacherDisciplines", [
      "teacherDisciplines",
      "getTeacherDisciplinesByID",
    ]),
    ...mapGetters("classOrders", [
      "classOrders",
      "getClassOrderByID",
      "getClassOrderByTime",
    ]),
    getDiscInfo() {
      let tAllTDisc = this.teacherDisciplines;
      console.log("All teacher disciplines: ", tAllTDisc);
      for (let key in tAllTDisc) {
        if (tAllTDisc[key].id == this.$route.params.tDiscID) {
          //console.log("YAY! -> ", tAllTDisc[key]);
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.discName = tAllTDisc[key].discipline.name;
          //console.log("PREP: ", tAllTDisc[key].teacher);
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.teacher =
            tAllTDisc[key].teacher.user.last_name +
            " " +
            tAllTDisc[key].teacher.user.first_name[0] +
            "." +
            tAllTDisc[key].teacher.middleName[0] +
            ".";
        }
      }
      return "";
    },
  },
  methods: {
    ...mapActions("teacherDisciplines", ["fetchAllTeacherDisciplines"]),
    getNormDt(dt) {
      return (
        dt[8] +
        dt[9] +
        "." +
        dt[5] +
        dt[6] +
        "." +
        dt[0] +
        dt[1] +
        dt[2] +
        dt[3]
      );
    },
    locatorButtonPressed() {
      // получаем геолокацию текущую
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude);
          this.lat = position.coords.latitude;
          console.log(position.coords.longitude);
          this.long = position.coords.longitude;
          // проверяем, проходит ли геолокация в универе
          if (this.checkLocation(this.lat, this.long)) {
            console.log("All is good, you are in the university");
          } else {
            alert("Судя по геолокации, вы не в университете!");
          }
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
    checkLocation(curr_lat, curr_lon) {
      console.log("CHECK: ", curr_lat, curr_lon);
      // проводим горизонтальный луч через нашу точку и смотрим, сколько раз она пересекает четырехугольник
      // (например, он направлен вправо)
      // если четное число раз - то снаружи. если нет - то лежит внутри
      // координаты универа +- погрешность (ЛевВер, ПравВер, ПравНиж, ЛевНиж)
      let yp = [45.02092, 45.020541, 45.019009, 45.01972];
      let xp = [39.029596, 39.033078, 39.032609, 39.029143];
      let y = curr_lat;
      let x = curr_lon;
      // на этих норм работает:
      //let y = 45.020456;
      //let x = 39.030705;
      let npol = yp.length;
      let c = false;
      let j = npol - 1;
      for (let i = 0; i < npol; i++) {
        if (
          ((yp[i] <= y && y < yp[j]) || (yp[j] <= y && y < yp[i])) &&
          yp[j] - yp[i] != 0 &&
          x > ((xp[j] - xp[i]) * (y - yp[i])) / (yp[j] - yp[i]) + xp[i]
        ) {
          c = !c;
        }
        j = i;
      }
      console.log("IS in university? -> ", c);
      return c;
    },
  },
  beforeRouteUpdate(to, from, next) {
    // обрабатываем изменение параметров маршрута...
    console.log("TO: ", to);
    console.log("FROM: ", from);
    // не забываем вызвать next()
    next();
  },
  created() {
    this.fetchAllTeacherDisciplines();
  },
};
</script>

<style scoped>
h1 {
  margin: 30px 0;
}
</style>
