const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 5050;

app.use(cors());
app.get('/', (req, res) => {
  res.send('Welcome to the Sports Match API!');
});

app.get('/api/matches', async (req, res) => {
  console.log('Received request to /api/matches');

  try {
    console.log('Fetching Scorebat API...');
    const response = await fetch('https://www.scorebat.com/video-api/v3/', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    console.log('Scorebat API response status:', response.status);

    const text = await response.text();
    console.log('Scorebat API raw response text (first 200 chars):', text.slice(0, 200));

    const data = JSON.parse(text);
    console.log('Parsed JSON data:', Object.keys(data));

    if (!data || !data.response) {
      console.log('Invalid or missing data.response');
      return res.status(500).json({ error: 'Invalid response from Scorebat API' });
    }

    console.log('Sending data.response back to client');
    res.json(data.response);

  } catch (error) {
    console.error('Caught error in /api/matches:', error);
    res.status(500).json({ error: 'Failed to fetch data from Scorebat API' });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
