const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let userPoints = 0;

// Endpoint to get current points
app.get('/points', (req, res) => {
    res.json({ points: userPoints });
});

// Endpoint to redeem points
app.post('/redeem', (req, res) => {
    if (userPoints > 0) {
        userPoints = 0; // Reset points after redeeming
        res.json({ success: true, message: 'Points redeemed successfully!' });
    } else {
        res.json({ success: false, message: 'No points to redeem!' });
    }
});

// Endpoint to update points
app.post('/update', (req, res) => {
    const { points } = req.body;
    if (points && points > 0) {
        userPoints += points;
        res.json({ success: true, totalPoints: userPoints });
    } else {
        res.json({ success: false, message: 'Invalid points!' });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
