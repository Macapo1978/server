
exports.up = function (knex) {
    return knex.schema.createTable('patients_audiologies', function (table) {
      table.integer('patient_id').unsigned().notNullable();
      table.integer('audiology_id').unsigned().notNullable();
  
      // Primary key
      table.primary(['patient_id', 'audiology_id']);
  
      // Foreign keys with cascading deletes
      table.foreign('patient_id').references('id').inTable('patients').onDelete('CASCADE');
      table.foreign('audiology_id').references('id').inTable('audiologies');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('patients_audiologies');
  };
  