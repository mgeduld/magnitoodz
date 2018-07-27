
exports.up = function(knex, Promise) {
    return knex.schema.createTable('user', table => {
      table.increments();
      table.string('name').unique().notNullable()
      table.string('email').unique().notNullable()
      table.string('password').notNullable()
      table.string('password_reset_token')
      table.datetime('password_reset_expires')
      table.string('meta')
      table.timestamps(true, true)
    });
  };
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('user')
};
  