exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('languages')
      .del()
      .then(function () {
        // Inserts seed entries
        return knex('languages').insert([
          { description: 'English' },
          { description: 'Español' },
          { description: 'Français' },
          { description: 'Deutsch' },
          { description: 'Italiano' },
          { description: 'Português' },
        ]);
      });
  };
  