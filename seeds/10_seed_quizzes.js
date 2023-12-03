exports.seed = function (knex) {
    return knex('quizzes').del()
      .then(function () {
        return knex('quizzes').insert([
          { id: 3, name: 'Animals', description: 'five animals', createdUser_id: 2 },
          { id: 4, name: 'Food', description: 'Some food', createdUser_id: 2 },
          { id: 5, name: 'Colors', description: 'Primary colors', createdUser_id: 2 },
          { id: 6, name: 'Fruits', description: 'Fruits', createdUser_id: 2 },
          { id: 7, name: 'Body parts', description: 'Body parts', createdUser_id: 2 },
          { id: 8, name: 'Winter clothes', description: 'Winter clothes', createdUser_id: 2 },
          { id: 9, name: 'Sports', description: 'Sports', createdUser_id: 2 },
          { id: 10, name: 'Vegetables', description: 'Vegetables', createdUser_id: 2 },
        ]);
      });
  };
  