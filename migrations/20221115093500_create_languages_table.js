exports.up = function (knex) {
    return knex.schema.createTable('languages', (table) => {
      table.increments('id').primary();
      table.string('description').notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('languages');
  };
  