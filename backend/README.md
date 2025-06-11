# NestJS Authentication Backend

A production-ready NestJS backend application with JWT authentication, Prisma ORM, and MongoDB integration.

## Features

- 🔐 **JWT Authentication** - Secure token-based authentication
- 👤 **User Management** - Registration, login, and profile management
- 🛡️ **Protected Routes** - JWT guard implementation
- 🔒 **Password Security** - bcrypt hashing with salt rounds
- ✅ **Input Validation** - Class validator decorators
- 🗄️ **Database** - MongoDB with Prisma ORM
- 🔧 **Production Ready** - Error handling and security best practices

## Tech Stack

- **Framework**: NestJS
- **Database**: MongoDB
- **ORM**: Prisma
- **Authentication**: JWT + Passport
- **Validation**: class-validator
- **Password Hashing**: bcrypt

## API Endpoints

### Authentication

- `POST /auth/signup` - Register a new user
- `POST /auth/signin` - Login user

### Users (Protected)

- `GET /users/profile` - Get current user profile
- `GET /users` - Get all users

## Quick Start

### 1. Prerequisites

- Node.js 18+
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### 2. Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your MongoDB connection string and JWT secret

# Generate Prisma client
npm run prisma:generate

# Push database schema
npm run prisma:push

# Start development server
npm run start:dev
```

### 3. Test the API

Visit http://localhost:3000 to see the API documentation, or use the examples in `API_TESTING.md`.

## Project Status

✅ **Completed Features:**

- JWT Authentication with signup/signin
- Password hashing with bcrypt (12 salt rounds)
- Protected routes using JWT guards
- Input validation with class-validator
- MongoDB integration with Prisma ORM
- Comprehensive error handling
- Health check endpoints
- Production-ready configuration

## API Endpoints

### User Registration

```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!",
    "name": "Amr Sayed"
  }'
```

### User Login

```bash
curl -X POST http://localhost:3000/auth/signin \
  -H "Content-Type: application/json" \  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!"
  }'
```

### Access Protected Route

```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Project Structure

```
src/
├── auth/
│   ├── dto/
│   │   └── auth.dto.ts          # Authentication DTOs
│   ├── guards/
│   │   └── jwt-auth.guard.ts    # JWT authentication guard
│   ├── strategies/
│   │   └── jwt.strategy.ts      # JWT strategy for Passport
│   ├── auth.controller.ts       # Authentication endpoints
│   ├── auth.module.ts          # Authentication module
│   └── auth.service.ts         # Authentication business logic
├── users/
│   ├── users.controller.ts     # User endpoints
│   ├── users.module.ts         # Users module
│   └── users.service.ts        # User business logic
├── prisma/
│   ├── prisma.module.ts        # Prisma module
│   └── prisma.service.ts       # Prisma service
├── app.module.ts               # Main application module
└── main.ts                     # Application entry point
```

## Security Features

- **Password Hashing**: bcrypt with 12 salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: Comprehensive request validation
- **CORS Configuration**: Configurable cross-origin requests
- **Environment Variables**: Secure configuration management

## Development Commands

```bash
# Start development server
npm run start:dev

# Build for production
npm run build

# Start production server
npm start

# Generate Prisma client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Open Prisma Studio
npm run prisma:studio
```

## Environment Variables

| Variable         | Description                | Default                                    |
| ---------------- | -------------------------- | ------------------------------------------ |
| `DATABASE_URL`   | MongoDB connection string  | `mongodb://localhost:27017/nestjs-auth-db` |
| `JWT_SECRET`     | Secret key for JWT signing | Required                                   |
| `JWT_EXPIRES_IN` | JWT token expiration time  | `7d`                                       |
| `PORT`           | Application port           | `3000`                                     |
| `NODE_ENV`       | Environment mode           | `development`                              |
| `FRONTEND_URL`   | Frontend URL for CORS      | `http://localhost:3000`                    |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
