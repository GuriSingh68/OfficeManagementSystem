# EGEN52006
Office Management System 
-API
This project provides a set of RESTful APIs for managing tasks, events, and members within an office environment. Built with NestJS, it utilizes MongoDB as the database, Mongoose as the ORM.

Operations

Task Management
Get all tasks: GET /tasks
Create a new task: POST /tasks
Update a task: PATCH /tasks/:id
Delete a task: DELETE /tasks/:id

Event Management
Get all events: GET /events
Create a new event: POST /events
Update an event: PATCH /events/:id
Delete an event: DELETE /events/:id

Member Management
Get all members: GET /members
Create a new member: POST /members
Update a member: PATCH /members/:id
Delete a member: DELETE /members/:id

Login: POST /user/login
Sign Up: POST /user/sign-up

Feedback Management
Submit Feedback: POST /feedback/submit
Get All Feedback: GET /feedback
Get Feedback by ID: GET /feedback/:id
Update Feedback: PATCH /feedback/:id
Delete Feedback: DELETE /feedback/:id

Report Management
Upload a Report File: POST /reports/upload


Features
Task, Event, and Member Management APIs
Input Validation using NestJS decorators
Data persistence with MongoDB and Mongoose ORM
Backend: NestJS, TypeScript
Database: MongoDB with Mongoose
Validation: Validation decorators like @IsNotEmpty(), @IsString(), @IsEmail()

Installation
git clone https://github.com/GuriSingh68/OfficeManagementSystem.git
cd OfficeManagementSystem



