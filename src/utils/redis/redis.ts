import { redisClient } from './redisClient';

class Redis {
  /**
   * This will set key value pair in redis.
   *
   * It will also set expiry time in seconds if it is applied.
   *
   * @param {any} key     e.g. 'abc'
   * @param {any} value    e.g. 'xyz'
   * @param {integer} time  e.g. 10 (seconds)
   * @return {Promise<any>}
   */
  redisSetValue(key: string, value: string, time: string) {
    return new Promise((resolve, reject) => {
      try {
        const numericeTime = Number(time);
        if (numericeTime > 0) {
          redisClient
            .setAsync(key, value, 'EX', numericeTime)
            .then((res: any) => {
              resolve(res);
            })
            .catch((err: any) => {
              reject(err);
            });
        } else {
          redisClient
            .setAsync(key, value)
            .then((res: any) => {
              resolve(res);
            })
            .catch((err: any) => {
              reject(err);
            });
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  redisGetValue(key: any) {
    return new Promise((resolve, reject) => {
      try {
        redisClient
          .getAsync(key)
          .then((res: any) => {
            resolve(res);
          })
          .catch((err: any) => {
            reject(err);
          });
      } catch (e) {
        reject(e);
      }
    });
  }

  redisDeleteKey(key: any) {
    return new Promise((resolve, reject) => {
      try {
        redisClient
          .delAsync(key)
          .then((response: any) => {
            resolve(response);
          })
          .catch((err: any) => {
            reject(err);
          });
      } catch (e) {
        reject(e);
      }
    });
  }

  redisHMSet(baseKey: any, object: any) {
    return new Promise((resolve, reject) => {
      try {
        redisClient
          .hmsetAsync(baseKey, object)
          .then((response: any) => {
            resolve(response);
          })
          .catch((err: any) => {
            reject(err);
          });
      } catch (e) {
        reject(e);
      }
    });
  }

  redisHMGet(baseKey: any, keyList: any) {
    return new Promise((resolve, reject) => {
      try {
        redisClient
          .hmgetAsync(baseKey, keyList)
          .then((response: any) => {
            resolve(response);
          })
          .catch((err: any) => {
            reject(err);
          });
      } catch (e) {
        reject(e);
      }
    });
  }
}

const redisObj = new Redis();
export default redisObj;
