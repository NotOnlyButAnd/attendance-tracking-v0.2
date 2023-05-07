import axios from "axios";
import mutations from "@/store/mutations";

function serializeResponse(students) {
  return students.reduce((acc, student) => {
    acc[student.user.username] = student;
    return acc;
  }, {});
}

const { STUDENTS } = mutations;

const studentsStore = {
  namespaced: true,
  state: {
    students: {},
  },
  getters: {
    students: (state) => state.students,
    getStudentByID: (state) => (id) => {
      //return state.students.find((student) => student.id === id);
      return state.students[id];
    },
  },
  mutations: {
    [STUDENTS](state, value) {
      state.students = value;
    },
  },
  actions: {
    fetchAllStudents({ commit }) {
      //console.log(context);
      return new Promise((resolve, reject) => {
        //commit("auth_request");
        axios({
          url: "http://192.168.0.108:7000/api/students/all/",
          //data: user,
          method: "GET",
        })
          .then((response) => {
            //console.log("RESPONSE:", response.data);
            const students = serializeResponse(response.data);
            //console.log(students);
            commit(STUDENTS, students);
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

export default studentsStore;
