exports.up = function(knex) {
    return knex.schema.createTable('phonics_sounds', function(table) {
      table.increments('id').primary();
      table.string('phonic').notNullable();
      table.string('image_mouth');
      table.string('image_sound');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('phonics_sounds');
  };