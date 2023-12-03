exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('user_name', 255).notNullable();
      table.string('password', 255).notNullable();
      table.integer('native_language_id').unsigned().nullable();
      table.integer('profile_id').unsigned().nullable();
      table.string('email', 255).nullable();
      table.string('name', 255).nullable();
      table.string('last_name', 255).nullable();
  
      // Claves foráneas
      table.foreign('native_language_id').references('id').inTable('languages');
      table.foreign('profile_id').references('id').inTable('profiles');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('users');
  };
  