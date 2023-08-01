import { config as configDotenv } from "dotenv";
import app from "./app.js";
import connectDatabase from "./config/db.js";

// Load environment variables from .env file
configDotenv();

const port = process.env.PORT || 8001;

// start the express server
app.listen(port, async() => {
  await connectDatabase();
  console.log(`Server is running on port : http://localhost:${port}`);
});
