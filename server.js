import { v2 as cloudinary } from "cloudinary";
import app from "./app.js";
import dbConnection from "./database/dbConnection.js";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await dbConnection();

    const server = app.listen(PORT, () => {
      console.log(`Portfolio Server running on port ${PORT}`);
    });

    server.on("error", (err) => {
      console.error("Portfolio Server error:", err);
    });
  } catch (error) {
    console.error("Failed to start Portfolio Server:", error);
    process.exit(1);
  }
};

startServer();

/* const server = app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});

server.on("error", (err) => {
  console.error("Server error:", err);
}); */

/* import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
*/
