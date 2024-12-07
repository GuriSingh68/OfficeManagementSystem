# Office Management System  
#Assignment for EGEN5206

## Overview  
The Office Management System is a web and mobile application designed to streamline office operations. It provides role-based dashboards for managing tasks, events, and feedback, offering distinct functionalities for admins and users. The system ensures secure access through JWT-based authentication and offers seamless integration across web and mobile platforms.  

---

## Features  
### Admin Role
- Dashboard: View all tasks and events at a glance.  
- User Management: Add, edit, and delete user profiles.  
- Task Management: Create, edit, delete, and assign tasks to users.  
- Event Management: Create, update, and delete events for all users.  
- Feedback Management: View and manage user feedback.  

### User Role
- Dashboard: View assigned tasks and events.  
- Task Updates: Update the status of assigned tasks.  
- Event Participation: View event details and join events.  
- Feedback Submission: Submit feedback for events and tasks.  

---

## Technologies Used  

### Backend
- Framework: [Nest.js](https://nestjs.com/) (TypeScript)  
- Database: MongoDB  
- Authentication: JWT-based authentication and role-based access control  

### Frontend
- Web Application: [Next.js](https://nextjs.org/) (TypeScript)  
- Mobile Application: [Ionic React](https://ionicframework.com/) (TypeScript)  

### Other Dependencies  
- Password Hashing: `bcrypt`  
- Token Management: `uuid`, `jsonwebtoken`  
- API Documentation: Swagger  

---

## Installation and Setup  
  
1. Clone the repository:  
   ```bash
   git clone <repository-url>
2. Start
	a. Open assignment -4 in shell
	b. run command sh start.sh
