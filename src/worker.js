const { emailWorker } = require('./jobs/emailJob');

console.log('✓ Background workers started');
console.log('✓ Email worker listening for jobs...');

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing workers...');
  await emailWorker.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, closing workers...');
  await emailWorker.close();
  process.exit(0);
});
