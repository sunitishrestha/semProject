const { Queue, Worker } = require('bullmq');
const Redis = require('ioredis');
const config = require('../config');

const connection = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
  maxRetriesPerRequest: null,
});

// Email queue
const emailQueue = new Queue('email', { connection });

// Email worker
const emailWorker = new Worker(
  'email',
  async (job) => {
    console.log(`Processing email job ${job.id}:`, job.data);

    const { to, subject, body } = job.data;

    // Add your actual email sending logic here
    console.log(`Sending email to ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${body}`);

    return { success: true, timestamp: new Date() };
  },
  { connection }
);

emailWorker.on('completed', (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

emailWorker.on('failed', (job, err) => {
  console.log(`Job ${job?.id} failed:`, err.message);
});

// Helper function to add jobs
const addEmailJob = async (data) => {
  return await emailQueue.add('send-email', data, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
  });
};

module.exports = {
  emailQueue,
  emailWorker,
  addEmailJob,
};
