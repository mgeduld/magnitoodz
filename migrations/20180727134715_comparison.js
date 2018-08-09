exports.up = function(knex, Promise) {
  return knex.schema.createTable('comparison', (table) => {
    table.increments()
    table
      .integer('user_id')
      .references('id')
      .inTable('user')
      .notNullable()
      .onDelete('CASCADE')
      .index()
    table.string('title'), table.string('span_1_name').notNullable()
    table.string('span_2_name').notNullable()
    table.decimal('span_1_magnitude', null).notNullable()
    table.decimal('span_2_magnitude', null).notNullable()
    table.string('unit')
    table
      .integer('rating')
      .notNullable()
      .defaultsTo(0)
    table.string('meta')
    table.text('description')
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('comparison')
}
