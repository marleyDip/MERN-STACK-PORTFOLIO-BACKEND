# 🚀 MERN Stack Portfolio Backend

A scalable and production-ready backend API powering my personal portfolio and admin dashboard. Built with **Node.js, Express, and MongoDB**, this project handles authentication, dynamic content management, and file uploads.

---

## 🌐 Live Server

- 🌍 **Portfolio:** https://marleydip.netlify.app  
- 📊 **Dashboard:** https://deep-portfolio-dashboard.netlify.app  

---

## 🧠 Features

- 🔐 JWT Authentication (HTTP-only cookies)
- 📁 File Upload (Avatar & Resume via Cloudinary)
- 🧑 User Profile Management
- 📬 Contact Message System
- 💻 Project Management (CRUD)
- 🛠 Skills Management
- 🧩 Software Applications Section
- 🕒 Timeline Management (Experience & Education)
- ⚡ RESTful API Architecture
- 🛡 Centralized Error Handling

---

## 🛠 Tech Stack

- Backend: Node.js, Express.js  
- Database: MongoDB + Mongoose  
- Authentication: JSON Web Token (JWT)  
- File Upload: Cloudinary, express-fileupload  
- Tools: dotenv, cookie-parser, cors  

---

## 📁 Project Structure

```
marleydip-mern-stack-portfolio-backend/
├── controller/
│   ├── messageController.js
│   ├── projectController.js
│   ├── skillController.js
│   ├── softwareApplicationController.js
│   ├── timelineController.js
│   └── userController.js
├── database/
│   └── dbConnection.js
├── middlewares/
│   ├── auth.js
│   ├── catchAsyncErrors.js
│   └── error.js
├── models/
│   ├── messageSchema.js
│   ├── projectSchema.js
│   ├── skillSchema.js
│   ├── softwareApplicationSchema.js
│   ├── timelineSchema.js
│   └── userSchema.js
├── router/
│   ├── messageRoutes.js
│   ├── projectRoutes.js
│   ├── skillRoutes.js
│   ├── softwareApplicationRoutes.js
│   ├── timelineRoutes.js
│   └── userRoutes.js
├── utils/
│   ├── jwtToken.js
│   └── sendEmail.js
├── app.js
├── server.js
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string

JWT_SECRET_KEY=your_secret_key
COOKIE_EXPIRES=7

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

PORTFOLIO_URL=http://localhost:5173
DASHBOARD_URL=http://localhost:3000
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/marleyDip/MERN-STACK-PORTFOLIO-BACKEND.git
cd MERN-STACK-PORTFOLIO-BACKEND
npm install
npm run dev
```

---

## 📌 API Base URL

```
/api/v1/
```

---

## 🔐 Authentication

- Uses JWT stored in HTTP-only cookies  
- Protected routes require authentication middleware  

---

## 📤 File Upload

- Avatar & Resume handled via Cloudinary  
- Temporary files managed using express-fileupload  

---

## 📦 Available Scripts

```bash
npm run dev   # Development server
npm start     # Production server
```

---

## 💡 Future Improvements

- Role-Based Access Control (RBAC)
- API caching for performance
- Unit & integration testing
- Rate limiting & security enhancements

---

## 👨‍💻 Author

### **[Md Sofian Hasan](https://marleydip.netlify.app/)**
## Full Stack Developer (MERN & PERN)

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---

## 📄 License

This project is licensed under the MIT License.
