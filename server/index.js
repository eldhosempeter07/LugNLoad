import express from "express";
import {} from "./models/db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { resolvers } from "./graphql/resolvers/resolvers.js";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cors from "cors";

dotenv.config();
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const typeDefs = fs.readFileSync(
  path.join(__dirname, "graphql/schemas/schema.graphql"),
  "utf-8"
);

app.use(cors());

const userContext = ({ req }) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1] || "";
    try {
      console.log(token);
      const user = jwt.verify(token, process.env.JWT_SECRET);
      console.log(user);
      return { user };
    } catch (err) {
      return err;
    }
  }
  return {};
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: userContext,
  cache: "bounded",
});

server.start().then(function () {
  server.applyMiddleware({ app, path: "/graphql", cors: true });
});

const port = process.env.PORT || 3002;
// Start listening
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
