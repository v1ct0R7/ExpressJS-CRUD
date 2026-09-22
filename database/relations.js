const User = require("../database/tables/userList");
const Movie = require("../database/tables/movie");
const watchList = require("../database/tables/watchlist");

User.belongsToMany(Movie, {
    through: watchList,
    onDelete: "CASCADE"

});

Movie.belongsToMany(User, {
  through: watchList,
  onDelete: "CASCADE"
});

module.exports = {
    User,
    Movie,
    watchList
};