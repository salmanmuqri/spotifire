// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static('public'));

// Endpoint to get the list of MP3 files from the 'music' folder
app.get('/music', (req, res) => {
    const musicDir = path.join(__dirname, 'music');
    
    fs.readdir(musicDir, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory');
        }
        
        // Filter out non-MP3 files
        const mp3Files = files.filter(file => file.endsWith('.mp3'));
        res.json(mp3Files);
    });
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
