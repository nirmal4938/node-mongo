import express from "express";
import os from "os";
import connectToMongoDB from "./config/connection.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log("hostname", process.env.PORT);
  const databaseName = "learnDb";
  let db = await connectToMongoDB(databaseName);
  console.log("DB", db);
  const hostname = process.env.HOSTNAME || os.hostname();
  console.log(`Server running at http://${hostname}:${PORT}`);
});
