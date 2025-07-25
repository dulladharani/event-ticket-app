﻿#  Event Ticket Booking App

A **full-stack web application** for browsing events, booking tickets, and managing events through an admin panel.  
Built with **React.js (frontend)** and **Node.js + Express (backend)**.

---

##  Features
 Browse upcoming events  
 Search and filter events by category, date, or location  
 Book tickets with name, email, and ticket count  
 Admin panel for event management  
 Secure REST API for frontend-backend communication  

---

##  Tech Stack
**Frontend:**  
- React.js  
- Tailwind CSS  

**Backend:**  
- Node.js  
- Express.js  

**Database:**  
- (Add if using MongoDB, MySQL, etc.)  

---

##  Project Structure
\\\
event-ticket-app/

 frontend/   # React frontend
 backend/    # Node.js backend
 README.md
\\\

---

##  Installation & Setup

### 1 Clone the Repository
\\\ash
git clone https://github.com/dulladharani/event-ticket-app.git
cd event-ticket-app
\\\

### 2 Install Dependencies
**Frontend**
\\\ash
cd frontend
npm install
\\\

**Backend**
\\\ash
cd ../backend
npm install
\\\

### 3 Start the App
**Frontend**
\\\ash
npm start
\\\

**Backend**
\\\ash
node server.js
\\\

---

##  API Endpoints
| Method | Endpoint         | Description           |
|--------|------------------|----------------------|
| GET    | \/api/events\    | Fetch all events    |
| POST   | \/api/bookings\  | Book a ticket       |

---

##  Screenshots
(Add screenshots of the UI here)

---

##  Future Enhancements
-  Payment integration  
-  Real-time updates with WebSockets  
-  User authentication  

---

##  Contributing
Feel free to fork and create pull requests.

---

##  License
This project is licensed under the **MIT License**.
