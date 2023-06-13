import axios from "axios";
import mutations from "@/store/mutations";

function serializeResponse(validateQRs) {
  return validateQRs.reduce((acc, validateQR) => {
    acc[validateQR.id] = validateQR;
    return acc;
  }, {});
}

const { VALIDATEQRS } = mutations;

const validateQRsStore = {
  namespaced: true,
  state: {
    validateQRs: {},
  },
  getters: {
    validateQRs: (state) => state.validateQRs,
    validateQRByID: (state) => (id) => {
      return state.validateQRs[id];
    },
  },
  mutations: {
    [VALIDATEQRS](state, value) {
      state.validateQRs = value;
    },
  },
  actions: {
    fetchAllValidateQRs({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.VUE_APP_MY_API_URL + "validate-qr/all/",
          method: "GET",
        })
          .then((response) => {
            //console.log("RESPONSE:", response.data);
            const validateQRs = serializeResponse(response.data);
            commit(VALIDATEQRS, validateQRs);
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

export default validateQRsStore;
