# ContestHub – Creative Contest Management Platform

## Live Website
https://your-live-site-url.com

---

## Project Overview

**ContestHub** is a complete, production-ready full-stack web application designed for managing creative contests. The platform enables users to explore contests, securely register and participate through online payments, and track their participation and achievements. Contest creators can create and manage contests, while administrators supervise approvals and user management.

The application is developed following real-world industry practices, emphasizing security, scalability, role-based access control, and a responsive user interface.

---

## Project Objectives

- Design and implement a full-stack contest management platform
- Provide role-based dashboards for Admin, Contest Creator, and Normal User
- Implement secure authentication and authorization using JWT
- Integrate Stripe for secure online payments
- Ensure responsive and user-friendly UI across all devices
- Deploy client and server for real-world usage

---

## Key Features

- Public contest browsing without authentication
- Secure user authentication using JWT
- Role-based authorization for Admin, Contest Creator, and Normal User
- Admin dashboard for contest approval and user management
- Contest Creator dashboard for creating, updating, and managing contests
- Stripe payment integration for contest entry fees
- Payment validation before contest participation is confirmed
- Winner declaration and result publishing by contest creators
- User dashboard showing participated contests and winning history
- Fully responsive design for mobile, tablet, and desktop devices
- Secure RESTful APIs with token and role verification
- Centralized state management for smooth user experience
- Clean UI with reusable and modular components
- Production-ready deployment with environment-based configuration

---

## Technology Stack

### Frontend
- React
- React Router DOM
- Axios
- Tailwind CSS
- Context API for state management
- Stripe.js and React Stripe.js

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Stripe Server SDK

### Authentication & Security
- JWT-based authentication
- Protected routes (frontend and backend)
- Role-based middleware authorization
- Secure handling of environment variables
- Stripe secret key protection on the server

---

## Payment Flow (Stripe)

1. User selects a contest and proceeds to registration
2. Stripe Payment Intent is created on the server
3. Client completes payment using Stripe Elements
4. Payment is verified on the backend
5. Successful payment allows contest participation
6. Payment records are stored securely in the database

---

## User Roles & Permissions

### Normal User
- Browse and explore contests
- Register and log in securely
- Pay contest entry fees via Stripe
- Participate in contests
- View participation history and winnings

### Contest Creator
- Create new contests
- Update and manage contest details
- View registered participants
- Declare winners

### Admin
- Approve or reject submitted contests
- Manage users and roles
- Monitor platform activities

---

## Project Architecture

- Modular component-based frontend architecture
- RESTful API design
- Middleware-based role authorization
- Secure payment flow using Stripe
- Scalable MongoDB database design
- Clean and maintainable codebase
- Meaningful Git commit history

---

## Deployment

- Frontend deployed on a cloud hosting platform
- Backend deployed with secured API endpoints
- MongoDB Atlas used for database hosting
- Environment variables used for sensitive credentials

---

## Conclusion

ContestHub is a complete full-stack application that demonstrates practical implementation of authentication, role-based access control, secure payment integration using Stripe, and responsive UI design. The project reflects real-world development standards and showcases the ability to design, build, and deploy a scalable web application.

---

## Author

**Tanzir Ahmed Sami**  
Full-Stack Web Developer
