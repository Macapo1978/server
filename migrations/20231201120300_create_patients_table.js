
exports.up = function (knex) {
    return knex.schema.createTable('patients', function (table) {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.string('last_name', 255).notNullable();
      table.integer('user_id').unsigned().nullable();
  
      // Clave foránea con eliminación en cascada (ON DELETE CASCADE)
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('patients');
  };
  