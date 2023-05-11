import axios from "axios";
import mutations from "@/store/mutations";

function serializeResponse(teacherDisciplines) {
  return teacherDisciplines.reduce((acc, teacherDiscipline) => {
    acc[teacherDiscipline.id + "-" + teacherDiscipline.teacher.user.username] =
      teacherDiscipline;
    return acc;
  }, {});
}

const { TEACHERTDISCIPLINES } = mutations;

const teacherDisciplinesStore = {
  namespaced: true,
  state: {
    teacherDisciplines: {},
  },
  getters: {
    teacherDisciplines: (state) => state.teacherDisciplines,
    getTeacherDisciplinesByID: (state) => (id) => {
      //return state.students.find((student) => student.id === id);
      const currDisc = {};
      for (let teacherDisc of Object.entries(state.teacherDisciplines)) {
        if (teacherDisc[0].indexOf(id) >= 0) {
          currDisc[teacherDisc[0]] = teacherDisc[1];
        }
      }
      return currDisc;
    },
  },
  mutations: {
    [TEACHERTDISCIPLINES](state, value) {
      state.teacherDisciplines = value;
    },
  },
  actions: {
    fetchAllTeacherDisciplines({ commit }) {
      //console.log(context);
      return new Promise((resolve, reject) => {
        //commit("auth_request");
        axios({
          url: process.env.VUE_APP_MY_API_URL + "teacher-disciplines/all/",
          //data: user,
          method: "GET",
        })
          .then((response) => {
            //console.log("RESPONSE:", response.data);
            const teacherDisciplines = serializeResponse(response.data);
            //console.log(studentDisciplines);
            commit(TEACHERTDISCIPLINES, teacherDisciplines);
            //console.log(this.$store.getters.students);
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

export default teacherDisciplinesStore;
