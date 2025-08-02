import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import express from "express";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolver.js";
import connectDB from "./lib/db.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
if (process.env.NODE_ENV !== "production") {
  config();
}
const app = express();
const startSever = async () => {
  await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  // const { url } = await startStandaloneServer(server, {
  //   context: ({ req }) => {
  //     const auth_header = req.headers.authorization || "";
  //     const access_token = auth_header.replace("Bearer ", "");
  //     try {
  //       const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
  //       return { _id: decoded._id };
  //     } catch (err) {
  //       return { _id: null };
  //     }
  //   },
  //   listen: { port: 4000 },
  // });
  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth_header = req.headers.authorization || "";
        const access_token = auth_header.replace("Bearer ", "");
        try {
          const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
          return { _id: decoded._id };
        } catch (err) {
          return { _id: null };
        }
      },
    })
  );

  app.listen(4000, () => {
    console.log("Server ready at http://localhost:4000/graphql");
  });
};

startSever();
