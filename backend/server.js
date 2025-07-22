// backend/server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5001; // Changed port to 5001 

// --- Middleware ---
// Enable CORS (Cross-Origin Resource Sharing)
// This allows your React frontend (on port 3000/3003) to make requests to this backend (on port 5000).
app.use(cors());

// Parse incoming request bodies in JSON format.
// This is essential for handling POST requests where the frontend sends JSON data.
app.use(bodyParser.json());

// --- In-memory Data Store (acting as your "DB model" for now) ---
// This array will hold your event data.
// IMPORTANT: This data will reset every time you restart the server.
// For a persistent database, you'd integrate MongoDB/Mongoose, PostgreSQL/Sequelize, etc.
let events = [
    {
        id: 1,
        title: 'Music Festival',
        location: 'Hyderabad',
        dateTime: '2025-07-20T18:00:00', // ISO 8601 format for date and time
    },
    {
        id: 2,
        title: 'Tech Conference',
        location: 'Bangalore',
        dateTime: '2025-08-15T09:30:00',
    },
];

// --- API Routes ---

// 1. GET /api/events: Fetch all events
// Endpoint for your frontend to retrieve the list of events.
app.get('/api/events', (req, res) => {
    console.log('GET /api/events request received.');
    // Send the 'events' array as a JSON response.
    res.json(events);
});

// 2. POST /api/events: Add a new event
// Endpoint for your frontend to send new event data to be added.
app.post('/api/events', (req, res) => {
    console.log('POST /api/events request received. Body:', req.body);

    // Extract event data from the request body.
    const { title, location, dateTime } = req.body;

    // Basic Server-Side Validation: Check if all required fields are present.
    if (!title || !location || !dateTime) {
        // If validation fails, send a 400 Bad Request status with an error message.
        return res.status(400).json({ message: 'All fields (title, location, dateTime) are required.' });
    }

    // Generate a simple unique ID for the new event.
    // In a real DB, the database would typically handle ID generation.
    const newId = events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 1;

    // Create the new event object.
    const newEvent = {
        id: newId,
        title,
        location,
        dateTime,
    };

    // Add the new event to our in-memory array.
    events.push(newEvent);

    // Send a 201 Created status code and the newly added event object as JSON.
    res.status(201).json(newEvent);
});

// Optional: Root route for basic server check
// If you visit http://localhost:5000/ in your browser, you'll see this message.
app.get('/', (req, res) => {
    res.send('Welcome to the Event Booking Backend API!');
});

// --- Start the Server ---
// Make the Express app listen for incoming requests on the specified port.
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});