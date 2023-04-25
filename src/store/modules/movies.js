import IDs from "@/store/mock/OMDB_250";
import axios from "@/plugins/axios";

const moviesStore = {
  namespaced: true,
  state: {
    top250IDS: IDs,
  },
  getters: {},
  mutations: {},
  actions: {
    async fetchMovies(context) {
      console.log(context);
      // tt0111161 - id фильма какого-то
      const response = await axios.get("/", {
        params: {
          i: "tt0111161",
        },
      });
      console.log(response);
    },
  },
};

export default moviesStore;
