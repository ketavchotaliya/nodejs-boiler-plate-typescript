import { Request, Response, Router } from 'express';
import LocationValidations from './location.validation';
import LocationController from './location.controller';
import Authorization from '../../../middleware/authorization';

const router = Router();

/**
 * Country list
 * @route POST /provider/api/v1/location/country/list
 * @group Location - API related to Location routes
 * @security JWT
 * @param {CountryList.model} body.body - Body
 * @returns {object} 200 - Ok
 * @returns {object} 422 - Un processable Entity
 * @returns {object} 500 - Internal server error
 */
/**
 * @typedef CountryList
 * @property {string} search
 * @property {number} rowNumber
 * @property {number} recordsPerPage
 * @property {string} sortBy
 * @property {string} sortOrder
 * @property {string} showAll
 */
router.post(
  '/country/list',
  [/* Authorization.isAuthorized, */ LocationValidations.list],
  (req: Request, res: Response) => {
    LocationController.countryList(req, res);
  }
);

/**
 * State list
 * @route POST /provider/api/v1/location/state/list
 * @group Location - API related to Location routes
 * @security JWT
 * @param {StateList.model} body.body - Body
 * @returns {object} 200 - Ok
 * @returns {object} 422 - Un processable Entity
 * @returns {object} 500 - Internal server error
 */
/**
 * @typedef StateList
 * @property {string} search
 * @property {number} rowNumber
 * @property {number} recordsPerPage
 * @property {string} sortBy
 * @property {string} sortOrder
 * @property {string} showAll
 */
router.post(
  '/state/list',
  [/* Authorization.isAuthorized, */ LocationValidations.list],
  (req: Request, res: Response) => {
    LocationController.stateList(req, res);
  }
);

/**
 * City list
 * @route POST /provider/api/v1/location/city/list
 * @group Location - API related to Location routes
 * @security JWT
 * @param {CityList.model} body.body - Body
 * @returns {object} 200 - Ok
 * @returns {object} 422 - Un processable Entity
 * @returns {object} 500 - Internal server error
 */
/**
 * @typedef CityList
 * @property {string} search
 * @property {number} rowNumber
 * @property {number} recordsPerPage
 * @property {string} sortBy
 * @property {string} sortOrder
 * @property {string} showAll
 */
router.post(
  '/city/list',
  [/* Authorization.isAuthorized, */ LocationValidations.list],
  (req: Request, res: Response) => {
    LocationController.cityList(req, res);
  }
);

export default router;
