// 01_categories_seed.js

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        { id: 1, description: 'Animals' },
        { id: 2, description: 'Food' },
        { id: 3, description: 'Colors' },
        { id: 4, description: 'Numbers' },
        { id: 5, description: 'Shapes' },
        { id: 6, description: 'Clothing' },
        { id: 7, description: 'Family' },
        { id: 8, description: 'Weather' },
        { id: 9, description: 'Jobs' },
        { id: 10, description: 'Transportation' },
        { id: 11, description: 'Sports' },
        { id: 12, description: 'Nature' },
        { id: 13, description: 'Technology' },
        { id: 14, description: 'Music' },
        { id: 15, description: 'Emotions' },
        { id: 16, description: 'Travel' },
        { id: 17, description: 'Halloween' },
        { id: 18, description: 'Christmas' },
        { id: 19, description: 'School' },
        { id: 20, description: 'Body Parts' },
        { id: 21, description: 'Autumn' },
      ]);
    });
};
