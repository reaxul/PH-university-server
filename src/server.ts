import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import seedSuperAdmin from './app/DB';
import config from './app/config';
import cors from 'cors';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    seedSuperAdmin();
    app.use(cors());
    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', (err) => {
  console.log(`😈 unhandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
