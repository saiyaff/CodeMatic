import errors from "../ConfigErrors.js";

const config = {
  env: "DEV",
  port: 3001,
  clusteringEnabled: false,
  errors,

  DB: {
    mongodb: {
      codematics: {
        connection: 'mongodb://localhost:27017/codematics',
      },
    },
  },

  dataModel: {
    collection: {
      chat: "chat",
    },
  },
};

export default config;
