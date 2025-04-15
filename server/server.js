import express from 'express';
import cors from 'cors';
import authenticate from './authenticate.js';
import query from './db.js';

const app = express();
app.use(express.json());
app.use(cors());

const port = 5000;

// Example route to fetch reviews from the database
app.get('/api/reviews', async (req, res) => {
    try {
        const reviews = await query('SELECT * FROM reviews');
        res.json(reviews);
    } catch (err) {
        console.error("Error fetching reviews:", err.message);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

app.post('/api/reviews', async (req, res) => {
    const { track_id, user_id, rating, review_text, review_title, image_url } = req.body;

    if (!track_id || !user_id || !rating) {
        return res.status(400).json({ error: 'track_id, user_id, and rating are required fields.' });
    }

    try {
        const sql = `
          INSERT INTO reviews (track_id, user_id, rating, review_text, review_title, image_url, created_at)
          VALUES (?, ?, ?, ?, ?, ?, NOW())
        `;

        const result = await query(sql, [track_id, user_id, rating, review_text, review_title, image_url || null]);

        res.status(201).json({
            message: 'Review added successfully',
            review_id: String(result.insertId),
        });
    } catch (err) {
        console.error("Error inserting review:", err.message);
        res.status(500).json({ error: 'Failed to add the review' });
    }
})

app.get('/api/search', async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        console.log("Authenticating...");
        const token = await authenticate();
        console.log("Authenticated and searching for:", query);

        let trackParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`, trackParameters);
        const data = await response.json();

        if (!response.ok) {
            console.error("Spotify API Error:", data.error || "Unknown error");
            return res.status(500).json({ error: 'Failed to fetch tracks' });
        }

        res.json(data.tracks.items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch tracks' });
    }
});

app.get('/api/search-track-id', async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        console.log("Authenticating...");
        const token = await authenticate();
        console.log("Authenticated and searching with id:", query);

        let trackParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        const response = await fetch(`https://api.spotify.com/v1/tracks/${encodeURIComponent(query)}?market=US`, trackParameters);
        const data = await response.json();

        if (!response.ok) {
            console.error("Spotify API Error:", data.error || "Unknown error");
            return res.status(500).json({ error: 'Failed to fetch tracks' });
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch tracks' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
