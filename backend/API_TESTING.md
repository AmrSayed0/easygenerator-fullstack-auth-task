# API Testing Examples

This file contains examples of how to test the authentication endpoints using curl or any HTTP client.

## Prerequisites

- Make sure MongoDB is running on your system
- The application should be running on http://localhost:3000

## Validation Requirements

### Password Requirements

- **Minimum length**: 8 characters
- **Must contain**: At least one letter (a-z, A-Z)
- **Must contain**: At least one number (0-9)
- **Must contain**: At least one special character (@$!%\*?&)

### Name Requirements

- **Minimum length**: 3 characters (when provided)
- **Optional field**: Can be omitted from registration

## 1. User Registration (Sign Up)

```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Amr Sayed"
    "email": "amr.sayed@example.com",
    "password": "SecurePass123!",
  }'
```

**Expected Response:**

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "name": "Amr Sayed",
    "email": "amr.sayed@example.com",
    "createdAt": "..."
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 2. User Login (Sign In)

```bash
curl -X POST http://localhost:3000/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "amr.sayed@example.com",
    "password": "SecurePass123!"
  }'
```

**Expected Response:**

```json
{
  "message": "Login successful",
  "user": {
    "id": "...",
    "name": "Amr Sayed",
    "email": "amr.sayed@example.com",
    "createdAt": "..."
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 3. User Logout

```bash
curl -X POST http://localhost:3000/auth/logout \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

**Expected Response:**

```json
{
  "message": "Logged out successfully"
}
```

**Note:** After logout, the token is blacklisted and cannot be used for subsequent requests. Any attempt to use a blacklisted token will result in a 401 Unauthorized error.

## 4. Get User Profile (Protected Endpoint)

```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

**Expected Response:**

```json
{
  "id": "...",
  "name": "Amr Sayed",
  "email": "amr.sayed@example.com",
  "createdAt": "...",
  "updatedAt": "..."
}
```

## 5. Get All Users (Protected Endpoint)

```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

**Expected Response:**

```json
{
  "message": "Users retrieved successfully",
  "users": [
    {
      "id": "...",
      "name": "Amr Sayed",
      "email": "amr.sayed@example.com",
      "createdAt": "..."
    }
  ],
  "count": 1
}
```

## Error Responses

### Validation Errors (400 Bad Request)

```json
{
  "message": [
    "email must be an email",
    "Password must be at least 8 characters long",
    "Password must contain at least one letter, one number, and one special character (@$!%*?&)",
    "Name must be at least 3 characters long"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

### Authentication Errors (401 Unauthorized)

```json
{
  "message": "Invalid credentials",
  "error": "Unauthorized",
  "statusCode": 401
}
```

### Conflict Errors (409 Conflict)

```json
{
  "message": "User with this email already exists",
  "error": "Conflict",
  "statusCode": 409
}
```

## Testing with Postman

You can also import these endpoints into Postman:

1. **POST** `http://localhost:3000/auth/signup`
2. **POST** `http://localhost:3000/auth/signin`
3. **POST** `http://localhost:3000/auth/logout`
4. **GET** `http://localhost:3000/users/profile` (requires Bearer token)
5. **GET** `http://localhost:3000/users` (requires Bearer token)

For protected endpoints, add the following header:

- **Key**: `Authorization`
- **Value**: `Bearer YOUR_ACCESS_TOKEN`
