import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolver.js";
import connectDB from "./lib/db.js";
import jwt from "jsonwebtoken";

const startSever = async () => {
  await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    context: ({ req }) => {
      const auth_header = req.headers.authorization || "";
      const access_token = auth_header.replace("Bearer ", "");
      try {
        const decoded = jwt.verify(access_token, "mysecrete");
        return { _id: decoded._id };
      } catch (err) {
        return { _id: null };
      }
    },
    listen: { port: 4000 },
  });

  console.log(`Server ready at Port  ${url}`);
};

startSever();
