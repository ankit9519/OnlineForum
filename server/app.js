// Load environment variables
require('dotenv').config();

const authRoutes = require('./api/routes/authRoutes');
const questionRoutes = require('./api/routes/questionRoutes');
const answerRoutes = require('./api/routes/answerRoutes');
const commentRoutes = require('./api/routes/commentRoutes');
const userProfile = require('./api/routes/userRoutes')
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to the database
connectDB();

const app = express();

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173'
}));

// Initialize Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/profiles', userProfile);

// Catch-all route for testing server setup
app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
