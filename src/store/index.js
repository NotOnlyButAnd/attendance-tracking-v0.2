import Vue from "vue";
import Vuex from "vuex";
import movies from "./modules/movies";
import students from "./modules/students";
import teachers from "./modules/teachers";
import studentDisciplines from "./modules/studentDisciplines";
import teacherDisciplines from "./modules/teacherDisciplines";
import visits from "./modules/visits";
import weekTypes from "./modules/weekTypes";
import classOrders from "./modules/classOrders";
import timeTables from "./modules/timeTables";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    username: localStorage.getItem("username") || "",
    isTeacher: false,
  },
  getters: {
    //auth
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    username: (state) => state.username,
    //auth end
    isTeacher: (state) => state.isTeacher,
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
          url: process.env.VUE_APP_MY_API_URL + "token/",
          data: user,
          method: "POST",
        })
          .then((response) => {
            //console.log("RESPONSE:", response);
            //console.log("USERname:", user.username);
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
      console.log("LOGOUT...");
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        commit("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
    isAuthenticated() {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.VUE_APP_MY_API_URL + "dummy/",
          method: "GET",
        })
          .then((response) => {
            //console.log("RESPONSE (isAuthenticated):", response);
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //auth end
  },
  modules: {
    movies,
    students,
    teachers,
    studentDisciplines,
    teacherDisciplines,
    visits,
    weekTypes,
    classOrders,
    timeTables,
  },
});
