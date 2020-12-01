require('dotenv').config;


const defaults = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./database/dev.sqlite"
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: { directory: "./database/seeds" },
    useNullAsDefault: true,
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: { directory: "./database/seeds" },
  },
};

module.exports = defaults;
