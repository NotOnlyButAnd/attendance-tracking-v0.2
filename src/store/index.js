import Vue from "vue";
import Vuex from "vuex";
import movies from "./modules/movies";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    username: localStorage.getItem("username") || "",
  },
  getters: {
    //auth
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    username: (state) => state.username,
    //auth end
  },
  mutations: {
    //auth
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, username) {
      state.status = "success";
      state.token = token;
      state.username = username;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.username = "";
    },
    //auth end
  },
  actions: {
    //auth
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:7000/api/token/",
          data: user,
          method: "POST",
        })
          .then((response) => {
            console.log("RESPONSE:", response);
            console.log("USERname:", user.username);
            const token = response.data.access;
            //const user = response.data.user;
            localStorage.setItem("token", token);
            localStorage.setItem("username", user.username);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            commit("auth_success", token, user.username);
            resolve(response);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        commit("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
    //auth end
  },
  modules: {
    movies,
  },
});
