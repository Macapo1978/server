
exports.up = function (knex) {
    return knex.schema.createTable('word_category', function (table) {
      table.integer('word_id').unsigned().notNullable();
      table.integer('category_id').unsigned().notNullable();
  
      // Primary key
      table.primary(['word_id', 'category_id']);
  
      // Foreign keys
      table.foreign('category_id').references('id').inTable('categories');
      table.foreign('word_id').references('id').inTable('words').onDelete('CASCADE');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('word_category');
  };
  