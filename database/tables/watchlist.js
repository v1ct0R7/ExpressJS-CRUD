const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const watchList = sequelize.define(
    "WatchList",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    },
    {
        timestamps: false
    });

module.exports = watchList;