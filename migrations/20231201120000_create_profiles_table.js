
exports.up = function (knex) {
    return knex.schema.createTable('profiles', function (table) {
      table.increments('id').primary();
      table.string('description', 255).notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('profiles');
  };
  