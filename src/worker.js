// src/worker.js

require("dotenv").config();
const { emailWorker } = require("./jobs/emailJob");

console.log("========================================");
console.log("✓ Background workers started");
console.log("✓ Email worker listening for jobs...");
console.log("========================================");

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, closing workers...");
  await emailWorker.close();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, closing workers...");
  await emailWorker.close();
  process.exit(0);
});

// Keep process running
process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
});
