// frontend/src/EventCard.js

import React from 'react';
// import './EventCard.css'; // Optional CSS for event cards

// EventCard component receives an 'event' object and 'handleBookClick' function as props
function EventCard({ event, handleBookClick }) {
    // Format the date and time for display
    const formattedDateTime = new Date(event.dateTime).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // Use 12-hour format with AM/PM
    });

    return (
        <div className="event-card">
            <h3>{event.title}</h3>
            <p>Location: {event.location}</p>
            <p>Date & Time: {formattedDateTime}</p>
            <button onClick={() => handleBookClick(event.id)}>Book Ticket</button>
        </div>
    );
}

export default EventCard;