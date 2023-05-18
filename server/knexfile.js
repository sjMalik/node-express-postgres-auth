// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'postgresql',
    connection: 'postgres://postgres:mysecretpassword@localhost/express_auth',
    pool: {
      min: 2,
      max: 10
    }
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL + '?ssl=true',
    pool: {
      min: 2,
      max: 10
    }
  }

};
