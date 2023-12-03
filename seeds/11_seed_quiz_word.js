exports.seed = function (knex) {
    return knex('quiz_word').del()
      .then(function () {
        return knex('quiz_word').insert([
          { quiz_id: 3, word_id: 1 },
          { quiz_id: 3, word_id: 2 },
          { quiz_id: 3, word_id: 3 },
          { quiz_id: 3, word_id: 4 },
          { quiz_id: 3, word_id: 5 },
          { quiz_id: 6, word_id: 14 },
          { quiz_id: 6, word_id: 15 },
          { quiz_id: 10, word_id: 16 },
          { quiz_id: 10, word_id: 17 },
          { quiz_id: 4, word_id: 19 },
          { quiz_id: 4, word_id: 20 },
          { quiz_id: 5, word_id: 21 },
          { quiz_id: 5, word_id: 22 },
          { quiz_id: 5, word_id: 23 },
          { quiz_id: 5, word_id: 24 },
          { quiz_id: 5, word_id: 25 },
          { quiz_id: 6, word_id: 30 },
          { quiz_id: 6, word_id: 31 },
          { quiz_id: 6, word_id: 32 },
          { quiz_id: 6, word_id: 33 },
          { quiz_id: 6, word_id: 34 },
          { quiz_id: 4, word_id: 35 },
          { quiz_id: 4, word_id: 36 },
          { quiz_id: 4, word_id: 37 },
          { quiz_id: 4, word_id: 38 },
          { quiz_id: 4, word_id: 39 },
          { quiz_id: 4, word_id: 40 },
          { quiz_id: 4, word_id: 41 },
          { quiz_id: 10, word_id: 42 },
          { quiz_id: 10, word_id: 43 },
          { quiz_id: 10, word_id: 44 },
          { quiz_id: 7, word_id: 45 },
          { quiz_id: 7, word_id: 46 },
          { quiz_id: 7, word_id: 47 },
          { quiz_id: 7, word_id: 48 },
          { quiz_id: 7, word_id: 49 },
          { quiz_id: 7, word_id: 50 },
          { quiz_id: 7, word_id: 51 },
          { quiz_id: 8, word_id: 52 },
          { quiz_id: 8, word_id: 53 },
          { quiz_id: 8, word_id: 54 },
          { quiz_id: 8, word_id: 55 },
          { quiz_id: 8, word_id: 56 },
          { quiz_id: 8, word_id: 57 },
          { quiz_id: 9, word_id: 58 },
          { quiz_id: 9, word_id: 59 },
          { quiz_id: 9, word_id: 60 },
          { quiz_id: 9, word_id: 61 },
          { quiz_id: 9, word_id: 62 },
        ]);
      });
  };
  