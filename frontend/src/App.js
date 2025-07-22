// frontend/src/App.js

import React, { useState, useEffect } from 'react';
//import { Routes, Route } from 'react-router-dom'; // Import Routes and Route for potential future routing
import EventForm from './EventForm'; // Import your EventForm component
import EventCard from './EventCard'; // Import your EventCard component
import BookingForm from './BookingForm'; // Import your BookingForm component
import './App.css'; // Main application CSS (create this file if it doesn't exist)

function App() {
    // State to hold the list of events fetched from the backend
    const [events, setEvents] = useState([]);
    // State for loading indicator
    const [loading, setLoading] = useState(false);
    // State for error messages during fetching
    const [error, setError] = useState(null);
    // State to manage which event's booking form is currently open
    const [selectedEventId, setSelectedEventId] = useState(null);

    // Function to fetch events from the backend API
    const fetchEvents = async () => {
        setLoading(true); // Set loading to true while fetching
        setError(null);   // Clear any previous errors
        try {
            const response = await fetch('http://localhost:5000/api/events'); // Call your backend API
            if (!response.ok) {
                // If response is not OK (e.g., 404, 500 status), throw an error
                const errorData = await response.json(); // Try to get error message from backend
                throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
            }
            const data = await response.json(); // Parse the JSON response
            setEvents(data); // Update the events state
        } catch (err) {
            setError(err.message); // Set error message if fetch fails
            console.error('Error fetching events:', err);
        } finally {
            setLoading(false); // Set loading to false after fetch completes
        }
    };

    // This function is passed to EventForm and called when a new event is added.
    // It triggers a re-fetch of events to update the displayed list.
    const handleEventAdded = () => {
        fetchEvents();
    };

    // This function is called when a "Book Ticket" button on an EventCard is clicked.
    const handleBookClick = (eventId) => {
        setSelectedEventId(eventId); // Set the ID of the event to be booked
    };

    // This function is called to close the booking form.
    const handleCloseBookingForm = () => {
        setSelectedEventId(null); // Clear the selected event ID
    };

    // useEffect hook to fetch events when the component mounts
    // The empty dependency array [] ensures this runs only once.
    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="App">
            {/* Section for adding new events */}
            <EventForm onEventAdded={handleEventAdded} />

            <hr /> {/* Horizontal line for separation */}

            {/* Section for displaying upcoming events */}
            <h2>Upcoming Events</h2>
            {loading && <p>Loading events...</p>} {/* Show loading message */}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>} {/* Show error message */}
            {!loading && !error && events.length === 0 && <p>No events found.</p>} {/* Message if no events */}
            {!loading && !error && events.length > 0 && (
                <div className="event-list">
                    {/* Map through the events array and render an EventCard for each event */}
                    {events.map((event) => (
                        <EventCard
                            key={event.id} // Unique key for list rendering
                            event={event} // Pass the entire event object as a prop
                            handleBookClick={handleBookClick} // Pass the booking handler
                        />
                    ))}
                </div>
            )}

            <hr />

            {/* Conditionally render the BookingForm if an event is selected */}
            {selectedEventId && (
                <BookingForm
                    eventId={selectedEventId}
                    onClose={handleCloseBookingForm} // Pass a close handler
                />
            )}
        </div>
    );
}

export default App;