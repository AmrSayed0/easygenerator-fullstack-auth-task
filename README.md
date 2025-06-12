# Full-Stack Authentication Task

A complete full-stack authentication simple solution built with NestJS (backend) and React (frontend), featuring JWT-based authentication, secure user management, and modern UI/UX.

## Architecture

### Backend (NestJS + MongoDB)

- **Framework**: NestJS with TypeScript
- **Database**: MongoDB with Prisma ORM
- **Authentication**: JWT + Passport strategies
- **Security**: bcrypt password hashing, input validation
- **API**: RESTful endpoints with comprehensive error handling

### Frontend (React + TypeScript)

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite for fast development
- **Styling**: SCSS modules with responsive design
- **Validation**: Zod schema validation
- **State Management**: Context API for auth state

## Key Features

### Authentication System

- **User Registration** - Secure signup with validation
- **User Login** - JWT-based authentication
- **Protected Routes** - Route guards and middleware
- **Secure Logout** - Token blacklisting
- **Session Management** - Persistent auth state

### Security & Validation

- **Password Requirements** - 8+ chars, letter, number, special character
- **Input Validation** - Client & server-side validation
- **CORS Configuration** - Secure cross-origin requests
- **Token Security** - JWT with configurable expiration

### UI/UX

- **Responsive Design** - Mobile-first approach
- **Professional Interface** - Clean, modern design
- **Loading States** - Smooth user experience
- **Error Handling** - Comprehensive error feedback

## API Endpoints

| Method | Endpoint         | Description       | Protection |
| ------ | ---------------- | ----------------- | ---------- |
| `POST` | `/auth/signup`   | User registration | Public     |
| `POST` | `/auth/signin`   | User login        | Public     |
| `POST` | `/auth/logout`   | User logout       | Protected  |
| `GET`  | `/users/profile` | Get user profile  | Protected  |
| `GET`  | `/users`         | Get all users     | Protected  |

## Quick Start

### Prerequisites

```bash
Node.js 19+
MongoDB (local or Atlas)
npm or yarn
```

### Backend Setup

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB URL and JWT secret

# Setup database
npm run prisma:generate
npm run prisma:push

# Start backend server
npm run start:dev
```

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Access Points

- **Backend API**: http://localhost:3000
- **Frontend App**: http://localhost:5173

## Project Structure

```
├── backend/                     # NestJS Backend Application
│   ├── prisma/                  # Database schema and migrations
│   └── src/                     # Backend source code
│       ├── auth/                # Authentication module
│       ├── prisma/              # Database service module
│       └── users/               # User management module
└── frontend/                    # React Frontend Application
    ├── public/                  # Static assets
    └── src/                     # Frontend source code
        ├── assets/              # Static assets
        ├── components/          # Reusable UI components
        ├── config/              # Configuration files
        ├── contexts/            # React Context providers
        ├── pages/               # Page components
        ├── services/            # API service layer
        ├── styles/              # Global styles
        ├── types/               # TypeScript type definitions
        └── utils/               # Utility functions
├── README.md                    # Main project documentation
```

## User Interface

### Pages

- **Home** - Welcome page with auth-aware content
- **Sign In** - Professional login form with validation
- **Sign Up** - Registration form with password requirements

## Testing

### Backend Testing

```bash
# Test registration
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User", "email":"test@example.com","password":"SecurePass123!"}'

# Test login
curl -X POST http://localhost:3000/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"SecurePass123!"}'
```

### Frontend Testing

- Navigate to http://localhost:5173
- Test registration and login flows
- Verify protected route access
- Test responsive design on different screen sizes

## Production Deployment & Live Demo

- **Frontend**: Deployed on Vercel – [Live Demo](https://easygenerator-fullstack-auth-task.vercel.app/)
- **Backend API**: Hosted on DigitalOcean – [Live Endpoint](https://easygenerator-backend-auth-ilem6.ondigitalocean.app/)
