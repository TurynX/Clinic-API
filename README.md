Clinic-API

https://clinic-api-krh9.onrender.com

Clinic-API is a REST API for managing medical appointments.
Users can create an account, login, and schedule consultations.

This project was built to practice backend development and authentication.

Technologies

Node.js

Fastify

Prisma

PostgreSQL

Redis

Queue

JWT

Zod

Bcrypt

Authentication

The API uses:

Access Token (15 minutes)

Refresh Token

Refresh token rotation

Reuse detection

Redis rate limit

Passwords are hashed and tokens expire automatically.

Installation

Clone the project:

git clone https://github.com/your-username/clinic-api.git
cd clinic-api

Install dependencies:

npm install
Environment Variables

Create a .env file:

DATABASE_URL="postgresql://user:password@localhost:5432/clinic"
JWT_SECRET="your_secret_key"
REDIS_URL="redis://localhost:6379"
Database

Run migrations:

npx prisma migrate dev

Generate Prisma client:

npx prisma generate
Run the project
npm run dev

Server runs on:

http://localhost:3000
Main Routes
Auth

POST /auth/register

POST /auth/login

POST /auth/refresh

POST /auth/logout

Appointments

POST /appointments

GET /appointments

DELETE /appointments/:id

What this project includes

User authentication

Role-based access

Create and manage appointments

JWT authentication

Refresh token rotation

Rate limiting with Redis

Validation with Zod

Notes

This project was made for learning purposes and to improve backend skills.
