exports.up = function (knex) {
    return knex.schema.createTable('words', function (table) {
      table.increments('id').primary();
      table.string('word', 255).notNullable();
      table.integer('language_id').unsigned().nullable();
      table.integer('start_phonics_sounds_id').unsigned().nullable();
      table.integer('middle_phonics_sounds_id').unsigned().nullable();
      table.integer('end_phonics_sounds_id').unsigned().nullable();
      table.integer('syllables').nullable();
  
      // Foreign keys with cascading deletes
      table.foreign('language_id').references('id').inTable('languages').onDelete('CASCADE');
      table.foreign('start_phonics_sounds_id').references('id').inTable('phonics_sounds').onDelete('CASCADE');
      table.foreign('middle_phonics_sounds_id').references('id').inTable('phonics_sounds').onDelete('CASCADE');
      table.foreign('end_phonics_sounds_id').references('id').inTable('phonics_sounds').onDelete('CASCADE');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('words');
  };
  