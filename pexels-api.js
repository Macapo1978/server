const axios = require('axios');

const apiKey = process.env.API_KEY;
const query = 'horse animals';
const perPage = 4;
const apiUrl = `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}`;

const headers = {
  Authorization: apiKey,
};

axios.get(apiUrl, { headers })
  .then((response) => {
    const images = response.data.photos;

    images.forEach((image, index) => {
      console.log(`Imagen ${index + 1}: ${image.src.original}`);
    });
  })
  .catch((error) => {
    console.error('Error al obtener imágenes:', error.message);
  });
