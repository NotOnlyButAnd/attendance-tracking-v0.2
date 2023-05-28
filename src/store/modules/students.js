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
    studentsSt: {},
    someVal: 1,
    studs: {
      s01234: { name: "Kirill", LastName: "Minin" },
      s01235: { name: "GAGsg", LastName: "AGASGASG" },
    },
  },
  getters: {
    studentsSt: (state) => state.studentsSt,
    getStudentByID: (state) => (id) => {
      //return state.students.find((student) => student.id === id);
      //console.log("student getter:", state.students[id]);
      // console.log(`Get Students by ID (${id}): `, state);
      // console.log(`TEST Get Students by ID: `, state["students"]);
      // console.log(`return Get Students by ID (${id}): `, state.students[id]);
      return state.studentsSt[id];
    },
  },
  mutations: {
    [STUDENTS](state, value) {
      state.studentsSt = value;
    },
  },
  actions: {
    fetchAllStudents({ commit }) {
      //console.log(context);
      return new Promise((resolve, reject) => {
        //commit("auth_request");
        axios({
          url: process.env.VUE_APP_MY_API_URL + "students/all/",
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
