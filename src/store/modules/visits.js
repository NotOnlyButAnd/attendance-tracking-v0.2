import axios from "axios";
import mutations from "@/store/mutations";

function serializeResponse(visits) {
  return visits.reduce((acc, visit) => {
    acc[visit.id + "-" + visit.studentDiscipline.student.user.username] = visit;
    return acc;
  }, {});
}

const { VISITS } = mutations;

const visitsStore = {
  namespaced: true,
  state: {
    visits: {},
  },
  getters: {
    visits: (state) => state.visits,
    getvisitsByID: (state) => (id) => {
      //return state.students.find((student) => student.id === id);
      const currVis = {};
      for (let vis of Object.entries(state.visits)) {
        if (vis[0].indexOf(id) >= 0) {
          currVis[vis[0]] = vis[1];
        }
      }
      return currVis;
    },
  },
  mutations: {
    [VISITS](state, value) {
      state.visits = value;
    },
  },
  actions: {
    fetchAllvisits({ commit }) {
      //console.log(context);
      return new Promise((resolve, reject) => {
        //commit("auth_request");
        axios({
          url: process.env.VUE_APP_MY_API_URL + "visits/all/",
          //data: user,
          method: "GET",
        })
          .then((response) => {
            //console.log("RESPONSE:", response.data);
            const visits = serializeResponse(response.data);
            //console.log(studentDisciplines);
            commit(VISITS, visits);
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

export default visitsStore;
