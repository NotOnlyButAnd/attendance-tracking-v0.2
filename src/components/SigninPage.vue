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
          type="text"
          id="password"
          placeholder="Пароль..."
          class="mb-2"
        ></b-input>
      </div>
      <b-button variant="primary">Войти</b-button>
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
    };
  },
  methods: {
    login(event) {
      event.preventDefault();

      // логика авторизации
      this.axios
        .post(`http://localhost:7000/api/auth/token/`, {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          this.setLogined(response.data.token);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setLogined(token) {
      // сохраняем токен
      console.log(token);
    },
  },
};
</script>
