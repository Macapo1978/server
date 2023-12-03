exports.up = function (knex) {
    return knex.schema.createTable('audiologies', function (table) {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.string('last_name', 255).notNullable();
      table.integer('user_id').unsigned().nullable();
  
      // Clave foránea
      table.foreign('user_id').references('id').inTable('users');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('audiologies');
  };
  