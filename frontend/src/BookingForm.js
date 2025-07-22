// frontend/src/BookingForm.js (Basic placeholder as per your screenshot)

import React, { useState } from 'react';
// import './BookingForm.css';

function BookingForm({ eventId, onClose }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [bookingMessage, setBookingMessage] = useState(null);

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        setBookingMessage(null); // Clear previous messages

        if (!name || !email || quantity < 1) {
            setBookingMessage('Please fill all fields and enter a valid quantity.');
            return;
        }

        // In a real app, you would send this booking data to your backend
        console.log(`Booking for Event ID: ${eventId}, Name: ${name}, Email: ${email}, Quantity: ${quantity}`);
        setBookingMessage('Booking successful! (Simulated)');
        // Optionally, clear form or close it after a delay
        // setTimeout(() => onClose(), 2000);
    };

    return (
        <div className="booking-form-container">
            <h3>Book Tickets for Event {eventId}</h3>
            <form onSubmit={handleBookingSubmit}>
                <div className="form-group">
                    <label htmlFor="bookName">Name:</label>
                    <input
                        type="text"
                        id="bookName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Dulla.Dharani"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bookEmail">Email:</label>
                    <input
                        type="email"
                        id="bookEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="dulladharani23@gmail.com"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bookQuantity">Quantity:</label>
                    <input
                        type="number"
                        id="bookQuantity"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        min="1"
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="button" onClick={onClose}>Cancel</button>
                    <button type="submit">Book</button>
                </div>
                {bookingMessage && <p style={{ color: bookingMessage.includes('successful') ? 'green' : 'red' }}>{bookingMessage}</p>}
            </form>
        </div>
    );
}

export default BookingForm;