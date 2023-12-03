
exports.up = function (knex) {
    return knex.schema.createTable('quizzes', function (table) {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.string('description', 255).notNullable();
      table.integer('createdUser_id').unsigned().nullable();
  
      // Foreign key
      table.foreign('createdUser_id').references('id').inTable('audiologies');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('quizzes');
  };
  