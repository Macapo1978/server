exports.seed = function (knex) {
    
    return knex('phonics_sounds')
      .del()
      .then(function () {
        // Inserts seed entries
        const phonicsData = [];
        for (let i = 0; i < 26; i++) {
          const letter = String.fromCharCode(65 + i); 
          phonicsData.push({
            phonic: letter,
            image_mouth: `${letter}.jpeg`,
          });
        }
        return knex('phonics_sounds').insert(phonicsData);
      });
  };
  