import axios from "axios";
import mutations from "@/store/mutations";

function serializeResponse(studentDisciplines) {
  return studentDisciplines.reduce((acc, studentDiscipline) => {
    acc[studentDiscipline.id + "-" + studentDiscipline.student.user.username] =
      studentDiscipline;
    return acc;
  }, {});
}

const { STUDENTDISCIPLINES } = mutations;

const studentDisciplinesStore = {
  namespaced: true,
  state: {
    studentDisciplines: {},
  },
  getters: {
    studentDisciplines: (state) => state.studentDisciplines,
    getStudentDisciplinesByID: (state) => (id) => {
      //return state.students.find((student) => student.id === id);
      const currDisc = {};
      for (let studentDisc of Object.entries(state.studentDisciplines)) {
        if (studentDisc[0].indexOf(id) >= 0) {
          currDisc[studentDisc[0]] = studentDisc[1];
        }
      }
      return currDisc;
    },
  },
  mutations: {
    [STUDENTDISCIPLINES](state, value) {
      state.studentDisciplines = value;
    },
  },
  actions: {
    fetchAllStudentDisciplines({ commit }) {
      //console.log(context);
      return new Promise((resolve, reject) => {
        //commit("auth_request");
        axios({
          url: "http://192.168.0.108:7000/api/student-disciplines/all/",
          //data: user,
          method: "GET",
        })
          .then((response) => {
            //console.log("RESPONSE:", response.data);
            const studentDisciplines = serializeResponse(response.data);
            //console.log(studentDisciplines);
            commit(STUDENTDISCIPLINES, studentDisciplines);
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

export default studentDisciplinesStore;
