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
    getWeekTypeByDT: (state) => (dt) => {
      //return state.students.find((student) => student.id === id);
      for (let key in state.weekTypes) {
        let tDtBegStr = state.weekTypes[key].dtBegin;
        let tDtBeg = new Date(tDtBegStr + "T00:00:00");
        let tDtEndStr = state.weekTypes[key].dtEnd;
        let tDtEnd = new Date(tDtEndStr + "T23:59:59");
        // let tDt = new Date(dtStr + "T00:00:00");
        console.log("dtBeg: ", tDtBeg, " dtEnd: ", tDtEnd, "currDt: ", dt);
        if (dt >= tDtBeg && dt <= tDtEnd) {
          return state.weekTypes[key].type;
        }
      }
      return 0;
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
