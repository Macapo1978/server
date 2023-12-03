
exports.up = function (knex) {
    return knex.schema.createTable('quiz_user', function (table) {
      table.integer('quiz_id').unsigned().notNullable();
      table.integer('user_id').unsigned().notNullable();
      table.string('point', 10).nullable();
      table.timestamp('completed_date').nullable();
  
      // Primary key
      table.primary(['quiz_id', 'user_id']);
  
      // Foreign keys with cascading deletes
      table.foreign('quiz_id').references('id').inTable('quizzes').onDelete('CASCADE');
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('quiz_user');
  };
  