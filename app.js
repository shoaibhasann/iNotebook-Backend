import express from "express";
import userRoutes from "./routes/user.routes.js";
import noteRoutes from "./routes/note.routes.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.middleware.js";

// create an instance of express
const app = express();

// Middleware to parse body request
app.use(express.json());

// Middleware for url decode
app.use(express.urlencoded({
    extended: true,
   
}));

// Middleware for parsing cookies
app.use(cookieParser());

// Handling user routes
app.use('/api/v1/user', userRoutes);

// Handling notes routes
app.use('/api/v1/note', noteRoutes);


// Handling not defined routes
app.use("*", (req, res) => {
  res.send("Oops 404 page not found!");
});

// Middleware for error handling
app.use(errorMiddleware);

export default app;
