const axios = require('axios');
require('dotenv').config();

const getPexelsImages = async (req, res) => {
  const { query, perPage } = req.body;

  try {
    const apiUrl = `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}`;
    const headers = {
      Authorization: process.env.PEXELS_API_KEY,
    };
    const response = await axios.get(apiUrl, { headers });
    const images = response.data.photos.map(photo => ({
      url: photo.src.original,
    }));

    res.json(images);
  } catch (error) {
    console.error('Error al obtener imágenes:', error.message);
    res.status(500).json({ error: 'Error al obtener imágenes' });
  }
};

module.exports = { getPexelsImages };
