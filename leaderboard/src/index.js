import express from "express";
import { connectDb } from "./config/dbConenction.js";
import cors from "cors"
import path from 'path';
// *********** All-Routes *************
import auth from "./routes/auth.routes.js";
import user from "./routes/user.routes.js";
// *********** All-Routes *************


const _dirname = path.resolve();

import cookieParser from "cookie-parser";
const app = express();
// Use cors middleware
app.use(cors());

app.use(
  cors({
    origin: "https://nexorand-89p4.onrender.com", // Replace with the frontend's URL (React app)
    methods: "GET,POST,PUT,DELETE,PATCH", // Allowed methods
  })
);

//middle wares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// *********** All-Routes *************

app.get("/", (req, res) => {
  res.json("I'm coming from backend");
});
app.use("/api/auth/v1", auth);
app.use("/api/user/v1", user);

// for wrong apis
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found. Please check the URL and try again.",
  });
});

// Error handling middleware (optional, for other server errors)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Internal server error.",
    error: err.message,
  });
});


app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
});

const PORT = process.env.PORT || 8080

app.listen(PORT, async () => {
  console.log("Server is running on port 7000");
  await connectDb();
});
