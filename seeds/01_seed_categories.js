exports.seed = function (knex) {
    // Inserts seed entries
    return knex('categories').insert([
      { description: 'Animals' },
      { description: 'Food' },
      { description: 'Colors' },
      { description: 'Numbers' },
      { description: 'Shapes' },
      { description: 'Clothing' },
      { description: 'Family' },
      { description: 'Weather' },
      { description: 'Jobs' },
      { description: 'Transportation' },
      { description: 'Sports' },
      { description: 'Nature' },
      { description: 'Technology' },
      { description: 'Music' },
      { description: 'Emotions' },
      { description: 'Travel' },
      { description: 'Halloween' },
      { description: 'Christmas' },
      { description: 'School' },
      { description: 'Body Parts' }
      // Agrega más datos según sea necesario
    ]);
  };
  