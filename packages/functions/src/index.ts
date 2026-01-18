import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { createUser, getAllUsers } from "./controllers/userController.js";
import { login } from "./controllers/authController.js";
import { 
  addBlog, getAllBlogs, getBlogById, updateBlog, toggleBlogStatus, uploadBlogImage 
} from "./controllers/blogController.js";
import { 
  addService, getAllServices, getServiceById, updateService, toggleServiceStatus, 
  uploadServiceImage
} from "./controllers/serviceController.js";
import serverless from "serverless-http";

dotenv.config();

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // Limit to 5MB
});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Dr. Chandra API is running...");
});

// User Routes
app.post("/api/users", createUser);
app.get("/api/users", getAllUsers);

app.post("/api/auth/login", login);

app.get("/api/blogs/getAllBlogs", getAllBlogs);
app.post("/api/blogs/addBlog", addBlog);
app.get("/api/blogs/getBlogbyId/:id", getBlogById);
app.put("/api/blogs/updateBlog/:id", updateBlog);
app.put("/api/blogs/:id/toggle", toggleBlogStatus);
app.post("/api/blogs/uploadblogImage", upload.single("image"), uploadBlogImage);

app.get("/api/services/getAllServices", getAllServices);
app.post("/api/services/addService", addService);
app.get("/api/services/getServiceById/:id", getServiceById);
app.put("/api/services/updateService/:id", updateService);
app.put("/api/services/:id/toggle", toggleServiceStatus);
app.post("/api/services/uploadServiceImage", upload.single("image"), uploadServiceImage);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// export const handler = serverless(app);