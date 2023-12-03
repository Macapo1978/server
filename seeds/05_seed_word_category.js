exports.seed = function (knex) {
    return knex('word_category').del()
      .then(function () {
        return knex('word_category').insert([
          { word_id: 1, category_id: 1 },
          { word_id: 2, category_id: 1 },
          { word_id: 3, category_id: 1 },
          { word_id: 4, category_id: 1 },
          { word_id: 5, category_id: 1 },
          { word_id: 6, category_id: 1 },
          { word_id: 7, category_id: 1 },
          { word_id: 8, category_id: 1 },
          { word_id: 9, category_id: 1 },
          { word_id: 10, category_id: 1 },
          { word_id: 12, category_id: 1 },
        ]);
      });
  };
  