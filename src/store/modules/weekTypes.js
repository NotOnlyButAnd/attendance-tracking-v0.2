import axios from "axios";
import mutations from "@/store/mutations";

function serializeResponse(weekTypes) {
  return weekTypes.reduce((acc, weekType) => {
    acc[weekType.id] = weekType;
    return acc;
  }, {});
}

const { WEEKTYPES } = mutations;

const weekTypesStore = {
  namespaced: true,
  state: {
    weekTypes: {},
  },
  getters: {
    weekTypes: (state) => state.weekTypes,
    getWeekTypeByID: (state) => (id) => {
      //return state.students.find((student) => student.id === id);
      return state.weekTypes[id];
    },
  },
  mutations: {
    [WEEKTYPES](state, value) {
      state.weekTypes = value;
    },
  },
  actions: {
    fetchAllWeekTypes({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.VUE_APP_MY_API_URL + "week-types/all/",
          method: "GET",
        })
          .then((response) => {
            //console.log("RESPONSE:", response.data);
            const weekTypes = serializeResponse(response.data);
            commit(WEEKTYPES, weekTypes);
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

export default weekTypesStore;
