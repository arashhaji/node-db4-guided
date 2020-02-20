
exports.up = function(knex) {
  return knex.schema.createTable('zoos', tbl => {
      tbl.increments();
      tbl.string('zoo_name', 128).notNullable();
      tbl.string('address', 128).notNullable().unique();
  })
  .createTable('species', tbl => {
    tbl.increments();
    tbl.string('species_name', 128).notNullable().unique();
  })
  .createTable('animals', tbl => {
    tbl.increments();
    tbl.string('animal_name', 128).notNullable();
    tbl.integer('species_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('species');
  })
  .createTable('zoo_animals', tbl => {
    tbl.integer('zoo_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('zoos');
    tbl.integer('animal_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('animals');
    tbl.primary(['zoo_id', 'animal_id']);
  });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('zoo_animals')
    .dropTableIfExists('animals')
    .dropTableIfExists('species')
    .dropTableIfExists('zoos');
};
