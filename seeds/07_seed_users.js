exports.seed = function (knex) {
    return knex('users').del()
      .then(function () {
        return knex('users').insert([
          { id: 1, user_name: 'hlopez', password: '123', native_language_id: 2, profile_id: 4, email: 'test@gmail.com', name: 'Hernan', last_name: 'Lopez' },
          { id: 2, user_name: 'testing', password: '123', native_language_id: 2, profile_id: 1, email: 'mmmm@gmail.com' },
          { id: 3, user_name: 'testing', password: '123', native_language_id: 4, profile_id: 1, email: 'mmmm@gmail.com', name: 'Maximilian', last_name: 'Müller' },
          { id: 4, user_name: 'flaurant', password: '123', native_language_id: 3, profile_id: 4, email: 'mm@gmail.com', name: 'Francis', last_name: 'Laurant' },
          { id: 5, user_name: 'mmuller', password: '123', native_language_id: 4, profile_id: 4, email: 'mm@gmail.com', name: 'Maximilian', last_name: 'Müller' },
        ]);
      });
  };
  