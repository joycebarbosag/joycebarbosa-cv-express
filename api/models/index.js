import Sequelize from "sequelize";
import getPersonModel from "./person.js";
import getContactModel from "./contact.js";
import getAddressModel from "./address.js";

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  dialectModule: require("pg"),
});

const models = {
  Person: getPersonModel(sequelize, Sequelize),
  Contact: getContactModel(sequelize, Sequelize),
  Address: getAddressModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;