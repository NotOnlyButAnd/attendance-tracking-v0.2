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
      <div class="container-fluid my-5">
        <router-view></router-view>
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
  },
  methods: {
    ...mapActions("movies", ["fetchMovies"]),
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
    // getUsername: function () {
    //   // let un = this.$store.getters.username;
    //   // console.log("Current username:", un);
    //   // if (un) {
    //   //   if (un.length == 0) {
    //   //     return NaN;
    //   //   } else {
    //   //     return un;
    //   //   }
    //   // } else {
    //   //   return NaN;
    //   // }
    //   //return authStore.state.username;
    // },
    getUsername() {
      // console.log(
      //   "COMPUTED username:",
      //   this.$store.state.username || localStorage.username
      // );
      // костыльно, но если есть возможность - разберись с computed
      return this.$store.state.username || localStorage.username;
      //return localStorage.username;
    },
  },
  // watch: {
  //   // eslint-disable-next-line prettier/prettier
  //   'authStore.state.username'() {
  //     //this.username = authStore.state.username;
  //     console.log(authStore.state.username);
  //   },
  // },
  created: function () {
    //console.log("CREATED!");
    this.checkAuthenticated();
    // this.$http.interceptors.response.use(
    //   function (response) {
    //     console.log("Перехваченный ответ:", response);
    //   },
    //   function (eror) {
    //     console.log("Перехваченная ошибка:", eror);
    //     // eslint-disable-next-line no-unused-vars
    //     // return new Promise(function (resolve, reject) {
    //     //   console.log("PROMISE!");
    //     //   if (
    //     //     (err.status === 401 || err.status === 403) &&
    //     //     err.config &&
    //     //     !err.config.__isRetryRequest
    //     //   ) {
    //     //     this.$store.dispatch("logout");
    //     //   }
    //     //   throw err;
    //     // });
    //   }
    // );
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
