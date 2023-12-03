
exports.up = function (knex) {
    return knex.schema.createTable('quiz_word', function (table) {
      table.integer('quiz_id').unsigned().notNullable();
      table.integer('word_id').unsigned().notNullable();
  
      // Primary key
      table.primary(['quiz_id', 'word_id']);
  
      // Foreign keys with cascading deletes
      table.foreign('quiz_id').references('id').inTable('quizzes').onDelete('CASCADE');
      table.foreign('word_id').references('id').inTable('words').onDelete('CASCADE');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('quiz_word');
  };
  