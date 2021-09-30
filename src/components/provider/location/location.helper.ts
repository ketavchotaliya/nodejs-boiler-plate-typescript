import { Op } from 'sequelize';
import { Order } from '../../../environment';

class LocationHelper {
  /**
   * @description Get Country order
   * @param sortBy
   * @param sortOrder
   */
  getCountryOrder(sortBy: string, sortOrder: string): Order {
    let orderBy, sortField;
    if (sortBy) {
      if (['country_name', 'code', 'dial_code', 'is_active'].includes(sortBy)) {
        orderBy = [[sortBy, sortOrder]];
        sortField = sortBy;
      } else {
        orderBy = [['country_name', sortOrder]];
        sortField = 'country_name';
      }
    } else {
      orderBy = [['country_name', sortOrder]];
      sortField = 'country_name';
    }
    return { orderBy, sortField };
  }

  /**
   * @description Get State order
   * @param sortBy
   * @param sortOrder
   */
  getStateOrder(sortBy: string, sortOrder: string): Order {
    let orderBy, sortField;
    if (sortBy) {
      if (['state_name', 'country_id'].includes(sortBy)) {
        orderBy = [[sortBy, sortOrder]];
        sortField = sortBy;
      } else {
        orderBy = [['state_name', sortOrder]];
        sortField = 'state_name';
      }
    } else {
      orderBy = [['state_name', sortOrder]];
      sortField = 'state_name';
    }
    return { orderBy, sortField };
  }

  /**
   * @description Get City order
   * @param sortBy
   * @param sortOrder
   */
  getCityOrder(sortBy: string, sortOrder: string): Order {
    let orderBy, sortField;
    if (sortBy) {
      if (['city_name', 'country_id', 'state_id'].includes(sortBy)) {
        orderBy = [[sortBy, sortOrder]];
        sortField = sortBy;
      } else {
        orderBy = [['city_name', sortOrder]];
        sortField = 'city_name';
      }
    } else {
      orderBy = [['city_name', sortOrder]];
      sortField = 'city_name';
    }
    return { orderBy, sortField };
  }

  /**
   * @description Get Country filters
   * @param filters
   */
  getCountryFilters(filters: any): object {
    let condition: any = [];
    for (var key in filters) {
      const data: any = filters[key];

      if (['country_name', 'code', 'dial_code'].includes(key)) {
        condition.push({
          [key]: { [Op.like]: `%${data}%` }
        });
      }
      if (key === 'is_active') {
        if (+data === 0 || +data === 1) {
          condition.push({
            [key]: data
          });
        }
      }
    }
    return condition;
  }

  /**
   * @description Get State filters
   * @param filters
   */
  getStateFilters(filters: any): object {
    let condition: any = [];
    for (var key in filters) {
      const data: any = filters[key];
      if (['state_name'].includes(key)) {
        condition.push({
          [key]: { [Op.like]: `%${data}%` }
        });
      }
      if (key === 'country_id') {
        condition.push({
          [key]: data
        });
      }
    }
    return condition;
  }

  /**
   * @description Get City filters
   * @param filters
   */
  getCityFilters(filters: any): object {
    let condition: any = [];
    for (var key in filters) {
      const data: any = filters[key];
      if (['city_name'].includes(key)) {
        condition.push({
          [key]: { [Op.like]: `%${data}%` }
        });
      }

      if (['state_id', 'country_id'].includes(key)) {
        condition.push({
          [key]: data
        });
      }
    }
    return condition;
  }
}

export default new LocationHelper();
