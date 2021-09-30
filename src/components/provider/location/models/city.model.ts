import { Transaction } from 'sequelize';
import { CityMaster } from '../schemas';
import { CityType } from '../types';

class CityModel {
  /**
   * @description Add new city
   * @param cityObj
   * @param transaction
   */
  async addOne(cityObj: CityType, transaction: Transaction | undefined = undefined): Promise<CityType> {
    try {
      const insertedObj = await CityMaster.create(cityObj, {
        transaction: transaction ? transaction : undefined
      });
      return insertedObj;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Add many city
   * @param cityArr
   * @param transaction
   */
  async addMany(cityArr: CityType[], transaction: Transaction | undefined = undefined): Promise<CityType[]> {
    try {
      return await CityMaster.bulkCreate(cityArr, { transaction: transaction ? transaction : undefined });
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Get city by condition
   * @param whereObj
   */
  async getSingle(whereObj: any): Promise<CityType | null> {
    try {
      return await CityMaster.findOne({
        where: whereObj
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Update city by Id
   * @param cityId
   * @param cityObj
   * @param transaction
   */
  async updateOne(cityId: number, cityObj: CityType, transaction: Transaction | undefined = undefined): Promise<any> {
    try {
      await CityMaster.update(cityObj, {
        where: {},
        transaction: transaction ? transaction : undefined
      });
      return;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Get total count of city
   * @param condition
   */
  async getTotal(condition: any = {}): Promise<number> {
    try {
      const count: number = await CityMaster.count({
        where: condition
      });
      return count;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Get city list with zone
   * @param condition
   * @param attributes
   * @param others
   */
  async getMany(condition: any = {}, attributes: string[] = [], other: object = {}): Promise<CityType[]> {
    try {
      return await CityMaster.findAll({
        attributes: attributes.length > 0 ? attributes : undefined,
        where: condition,
        ...other
      });
    } catch (error) {
      throw error;
    }
  }
}

export default new CityModel();
