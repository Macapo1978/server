exports.seed = async function (knex) {
    await knex('words').where('language_id', 1).del();
  
    const animalsData = [
      { word: 'elephant', syllables: 3, language_id: 1 },
      { word: 'lion', syllables: 2, language_id: 1 },
      { word: 'giraffe', syllables: 2, language_id: 1 },
      { word: 'tiger', syllables: 2, language_id: 1 },
      { word: 'zebra', syllables: 2, language_id: 1 },
      { word: 'monkey', syllables: 2, language_id: 1 },
      { word: 'kangaroo', syllables: 3, language_id: 1 },
      { word: 'penguin', syllables: 2, language_id: 1 },
      { word: 'hippopotamus', syllables: 5, language_id: 1 },
      { word: 'cat', syllables: 1, language_id: 1 },
    ];

    await knex('words').insert(animalsData);
  };
  