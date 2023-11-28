import { Sequelize } from "sequelize";

const sequelize = new Sequelize("postgres", "postgres", "admin", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

export const dbConnect = async () => {
  try {
    sequelize.authenticate();
    console.log("DB Connected");
  } catch (error) {
    console.log("something went wrong");
  }
};

export default sequelize;
