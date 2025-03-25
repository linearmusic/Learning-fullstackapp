# JWT Authentication Learning Project

A full-stack authentication system using JWT (JSON Web Tokens) built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- User registration and login
- JWT-based authentication
- Protected routes
- Token management
- Profile management
- Password hashing with bcrypt

## Project Structure

```
├── Backend/
│   ├── middlewares/
│   │   └── user.js
│   ├── Routes/
│   │   └── userRoutes.js
│   ├── .env
│   ├── db.js
│   ├── index.js
│   └── package.json
│
└── Frontend/
    └── jwt-frontend/
        ├── src/
        │   ├── components/
        │   │   └── Profile.jsx
        │   ├── services/
        │   │   └── api.js
        │   ├── App.jsx
        │   └── App.css
        └── package.json
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/your-username/jwt-auth-learning.git
cd jwt-auth-learning
```

2. Install Backend Dependencies
```bash
cd Backend
npm install
```

3. Install Frontend Dependencies
```bash
cd ../Frontend/jwt-frontend
npm install
```

4. Configure Environment Variables
Create a `.env` file in the Backend directory:
```
JWT_SECRET=your_jwt_secret
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

5. Start the Backend Server
```bash
cd Backend
npm run dev
```

6. Start the Frontend Development Server
```bash
cd Frontend/jwt-frontend
npm run dev
```

## API Endpoints

- POST `/user/signup` - Register a new user
- POST `/user/signin` - Login user
- GET `/user/1` - Protected route (requires authentication)

## Technologies Used

### Backend
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- dotenv

### Frontend
- React (Vite)
- React Router DOM
- Axios
- CSS Modules

## Security Features

- Password hashing using bcrypt
- JWT for secure authentication
- Protected routes middleware
- HTTP-only cookies
- Environment variable management
- CORS protection

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
