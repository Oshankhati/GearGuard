const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Add CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});

// Add events endpoint
app.get('/api/events', (req, res) => {
    const events = [
        { date: "2025-12-14", label: "AC Check", type: "preventive" },
        { date: "2025-12-20", label: "Machine Failure", type: "breakdown" },
        { date: "2025-12-27", label: "Inspection", type: "inspection" }
    ];
    res.json(events);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});