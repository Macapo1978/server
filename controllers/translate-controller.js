const axios = require('axios');
// input json 
//{ 
//     "text": "horse", 
//     "originLanguage": "en", 
//     "translateLanguage": "es" 
//     }
// output json
// {
//     "translation": "caballo"
// }

const translateText = async (req, res) => {
    const { text, originLanguage, translateLanguage } = req.body;

    if (!text || !originLanguage || !translateLanguage){
        return res.status(400).json({ error: 'All fields are required.' });
    }
    const encodedText = encodeURIComponent(text);
    const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${originLanguage}|${translateLanguage}`;

    try {
        const response = await axios.get(url);

        const translatedText = response.data.responseData.translatedText;
        if (!translatedText) {
            return res.status(400).json({ error: "Translation not found." });
        }
        res.json({ translation: translatedText });

    } catch(error){
        res.status(500).json({error: `Error in translate: ${error}` });
    }

};

module.exports = { translateText };
