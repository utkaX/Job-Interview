# CareerCraft - Job Interview Platform

CareerCraft is a comprehensive, web-based job recruitment platform developed using the MERN stack (MongoDB, Express.js, React, Node.js) to connect job seekers with employers. The platform features secure user authentication, job listings, application management, and a real-time interview system. It provides an intuitive and scalable experience for job seekers, employers, and administrators.

## Features

- **User Authentication**: Secure sign-up, login, and OTP-based authentication for job seekers, employers, and admins.
- **Job Seeker Dashboard**: Allows users to manage profiles, apply for jobs, track applications, and save jobs for later.
- **Employer Dashboard**: Employers can post and manage job listings, view applicants, and conduct interviews.
- **Real-Time Interviews**: Virtual interviews using WebRTC, allowing employers to conduct online interviews directly within the platform.
- **Notifications and Messaging**: Notifications about job applications, interview schedules, and direct messaging for communication between employers and candidates.
- **Company Profile Management**: Employers can update company details to attract job seekers.
- **Job Search and Filter**: Advanced search functionality to browse jobs based on location, category, salary, and more.
- **Career Resources**: Access to career guidance articles, interview tips, and development tools.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-Time Communication**: WebRTC, Socket.io
- **Authentication**: OTP-based login (JWT for session management)
- **Deployment**: MongoDB Atlas, Cloud hosting (Heroku/AWS)
- **Development Tools**: Visual Studio Code, Postman, Git/GitHub

## Installation

### Clone the repository
```bash
git clone https://github.com/your-username/CareerCraft.git
cd CareerCraft
```
## Backend Setup
```bash
cd backend
npm install
```
Create a .env file and add the following environment variables:
```bash
DB_URI=your-mongo-db-uri
JWT_SECRET=your-jwt-secret
PORT=5000
```
Run the backend
```bash
npm run dev
```
## Frontend Setup 
```bash
cd frontend
npm install
npm run dev
```
## Running the Application
Once both the frontend and backend are running, the application will be accessible on your local machine at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

