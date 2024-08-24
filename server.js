// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const path = require('path');
// const PORT = 3000;

// let history = [];

// app.use(bodyParser.json());
// app.use(express.static('public'));

// // Endpoint to get the calculation history
// app.get('/history', (req, res) => {
//   res.json(history);
// });

// //app.use(express.static(path.join(__dirname, 'public')));

// // Route for the root URL
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.get('/style.css', (req, res) => {
//     res.sendFile(path.join(__dirname, 'style.css'));
// });  

// //app.use('/src', express.static(path.join(__dirname, 'src')));

// app.get('/script.js', (req, res) => {
//     res.sendFile(path.join(__dirname, 'script.js'));
// });

// // Endpoint to save a calculation
// app.post('/history', (req, res) => {
//   const { calculation } = req.body;
//   if (calculation) {
//     history.push(calculation);
//     res.status(200).send('Calculation saved');
//   } else {
//     res.status(400).send('Invalid request');
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const path = require('path');
const PORT = 3000;

// MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '12345', 
    database: 'calculator_db'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to get the calculation history
app.get('/history', (req, res) => {
    const query = 'SELECT * FROM history ORDER BY created_at DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching history:', err);
            res.status(500).send('Error fetching history');
            return;
        }
        res.json(results);
    });
});

// Route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'style.css'));
});

app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'script.js'));
});

// Endpoint to save a calculation
app.post('/history', (req, res) => {
    const { calculation } = req.body;
    if (calculation) {
        const query = 'INSERT INTO history (calculation) VALUES (?)';
        db.query(query, [calculation], (err, results) => {
            if (err) {
                console.error('Error saving calculation:', err);
                res.status(500).send('Error saving calculation');
                return;
            }
            res.status(200).send('Calculation saved');
        });
    } else {
        res.status(400).send('Invalid request');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

