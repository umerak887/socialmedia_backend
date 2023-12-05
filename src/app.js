import "dotenv/config";
import express from "express";
import { dbConnect } from "./db/config.js";
import dbInit from "./db/init.js";
import allRoutes from "./router/index.js";
import sequelize from "./db/config.js";
import Session from "express-session";
import SequelizeStore from "connect-session-sequelize";

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

dbConnect();

const sequelizeStore = new SequelizeStore(Session.Store);
const mySequelizeStore = new sequelizeStore({
  db: sequelize,
});

app.use(
  Session({
    secret: process.env.SESSION_SECRET,
    store: mySequelizeStore,
    saveUninitialized: false,
    resave: true,
    proxy: false,
  })
);
mySequelizeStore.sync();

dbInit()
  .then(console.log("DB Synced"))
  .catch((error) => console.log("something went wrong", error));

app.use("/", allRoutes);
app.listen(PORT, (error) => {
  if (!error) {
    console.log(`http://localhost:${PORT}`);
  } else {
    console.log("something went wrong");
  }
});
