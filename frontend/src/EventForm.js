// frontend/src/EventForm.js

import React, { useState } from 'react';
// You can create a CSS file like EventForm.css if you want specific styles
// import './EventForm.css';

// This component takes 'onEventAdded' as a prop, which is a function
// that App.js will pass down to notify it when a new event is successfully added.
function EventForm({ onEventAdded }) {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [formError, setFormError] = useState(null); // For displaying form validation errors
    const [formSuccess, setFormSuccess] = useState(null); // For displaying success message

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission (page reload)

        setFormError(null); // Clear previous errors
        setFormSuccess(null); // Clear previous success message

        // Client-Side Validation
        if (!title || !location || !dateTime) {
            setFormError('All fields are required.');
            return;
        }

        // Create the new event object to send to the backend
        const newEvent = {
            title,
            location,
            dateTime,
        };

        try {
            // Send a POST request to your backend API
            const response = await fetch('http://localhost:5000/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Tell the server we're sending JSON
                },
                body: JSON.stringify(newEvent), // Convert JavaScript object to JSON string
            });

            // Check if the request was successful (status 2xx)
            if (!response.ok) {
                const errorData = await response.json(); // Try to parse error message from backend
                throw new Error(errorData.message || 'Failed to add event.');
            }

            // If successful, parse the response data (the new event object from backend)
            const addedEvent = await response.json();
            console.log('Event added successfully on backend:', addedEvent);
            setFormSuccess('Event added successfully!');

            // Notify the parent component (App.js) that an event was added.
            // This will trigger App.js to re-fetch the events list.
            if (onEventAdded) {
                onEventAdded();
            }

            // Clear the form fields after successful submission
            setTitle('');
            setLocation('');
            setDateTime('');

        } catch (err) {
            setFormError(err.message); // Display error message to the user
            console.error('Error adding event:', err); // Log full error for debugging
        }
    };

    return (
        <div className="event-form-container">
            <h2>Add New Event</h2>
            <form onSubmit={handleSubmit}> {/* Attach the handleSubmit function to the form */}
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dateTime">Date & Time:</label>
                    <input
                        type="datetime-local" // HTML5 input type for date and time picker
                        id="dateTime"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Add Event</button>

                {/* Display form messages */}
                {formError && <p style={{ color: 'red' }}>{formError}</p>}
                {formSuccess && <p style={{ color: 'green' }}>{formSuccess}</p>}
            </form>
        </div>
    );
}

export default EventForm;