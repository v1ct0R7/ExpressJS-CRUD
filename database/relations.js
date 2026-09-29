const User = require("../database/tables/userList");
const Movie = require("../database/tables/movie");
const watchList = require("../database/tables/watchlist");

User.belongsToMany(Movie, {
  through: watchList,
  foreignKey: "UserId",
  otherKey: "MovieId",
  onDelete: "CASCADE",
});

Movie.belongsToMany(User, {
  through: watchList,
  foreignKey: "MovieId",
  otherKey: "UserId",
  onDelete: "CASCADE",
});

watchList.belongsTo(User, { foreignKey: "UserId" });
watchList.belongsTo(Movie, { foreignKey: "MovieId" });

module.exports = {
  User,
  Movie,
  watchList,
};
