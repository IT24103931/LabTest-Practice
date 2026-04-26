# MERN Stack Starter

A full-stack MERN (MongoDB, Express, React, Node.js) boilerplate with JWT authentication, protected routes, and full CRUD.

## Project Structure

```
mern-app/
├── client/          # React frontend (Create React App)
└── server/          # Express + MongoDB backend
```

## Features

- 🔐 JWT Authentication (register, login, logout)
- 🛡️ Protected routes (client & server)
- 🗄️ MongoDB with Mongoose ODM
- ⚡ Full CRUD for items
- 🧱 MVC architecture on the backend
- 🎨 Clean, responsive UI

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB running locally or a MongoDB Atlas URI

---

### Backend Setup

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MONGO_URI and JWT_SECRET
npm run dev
```

Server runs on **http://localhost:5000**

---

### Frontend Setup

```bash
cd client
npm install
cp .env.example .env
# Edit .env if your API URL differs
npm start
```

Client runs on **http://localhost:3000**

---

## API Endpoints

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/api/auth/register` | Public | Register user |
| POST | `/api/auth/login` | Public | Login user |
| GET | `/api/auth/me` | Private | Get current user |
| GET | `/api/items` | Private | Get all items |
| POST | `/api/items` | Private | Create item |
| PUT | `/api/items/:id` | Private | Update item |
| DELETE | `/api/items/:id` | Private | Delete item |
| GET | `/api/users` | Admin | Get all users |
| PUT | `/api/users/profile` | Private | Update profile |

## Environment Variables

### Server (`server/.env`)

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/mernapp
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### Client (`client/.env`)

```
REACT_APP_API_URL=http://localhost:5000/api
```
