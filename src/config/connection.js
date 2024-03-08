import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
dotenv.config();
// const uri = `mongodb+srv://${username}:${password}@${cluster}/?authSource=${authSource}&authMechanism=${authMechanism}`;
const uri = process.env.MONGODB_URI;
let uri1 =
  "mongodb://127.0.0.1:27017/learnDb?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function connectToMongoDB(databaseName) {
  try {
    console.log("Connecting to MongoDB...");
    const uriWithDB = `${uri}${databaseName}`;
    const connection = await mongoose.connect(uriWithDB);

    // Connection event listeners
    connection.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });

    connection.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
      // Handle the error appropriately
    });

    connection.connection.on("disconnected", () => {
      console.log("Disconnected from MongoDB");
      // Optionally, handle disconnection events
    });

    return connection;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    // Handle the error appropriately
  }
}

export default connectToMongoDB;
