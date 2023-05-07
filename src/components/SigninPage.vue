<template>
  <div class="w-50 mx-auto border p-3 rounded">
    <b-form @submit.prevent="login">
      <div class="form-group">
        <label for="username" class="mb-2">Логин:</label>
        <b-input
          v-model="username"
          type="text"
          id="username"
          placeholder="Логин..."
          class="mb-2"
        ></b-input>
      </div>
      <div class="form-group mb-2">
        <label for="password" class="mb-2">Пароль:</label>
        <b-input
          v-model="password"
          type="password"
          id="password"
          placeholder="Пароль..."
          class="mb-2"
        ></b-input>
      </div>
      <div v-if="issErrAuth" class="errMsg">Неверный логин\пароль!</div>
      <b-button type="submit" variant="primary">Войти</b-button>
    </b-form>
    <!-- <b-button variant="outline-primary" @click="printToken">
      Токен (хранилище)
    </b-button> -->
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      username: "",
      password: "",
      isErrAuthorized: false,
    };
  },
  methods: {
    // DEPRECATED LOGIN ???
    // login(event) {
    //   console.log("Clicked on 'Войти'", this.username, this.password);

    //   event.preventDefault();

    //   // логика авторизации
    //   this.axios
    //     .post(`http://127.0.0.1:7000/api/token/`, {
    //       username: this.username,
    //       password: this.password,
    //     })
    //     .then((response) => {
    //       console.log("response:", response);
    //       this.setLogined(response.data.access);
    //       this.$router.push("/");
    //     })
    //     .catch((err) => {
    //       err.response.status === 401
    //         ? (this.isErrAuthorized = true)
    //         : (this.isErrAuthorized = false);
    //       console.log(err);
    //     });
    // },
    login: function () {
      // let username = this.username;
      // let password = this.password;
      this.$store
        .dispatch("login", { username: this.username, password: this.password })
        .then(() => {
          this.$router.push("/");
          //console.log("USER: ", this.$store.user);
        })
        .catch((err) => {
          //console.log("USER: ", this.$store.user);
          console.log(err);
        });
    },
    setLogined(token) {
      // сохраняем токен
      //console.log(token);
      localStorage.setItem("token", token);
      localStorage.setItem("username", this.username);
    },
    printToken() {
      //console.log(localStorage.token);
    },
  },
  computed: {
    issErrAuth: function () {
      console.log("status: ", this.$store.getters.authStatus);
      return this.$store.getters.authStatus == "error";
    },
  },
};
</script>

<style>
.errMsg {
  color: red;
}
</style>
