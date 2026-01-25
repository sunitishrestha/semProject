// src/jobs/emailJob.js

const { Queue, Worker } = require("bullmq");
const Redis = require("ioredis");
const config = require("../config");

// Connect to Redis
const connection = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

// Create queue
const emailQueue = new Queue("email", { connection });

// Create worker to process jobs
const emailWorker = new Worker(
  "email", // Queue name
  async (job) => {
    // This function processes each job
    console.log(`Processing job ${job.id} - ${job.name}`);
    console.log("Job data:", job.data);

    const { to, subject, body, template } = job.data;

    // Send email (replace with actual email service)
    console.log(`Sending email to ${to}`);
    console.log(`Subject: ${subject}`);

    // Simulate email sending
    await sendEmail(to, subject, body, template);

    // Return result (optional, stored in Redis)
    return {
      success: true,
      sentAt: new Date(),
      to,
      subject,
    };
  },
  {
    connection,

    // Worker options
    concurrency: 5, // Process 5 jobs simultaneously

    // Rate limiting
    limiter: {
      max: 10, // Max 10 jobs
      duration: 1000, // Per 1 second
    },
  },
);

// Event handlers for monitoring
emailWorker.on("completed", (job, result) => {
  console.log(`✓ Job ${job.id} completed successfully`);
  console.log("Result:", result);
});

emailWorker.on("failed", (job, err) => {
  console.log(`✗ Job ${job.id} failed`);
  console.error("Error:", err.message);
});

emailWorker.on("progress", (job, progress) => {
  console.log(`Job ${job.id} progress: ${progress}%`);
});

emailWorker.on("stalled", (jobId) => {
  console.log(`Job ${jobId} stalled (worker crashed)`);
});

// Helper function to add jobs to queue
const addEmailJob = async (data, options = {}) => {
  return await emailQueue.add("send-email", data, {
    // Retry options
    attempts: 3, // Retry up to 3 times
    backoff: {
      type: "exponential", // Wait longer between each retry
      delay: 2000, // Start with 2 second delay
    },

    // Remove job after completion
    removeOnComplete: {
      age: 3600, // Keep completed jobs for 1 hour
      count: 100, // Keep max 100 completed jobs
    },

    // Remove job after failure
    removeOnFail: {
      age: 24 * 3600, // Keep failed jobs for 24 hours
    },

    // Custom options
    ...options,
  });
};

// Add priority job
const addUrgentEmailJob = async (data) => {
  return await addEmailJob(data, {
    priority: 1, // Higher priority (lower number = higher priority)
  });
};

// Add delayed job
const addScheduledEmailJob = async (data, delayMs) => {
  return await addEmailJob(data, {
    delay: delayMs, // Delay in milliseconds
  });
};

// Mock email sending function
const sendEmail = async (to, subject, body, template) => {
  // Replace with actual email service (SendGrid, AWS SES, etc.)
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Email sent successfully");
};

module.exports = {
  emailQueue,
  emailWorker,
  addEmailJob,
  addUrgentEmailJob,
  addScheduledEmailJob,
};
