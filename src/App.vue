<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand href="/">Учет посещаемости КубГУ</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav v-if="isLoggedIn">
            <b-nav-item href="/">Главная</b-nav-item>
            <b-nav-item href="/reports">Отчеты</b-nav-item>
            <!-- <b-nav-item href="/signin">Авторизация</b-nav-item> -->
            <!-- <router-link to="/reports">Отчеты</router-link> -->
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>{{ getUsername || "Пользователь" }}</em>
              </template>
              <span v-if="isLoggedIn">
                <b-dropdown-item href="/profile">Профиль</b-dropdown-item>
                <b-dropdown-item @click="logout">Выйти</b-dropdown-item>
              </span>
              <span v-else>
                <b-dropdown-item href="/signin">Авторизация</b-dropdown-item>
              </span>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <div class="container-fluid my-3">
        <router-view :username="username"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
//import authStore from "./store/index";

export default {
  name: "App",
  data() {
    return {
      username: localStorage.username || "",
    };
  },
  mounted() {
    this.fetchMovies();
    this.fetchAllStudents();
    this.fetchAllTeachers();
    this.fetchAllStudentDisciplines();
    this.fetchAllTeacherDisciplines();
    this.fetchAllVisits();
  },
  methods: {
    ...mapActions("movies", ["fetchMovies"]),
    ...mapActions("students", ["fetchAllStudents"]),
    ...mapActions("teachers", ["fetchAllTeachers"]),
    ...mapActions("studentDisciplines", ["fetchAllStudentDisciplines"]),
    ...mapActions("teacherDisciplines", ["fetchAllTeacherDisciplines"]),
    ...mapActions("visits", ["fetchAllVisits"]),
    logout: function () {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/signin");
      });
    },
    checkAuthenticated: function () {
      console.log("checking auth....");
      this.$store
        .dispatch("isAuthenticated")
        .then(() => {
          console.log("athenticated");
        })
        .catch((err) => {
          console.log("NOT athenticated");
          this.logout();
          console.log(err);
        });
    },
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
    getUsername() {
      // костыльно, но если есть возможность - разберись с computed
      return this.$store.state.username || localStorage.username;
    },
  },
  created: function () {
    //console.log("CREATED!");
    this.checkAuthenticated();
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
