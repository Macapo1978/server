exports.seed = function (knex) {
    return knex('profiles').del()
      .then(function () {
        return knex('profiles').insert([
          { id: 1, description: 'Audiology' },
          { id: 2, description: 'Educator' },
          { id: 3, description: 'Parent' },
          { id: 4, description: 'Patient' },
        ]);
      });
  };
  