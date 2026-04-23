// server.js — Minimal Express API that runs backend/app.py and returns stdout

const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/', (req, res) => {
    const cwd = path.join(__dirname, 'backend');

    // Use python3 on Mac/Linux if needed
    const PY = process.platform === 'win32' ? 'python' : 'python3';

    exec(`${PY} app.py`, { cwd }, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send(stderr || 'Error running Python script');
        }

        res.type('text/plain').send(stdout.trim());
    });
});

app.listen(PORT, () => {
    console.log(`Node server running at http://localhost:${PORT}`);
});