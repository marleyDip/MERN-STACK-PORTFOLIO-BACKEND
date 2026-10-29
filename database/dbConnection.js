import mongoose from "mongoose";

export const dbConnection = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("MONGO_URI is missing in the environment");
  }

  try {
    console.log("Connecting to MongoDB...");

    const conn = await mongoose.connect(uri, {
      dbName: "MERN_STACK_PERSONAL_PORTFOLIO",
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log("MongoDB connected:", conn.connection.host);

    return conn.connection;
  } catch (err) {
    console.error("Database connection failed:", err.message);
    throw err;
  }
};

export default dbConnection;

/* import mongoose from "mongoose";

export const dbConnection = async () => {
  console.log("MongoDB URI configured:", !!process.env.MONGO_URI);
  console.log("MongoDB connection state:", mongoose.connection.readyState);

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_PERSONAL_PORTFOLIO",

      // Improve connection performance
      // maxPoolSize: 10, // number of concurrent DB connections
      maxPoolSize: 5, // number of concurrent DB connections
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1); // stop server if DB fails
  }
};

export default dbConnection; */

/* import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_PERSONAL_PORTFOLIO",
    })
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((err) => {
      console.log(`Some Error Occurred while connecting to Database: ${err}`);
    });
};

export default dbConnection; */
