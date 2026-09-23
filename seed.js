require("dotenv").config();

const sequelize = require("./database/connection");

const User = require("./database/tables/userList");
const Movie = require("./database/tables/movie");
const WatchList = require("./database/tables/watchlist");

require("./database/relations");

const bcrypt = require("bcrypt");

const seedDatabase = async () => {
  try {
    console.log("Starting database seed...");

    // 1. Sync database
    await sequelize.sync({ force: true });

    console.log("Database tables created.");

    // 2. Create users
    const hashedPassword = await bcrypt.hash("123456", 10);

    const users = await User.bulkCreate([
      {
        username: "John",
        lastname: "Doe",
        email: "john@example.com",
        password: hashedPassword,
      },
      {
        username: "Alice",
        lastname: "Smith",
        email: "alice@example.com",
        password: hashedPassword,
      },
      {
        username: "Michael",
        lastname: "Brown",
        email: "michael@example.com",
        password: hashedPassword,
      },
      {
        username: "Emma",
        lastname: "Wilson",
        email: "emma@example.com",
        password: hashedPassword,
      },
      {
        username: "Daniel",
        lastname: "Taylor",
        email: "daniel@example.com",
        password: hashedPassword,
      },
      {
        username: "Sophia",
        lastname: "Anderson",
        email: "sophia@example.com",
        password: hashedPassword,
      },
      {
        username: "James",
        lastname: "Thomas",
        email: "james@example.com",
        password: hashedPassword,
      },
      {
        username: "Olivia",
        lastname: "Moore",
        email: "olivia@example.com",
        password: hashedPassword,
      },
      {
        username: "William",
        lastname: "Jackson",
        email: "william@example.com",
        password: hashedPassword,
      },
      {
        username: "Emily",
        lastname: "Martin",
        email: "emily@example.com",
        password: hashedPassword,
      },
    ]);

    console.log(`${users.length} users created.`);

    // 3. Create movies
    const movies = await Movie.bulkCreate([
      {
        title: "Inception",
        description:
          "A skilled thief enters people's dreams to steal and manipulate information.",
        genre: "Science Fiction",
        year: 2010,
        image:
          "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
      },
      {
        title: "The Dark Knight",
        description:
          "Batman faces the Joker, a criminal mastermind who creates chaos in Gotham City.",
        genre: "Action",
        year: 2008,
        image:
          "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      },
      {
        title: "Interstellar",
        description:
          "A group of astronauts travels through a wormhole searching for a new home for humanity.",
        genre: "Science Fiction",
        year: 2014,
        image:
          "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      },
      {
        title: "The Shawshank Redemption",
        description:
          "A banker sentenced to life in prison builds an unexpected friendship and finds hope.",
        genre: "Drama",
        year: 1994,
        image: "https://image.tmdb.org/t/p/w500/lyQBXzOQTgYOUtWSHk4lA3bZfT.jpg",
      },
      {
        title: "The Matrix",
        description:
          "A computer programmer discovers that reality is not what it seems.",
        genre: "Science Fiction",
        year: 1999,
        image:
          "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
      },
      {
        title: "Gladiator",
        description:
          "A Roman general seeks revenge after being betrayed and losing his family.",
        genre: "Action",
        year: 2000,
        image:
          "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
      },
      {
        title: "Forrest Gump",
        description:
          "A kind-hearted man experiences major historical events throughout his extraordinary life.",
        genre: "Drama",
        year: 1994,
        image:
          "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      },
      {
        title: "The Godfather",
        description:
          "The aging patriarch of a powerful crime family prepares his son to take over the empire.",
        genre: "Crime",
        year: 1972,
        image:
          "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      },
      {
        title: "Parasite",
        description:
          "A struggling family becomes involved with a wealthy household in an unexpected way.",
        genre: "Thriller",
        year: 2019,
        image:
          "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
      },
      {
        title: "Avengers: Endgame",
        description:
          "The Avengers attempt to reverse the devastating consequences of Thanos' actions.",
        genre: "Action",
        year: 2019,
        image:
          "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
      },
    ]);

    console.log(`${movies.length} movies created.`);

    // 4. Create WatchList relationships

    await users[0].addMovies([movies[0], movies[2]]);
    await users[1].addMovies([movies[1], movies[4]]);
    await users[2].addMovies([movies[3], movies[6]]);
    await users[3].addMovie(movies[5]);
    await users[4].addMovie(movies[7]);
    await users[5].addMovie(movies[8]);
    await users[6].addMovie(movies[9]);

    console.log("WatchList relationships created.");

    console.log("Database seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedDatabase();
