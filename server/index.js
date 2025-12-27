const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});

app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/departments', require('./routes/department'));
app.use('/api/maintenance-teams', require('./routes/maintainanceTeam'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});