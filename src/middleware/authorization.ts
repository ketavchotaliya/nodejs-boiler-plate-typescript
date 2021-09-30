import { NextFunction } from 'express';
import STATUS_CODES from 'http-status-codes';
import { CustomRequest, CustomResponse } from '../environment';
import { Identity } from '../services';
import { createResponse } from '../utils/helper';
import { logger } from '../utils/logger';

class Authorization {
  /**
   * @description Route Authorization for status check
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  async isAuthorized(req: CustomRequest, res: CustomResponse, next: NextFunction) {
    try {
      const { authorization }: any = req.headers;
      if (!authorization) {
        createResponse(res, STATUS_CODES.UNPROCESSABLE_ENTITY, 'Authorization Token is required.');
      }
      const response = await Identity.authorizeUser(authorization);
      if (!response.active) {
        createResponse(res, STATUS_CODES.UNAUTHORIZED, `Unauthorized access`);
      } else {
        req.user = response;
        next();
      }
    } catch (e) {
      if (e.statusCode !== undefined && e.statusMessage !== undefined) {
        logger.error(__filename, 'isAuthorized', '', 'status Check error', e); // Log
        createResponse(res, e.statusCode, e.body.message);
      } else {
        logger.error(__filename, 'isAuthorized', '', 'status Check error', e); // Log
        createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, `Server Error`);
      }
    }
  }
}

const middlewareObj = new Authorization();
export default middlewareObj;
