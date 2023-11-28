import express from "express";
import { dbConnect } from "./db/config.js";
import dbInit from "./db/init.js";
import allRoutes from "./router/index.js";

const app = express();
const PORT = 3300;
app.use(express.json());
app.use("/", allRoutes);

dbConnect();
dbInit()
  .then(console.log("DB Synced"))
  .catch((error) => console.log("something went wrong", error));

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`http://localhost:${PORT}`);
  } else {
    console.log("something went wrong");
  }
});
