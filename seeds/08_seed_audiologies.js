exports.seed = function (knex) {
    return knex('audiologies').del()
      .then(function () {
        return knex('audiologies').insert([
          { id: 1, name: 'Kate', last_name: 'Suness', user_id: 3 },
          { id: 2, name: 'Laura', last_name: 'McDion', user_id: 2 },
        ]);
      });
  };
  