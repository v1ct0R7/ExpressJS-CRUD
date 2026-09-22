const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Movie = sequelize.define(
    "Movie",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },

        genre: {
            type: DataTypes.STRING
        },

        year: {
            type: DataTypes.INTEGER
        },

        image: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: false
    });

module.exports = Movie;