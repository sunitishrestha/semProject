const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/auth");
const { authenticate } = require("./middleware/auth");
const postRoutes = require("./routes/post");
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const venueRoutes = require("./routes/venueRoutes");
const requirementRoutes = require("./routes/requirementRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const participationRoutes = require("./routes/participationRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const sponsorRoutes = require("./routes/sponsorRoutes");

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/departments", departmentRoutes);

app.use("/api/users", authenticate, userRoutes);
app.use("/api/profiles", authenticate, profileRoutes);

app.use("/api/requirements", authenticate, requirementRoutes);
app.use("/api/volunteers", authenticate, volunteerRoutes);
app.use("/api/participations", authenticate, participationRoutes);
app.use("/api/tickets", authenticate, ticketRoutes);
app.use("/api/sponsors", authenticate, sponsorRoutes);

// Protected route example
app.get("/api/me", authenticate, (req, res) => {
  res.json({ user: req.user });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
