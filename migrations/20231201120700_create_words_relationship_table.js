
exports.up = function (knex) {
    return knex.schema.createTable('words_relationship', function (table) {
      table.increments('id').primary();
      table.integer('word_first_id').unsigned().nullable();
      table.integer('word_second_id').unsigned().nullable();
  
      // Foreign keys
      table.foreign('word_first_id').references('id').inTable('words');
      table.foreign('word_second_id').references('id').inTable('words');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('words_relationship');
  };
  