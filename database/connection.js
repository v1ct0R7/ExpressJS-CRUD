const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  database: "signup",
  username: "root",
  password: "Merimanga123",
  host: "localhost",
  port: 3306,
});

async function connection() {
    try {
        await sequelize.authenticate();
        console.log("me sukses")
    }
    catch (error) {
        throw new Error("Lidhja deshtoi" + error.message)
    }
};

connection();
 
module.exports = sequelize;