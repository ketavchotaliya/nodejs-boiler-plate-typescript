import { NextFunction, Response } from 'express';
import uuid from 'uuid';
import { CustomRequest } from '../environment';

const uuidFunction = (req: CustomRequest, res: Response, next: NextFunction) => {
  req.custom;
  if (!req.custom) {
    req.custom = {};
  }
  if (req.custom.uuid) {
    next();
  } else {
    req.custom.uuid = uuid();
    next();
  }
};

export default uuidFunction;
