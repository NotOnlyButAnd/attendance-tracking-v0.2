const { defineConfig } = require("@vue/cli-service");
const fs = require("fs");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    https: {
      key: fs.readFileSync("./src/certs/key.pem"),
      cert: fs.readFileSync("./src/certs/cert.pem"),
    },
    // public: "https://192.168.0.105:8080/",
  },
});
