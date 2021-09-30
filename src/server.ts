import { createServer } from 'http';
import { config } from 'dotenv';
import { resolve } from 'path';
import { logger } from './utils/logger';
/**
 * Load Env
 */
config({ path: resolve(__dirname, '../.env') });

/**
 * Load App
 */
import app from './app';
import sequelize from './utils/dbConfig';

const server = createServer(app);
const port: number = Number(process.env.PORT || 3000);

(async () => {
  try {
    await sequelize.authenticate();
    logger.info(__filename, '', '', `DB Connection has been established successfully`, ``);

    server.listen(port, () => {
      logger.info(__filename, '', '', `Server is running on ${port}`, ``);
    });
  } catch (e) {
    logger.error(__filename, '', '', `Unable to connect to the server`, e);
    process.exit(1);
  }
})();
