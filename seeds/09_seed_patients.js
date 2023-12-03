exports.seed = function (knex) {
    return knex('patients').del()
      .then(function () {
        return knex('patients').insert([
          { id: 7, name: 'Hernan', last_name: 'Lopez', user_id: 1 },
          { id: 8, name: 'Francis', last_name: 'Laurant', user_id: 4 },
          { id: 9, name: 'Maximilian', last_name: 'Müller', user_id: 5 },
        ]);
      });
  };
  