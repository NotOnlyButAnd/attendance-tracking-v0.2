import axios from "axios";
import mutations from "@/store/mutations";

function serializeResponse(timeTables) {
  return timeTables.reduce((acc, timeTable) => {
    acc[timeTable.id] = timeTable;
    return acc;
  }, {});
}

const { TIMETABLES } = mutations;

const timeTablesStore = {
  namespaced: true,
  state: {
    timeTables: {},
  },
  getters: {
    timeTables: (state) => state.timeTables,
    ctimeTableByID: (state) => (id) => {
      return state.timeTables[id];
    },
    /*getClassOrderByTime: (state) => (tm) => {
      //return state.students.find((student) => student.id === id);
      for (let key in state.classOrders) {
        let tStr = state.classOrders[key].timeBegin;
        // console.log(
        //   "tBeg: ",
        //   tStr.substring(0, 2),
        //   " -> ",
        //   Number(tStr.substring(0, 2))
        // );
        let tTimeBeg = new Date();
        let tHour = Number(tStr.substring(0, 2));
        let tMin = Number(tStr.substring(3, 5));
        tTimeBeg.setHours(
          tHour, // == 11 ? tHour - 1 : tHour,  // это не нужно теперь, он сам при -20 отнимает час
          tHour == 11 ? tMin - 20 : tMin - 10, // -10 чтобы если что и переменки захватить, -20 - переменка большая
          0
        );
        tStr = state.classOrders[key].timeEnd;
        let tTimeEnd = new Date();
        tTimeEnd.setHours(
          Number(tStr.substring(0, 2)),
          Number(tStr.substring(3, 5)),
          0
        );
        console.log(
          "timeBeg: ",
          tTimeBeg,
          " timeEnd: ",
          tTimeEnd,
          "currTime: ",
          tm
        );
        if (tm >= tTimeBeg && tm <= tTimeEnd) {
          return state.classOrders[key];
        }
      }
      return {
        id: null,
        number: null,
        timeBegin: "00:00:00",
        timeEnd: "00:00:00",
      };
    },*/
  },
  mutations: {
    [TIMETABLES](state, value) {
      state.timeTables = value;
    },
  },
  actions: {
    fetchAllTimeTables({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.VUE_APP_MY_API_URL + "time-tables/all/",
          method: "GET",
        })
          .then((response) => {
            //console.log("RESPONSE:", response.data);
            const timeTables = serializeResponse(response.data);
            commit(TIMETABLES, timeTables);
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

export default timeTablesStore;
