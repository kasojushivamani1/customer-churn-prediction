import { env } from './config/env.js';
import { connectDB, disconnectDB } from './config/db.js';
import { createApp } from './app.js';

async function main() {
  await connectDB();

  const app = createApp();
  const server = app.listen(env.PORT, () => {
    console.info(`Converso API listening on http://localhost:${env.PORT}/api/v1`);
  });

  const shutdown = (signal) => {
    console.info(`${signal} received, shutting down`);
    server.close(async () => {
      await disconnectDB();
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 10_000).unref();
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

main().catch((err) => {
  console.error('Failed to start server:', err.message);
  process.exit(1);
});
