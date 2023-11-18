const axios = require('axios');
require('dotenv').config();

const translate = require('google-translate-api');

// {"word": "hello", "targetLanguage": "es"}
const getTranslate = async (req, res) => {
    const { word, targetLanguage } = req.body;
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!word || !targetLanguage) {
        return res.status(400).json({ error: 'Word and targetLanguage are required.' });
    }
  
    try {
        const translation = await translate(word, { to: targetLanguage, key: apiKey });
        res.json({ translation: translation.text });

    } catch (error) {
        res.status(500).json({error: `Error in translate: ${error}`})
    }

}