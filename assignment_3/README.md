# EGEN52006
This project involves building a secure Office Management System with advanced authentication and authorization mechanisms. The system uses JWT-based authentication, role-based authorization, and refresh tokens to manage user access securely.

Features
Authentication:

Implements secure user registration (Sign-Up) and login functionalities.
Uses JWT for access tokens and UUID for refresh tokens.
Passwords are hashed and salted using bcrypt for security.

Authorization:
Role-based access control (RBAC) to define user permissions (Admin, Manager, User).
Guards and decorators enforce role-specific access to API endpoints.

Modular Architecture:
Organized into modules like Auth, User, and Event, adhering to NestJS principles.
DTOs ensure structured input validation.

Technology Stack
Backend: NestJS (Node.js framework)
Database: MongoDB (with Mongoose ORM)
Authentication: JSON Web Tokens (JWT), UUID for refresh tokens
Validation: DTOs and decorators for strict input validation
Role-Based Access Overview
Admin: Full access, including managing users, events, and feedback.
Manager: Create and update tasks and events.
User: Limited access to view and update personal tasks and events.

Installation
git clone https://github.com/GuriSingh68/OfficeManagementSystem.git
cd OfficeManagementSystem
npm install
npm run start:dev
http://localhost:3000

API Request Response are in the submitted
