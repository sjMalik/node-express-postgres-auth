/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// email, password, date, is_active
exports.up = function(knex) {
  return knex.schema.createTable('users', table=> {
    table.increments(),
    table.text('email').notNullable().unique(),
    table.text('password').notNullable(),
    table.date('date').defaultTo(knex.fn.now()),
    table.boolean('is_active').defaultTo(true).notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
