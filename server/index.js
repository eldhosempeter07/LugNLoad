import express from "express";
import {} from "./models/db.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { resolvers } from "./graphql/resolvers/resolvers.js";
import { ApolloServer } from "apollo-server-express";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const typeDefs = fs.readFileSync(
  path.join(__dirname, "graphql/schemas/schema.graphql"),
  "utf-8"
);

const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(function () {
  // default cors true
  server.applyMiddleware({ app, path: "/graphql", cors: true });
});

const port = process.env.PORT || 3002;
// Start listening
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
