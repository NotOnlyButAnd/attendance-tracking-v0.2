<template>
  <div class="w-25 mx-auto border p-3 rounded">
    <b-form @submit="login">
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
      <div v-if="isErrAuthorized" class="errMsg">Неверный логин\пароль!</div>
      <b-button type="submit" variant="primary">Войти</b-button>
    </b-form>
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
    login(event) {
      console.log("Clicked on 'Войти'", this.username, this.password);

      event.preventDefault();

      // логика авторизации
      this.axios
        .post(`http://127.0.0.1:7000/api/token/`, {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          console.log("response:", response);
          this.setLogined(response.data.access);
        })
        .catch((err) => {
          err.response.status === 401
            ? (this.isErrAuthorized = true)
            : (this.isErrAuthorized = false);
          console.log(err);
        });
    },
    setLogined(token) {
      // сохраняем токен
      console.log(token);
      localStorage.setItem("token", token);
    },
  },
};
</script>

<style>
.errMsg {
  color: red;
}
</style>
