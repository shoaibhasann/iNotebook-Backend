
# iNotebook Web Application Backend

iNotebook is a secure note-taking web application built using Node.js, Express, and MongoDB. Users can register, log in, create, update, and delete notes with user authentication and authorization.

## Features

- User registration and login functionality.
- Secure authentication using bcrypt.js for password hashing and JWT for token-based login.
- User-specific notes management with CRUD operations.
- MongoDB integration for data storage.
- Authorization middleware to protect routes.

## Installation

1. Clone the repository to your local machine.
2. Run `npm install` to install the required dependencies.
3. Create a `.env` file and set the following environment variables:

   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/iNotebook
   JWT_SECRET=mysecretkey
   ```

   Replace the MongoDB URI with your actual MongoDB connection string.

4. Run `npm run dev` to start the server using nodemon for automatic reload on changes.

## Usage

1. Register a new user using the `/register` route.
2. Log in with the registered credentials using the `/login` route to get an access token.
3. Use the received access token in the request headers (`Authorization: Bearer <token>`) for the protected routes that require authentication.
4. Use the `/` route to create a new note for the authenticated user.
5. Use the `/` route with the `GET` method to fetch all notes for the authenticated user.
6. Use the `/:id` route with the `PUT` method to update a specific note.
7. Use the `/:id` route with the `DELETE` method to delete a specific note.

## Dependencies

- Node.js
- Express
- bcrypt.js
- cookie-parser
- nodemon (for development)
- jsonwebtoken
- mongoose
- mongodb

## Contribution

Contributions to this project are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
