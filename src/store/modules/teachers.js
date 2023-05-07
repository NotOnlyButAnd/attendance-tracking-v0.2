import axios from "axios";
import mutations from "@/store/mutations";

function serializeResponse(teachers) {
  return teachers.reduce((acc, teacher) => {
    acc[teacher.user.username] = teacher;
    return acc;
  }, {});
}

const { TEACHERS } = mutations;

const teachersStore = {
  namespaced: true,
  state: {
    teachers: {},
  },
  getters: {
    teachers: (state) => state.teachers,
    getTeacherByID: (state) => (id) => {
      //return state.students.find((student) => student.id === id);
      return state.teachers[id];
    },
  },
  mutations: {
    [TEACHERS](state, value) {
      state.teachers = value;
    },
  },
  actions: {
    fetchAllTeachers({ commit }) {
      //console.log(context);
      return new Promise((resolve, reject) => {
        //commit("auth_request");
        axios({
          url: "http://192.168.0.108:7000/api/teachers/all/",
          //data: user,
          method: "GET",
        })
          .then((response) => {
            console.log("RESPONSE:", response.data);
            const teachers = serializeResponse(response.data);
            console.log(teachers);
            commit(TEACHERS, teachers);
            //console.log(this.$store.getters.teachers);
            resolve(response);
          })
          .catch((err) => {
            console.log("ERR:", err);
            reject(err);
          });
      });
    },
  },
};

export default teachersStore;
