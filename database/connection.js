const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  database: "crud",
  username: "root",
  password: "Merimanga123",
  host: "localhost",
  port: 3306,
});

async function connection() {
  try {
    await sequelize.authenticate();
    console.log("Connected");
  } catch (error) {
    console.log("error in connection", error);
  }
}

connection();

module.exports = sequelize;
