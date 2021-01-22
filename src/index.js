// import express from "express";
// import { success, error } from "consola";
// import { PORT, IN_PROD } from "./config";
// import { gql, ApolloServer } from "apollo-server-express";
// import { resolvers, typeDefs } from "./graphql";
// import * as AppModels from "./models";

// const { sequelize } = require("./models");

// const app = express();

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   playground: IN_PROD,
//   context: { ...AppModels },
// });

// const startApp = async () => {
//   await sequelize
//     .sync({ force: false })
//     .then(() => {
//       console.log("데이터베이스 연결 성공");
//     })
//     .catch((err) => {
//       console.error(err);
//     });
//   server.applyMiddleware({ app });

//   app.listen(PORT, () =>
//     success({
//       badge: true,
//       message: `Server started on ${PORT}`,
//     })
//   );
// };

// startApp();
