import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_PERSONAL_PORTFOLIO",

      // Improve connection performance
      maxPoolSize: 10, // number of concurrent DB connections
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1); // stop server if DB fails
  }
};

export default dbConnection;

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
