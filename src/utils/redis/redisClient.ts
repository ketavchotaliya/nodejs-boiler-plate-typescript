import redis from 'redis';
import bluebird from 'bluebird';
import { logger } from '../logger';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const REDIS_PORT: any = process.env.REDIS_PORT;
const REDIS_HOST: any = process.env.REDIS_HOST;
const REDIS_PASSWORD: any = process.env.REDIS_PASSWORD;
const REDIS_DB: any = process.env.REDIS_DB;

const redisClient: any = redis.createClient({
  port: REDIS_PORT,
  host: REDIS_HOST,
  password: REDIS_PASSWORD,
  db: REDIS_DB
});

redisClient.on('error', function(err: any) {
  logger.error(__filename, 'redisClient.on->error', '', 'Redis connection error on ' + new Date(), err);
});

redisClient.on('ready', function(success: any) {
  logger.info(__filename, 'redisClient.on->ready', '', 'Redis is ready for use', success);
});

redisClient.on('connect', function(success: any) {
  logger.info(__filename, 'redisClient.on->connect', '', 'redis connected successfully', success);
});

redisClient.on('reconnecting', function(success: any) {
  logger.info(__filename, 'redisClient.on->reconnecting', '', 'Redis reconnecting:' + new Date(), success);
});

redisClient.on('end', function(end: any) {
  logger.info(__filename, 'redisClient.on->end', '', 'Redis server connection has closed:' + new Date(), end);
});

redisClient.on('warning', function(warning: any) {
  logger.info(
    __filename,
    'redisClient.on->warning',
    '',
    'Redis password was set but none is needed:' + new Date(),
    warning
  );
});

export { redisClient };
