import express from "express";
import {} from "./models/db.js";

const app = express();

const port = process.env.PORT || 3002;
// Start listeningH
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
