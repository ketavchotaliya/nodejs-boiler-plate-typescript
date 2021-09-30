import STATUS_CODES from 'http-status-codes';
import { CustomRequest, CustomResponse, Pager } from '../../../environment';
import { RECORDS_PER_PAGE } from '../../../utils/constants';
import { createResponse, getDefaultSortOrder } from '../../../utils/helper';
import { logger } from '../../../utils/logger';
import LocationHelper from './location.helper';
import { CountryModel, StateModel, CityModel } from './models';

class LocationController {
  /**
   * @description Country list
   * @param req
   * @param res
   */
  async countryList(req: CustomRequest, res: CustomResponse) {
    try {
      let { search, rowNumber, recordsPerPage, sortOrder, sortBy, showAll } = req.body;
      rowNumber = rowNumber ? +rowNumber : 1;
      recordsPerPage = recordsPerPage ? +recordsPerPage : RECORDS_PER_PAGE;

      // Set sort order
      sortOrder = getDefaultSortOrder(sortOrder);
      const { orderBy, sortField } = LocationHelper.getCountryOrder(sortBy, sortOrder);

      const other = {
        order: orderBy,
        offset: !showAll ? rowNumber - 1 : undefined,
        limit: !showAll ? recordsPerPage : undefined
      };

      let condition: any = [];
      // search filter
      if (search) {
        const filters = JSON.parse(search);
        condition = LocationHelper.getCountryFilters(filters);
      }
      // Get records
      const totalCount = !showAll ? await CountryModel.getTotal(condition) : undefined;
      const list = await CountryModel.getMany(condition, [], other);

      // If show all then pager will be empty
      const pager: Pager | {} = showAll
        ? {}
        : {
            sortField,
            sortOrder,
            rowNumber,
            recordsPerPage,
            filteredRecords: list.length,
            totalRecords: totalCount
          };

      createResponse(res, STATUS_CODES.OK, res.__('LOCATION.COUNTRY_LIST'), list, pager);
    } catch (error) {
      logger.error(__filename, 'countryList', req.custom.uuid, 'countryList', error);
      createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, res.__('SERVER_ERROR'));
    }
  }

  /**
   * @description State list
   * @param req
   * @param res
   */
  async stateList(req: CustomRequest, res: CustomResponse) {
    try {
      let { search, rowNumber, recordsPerPage, sortOrder, sortBy, showAll } = req.body;
      rowNumber = rowNumber ? +rowNumber : 1;
      recordsPerPage = recordsPerPage ? +recordsPerPage : RECORDS_PER_PAGE;

      // Set sort order
      sortOrder = getDefaultSortOrder(sortOrder);
      const { orderBy, sortField } = LocationHelper.getStateOrder(sortBy, sortOrder);

      const other = {
        order: orderBy,
        offset: !showAll ? rowNumber - 1 : undefined,
        limit: !showAll ? recordsPerPage : undefined
      };

      let condition: any = [];
      // search filter
      if (search) {
        const filters = JSON.parse(search);
        condition = LocationHelper.getStateFilters(filters);
      }
      // Get records
      const totalCount = !showAll ? await StateModel.getTotal(condition) : undefined;
      const list = await StateModel.getMany(condition, [], other);

      // If show all then pager will be empty
      const pager: Pager | {} = showAll
        ? {}
        : {
            sortField,
            sortOrder,
            rowNumber,
            recordsPerPage,
            filteredRecords: list.length,
            totalRecords: totalCount
          };

      createResponse(res, STATUS_CODES.OK, res.__('LOCATION.STATE_LIST'), list, pager);
    } catch (error) {
      logger.error(__filename, 'stateList', req.custom.uuid, 'stateList', error);
      createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, res.__('SERVER_ERROR'));
    }
  }

  /**
   * @description City list
   * @param req
   * @param res
   */
  async cityList(req: CustomRequest, res: CustomResponse) {
    try {
      let { search, rowNumber, recordsPerPage, sortOrder, sortBy, showAll } = req.body;
      rowNumber = rowNumber ? +rowNumber : 1;
      recordsPerPage = recordsPerPage ? +recordsPerPage : RECORDS_PER_PAGE;

      // Set sort order
      sortOrder = getDefaultSortOrder(sortOrder);
      const { orderBy, sortField } = LocationHelper.getCityOrder(sortBy, sortOrder);

      const other = {
        order: orderBy,
        offset: !showAll ? rowNumber - 1 : undefined,
        limit: !showAll ? recordsPerPage : undefined
      };

      let condition: any = [];
      // search filter
      if (search) {
        const filters = JSON.parse(search);
        condition = LocationHelper.getCityFilters(filters);
      }
      // Get records
      const totalCount = !showAll ? await CityModel.getTotal(condition) : undefined;
      const list = await CityModel.getMany(condition, [], other);

      // If show all then pager will be empty
      const pager: Pager | {} = showAll
        ? {}
        : {
            sortField,
            sortOrder,
            rowNumber,
            recordsPerPage,
            filteredRecords: list.length,
            totalRecords: totalCount
          };

      createResponse(res, STATUS_CODES.OK, res.__('LOCATION.CITY_LIST'), list, pager);
    } catch (error) {
      logger.error(__filename, 'cityList', req.custom.uuid, 'cityList', error);
      createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, res.__('SERVER_ERROR'));
    }
  }
}

export default new LocationController();
