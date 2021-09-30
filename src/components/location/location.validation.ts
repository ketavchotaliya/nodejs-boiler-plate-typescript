import { NextFunction, Request, Response } from 'express';
import { createValidationResponse } from '../../../utils/helper';
import { isBoolean, isEmpty, isJSON, isNumber, isString } from '../../../utils/validator';

class LocationValidations {
  /**
   * @description List Location validations
   * @param req
   * @param res
   * @param next
   */
  list(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const { search, rowNumber, recordsPerPage, sortOrder, sortBy, showAll } = req.body;
    const errors: any = {};

    if (isEmpty(authorization)) {
      errors.authorization = res.__('VALIDATIONS.COMMON.authorization.required');
    }

    if (!isEmpty(search) && !isJSON(search)) {
      errors.search = res.__('VALIDATIONS.COMMON.search.json');
    }
    if (!isEmpty(rowNumber) && !isNumber(rowNumber)) {
      errors.rowNumber = res.__('VALIDATIONS.COMMON.rowNumber.valid');
    } else if (!isEmpty(rowNumber) && Number(rowNumber) <= 0) {
      errors.rowNumber = res.__('VALIDATIONS.COMMON.rowNumber.valid');
    }
    if (!isEmpty(recordsPerPage) && !isNumber(recordsPerPage)) {
      errors.recordsPerPage = res.__('VALIDATIONS.COMMON.recordsPerPage.valid');
    }
    if (!isEmpty(sortOrder) && !isString(sortOrder)) {
      errors.sortOrder = res.__('VALIDATIONS.COMMON.sortOrder.valid');
    }
    if (!isEmpty(sortBy) && !isString(sortBy)) {
      errors.sortBy = res.__('VALIDATIONS.COMMON.sortBy.valid');
    }
    if (!isEmpty(showAll) && !isBoolean(showAll)) {
      errors.showAll = res.__('VALIDATIONS.COMMON.showAll.valid');
    }

    if (Object.keys(errors).length > 0) {
      createValidationResponse(res, errors);
    } else {
      next();
    }
  }
}

export default new LocationValidations();
