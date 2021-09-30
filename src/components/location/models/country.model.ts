import { Transaction } from 'sequelize';
import { CountryMaster } from '../schemas';
import { CountryType } from '../types';

class CountryModel {
  /**
   * @description Add new country
   * @param countryObj
   * @param transaction
   */
  async addOne(countryObj: CountryType, transaction: Transaction | undefined = undefined): Promise<CountryType> {
    try {
      const insertedObj = await CountryMaster.create(countryObj, {
        transaction: transaction ? transaction : undefined
      });
      return insertedObj;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Add many country
   * @param countryArr
   * @param transaction
   */
  async addMany(countryArr: CountryType[], transaction: Transaction | undefined = undefined): Promise<CountryType[]> {
    try {
      return await CountryMaster.bulkCreate(countryArr, { transaction: transaction ? transaction : undefined });
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Get country by ID
   * @param countryId
   */
  async getSingle(countryId: number): Promise<CountryType | null> {
    try {
      return await CountryMaster.findByPk(countryId);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Update country by Id
   * @param countryId
   * @param countryObj
   * @param transaction
   */
  async updateOne(
    countryId: number,
    countryObj: CountryType,
    transaction: Transaction | undefined = undefined
  ): Promise<any> {
    try {
      await CountryMaster.update(countryObj, {
        where: {},
        transaction: transaction ? transaction : undefined
      });
      return;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Get total count of country
   * @param condition
   */
  async getTotal(condition: any = {}): Promise<number> {
    try {
      const count: number = await CountryMaster.count({
        where: condition
      });
      return count;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Get country list with zone
   * @param condition
   * @param attributes
   * @param others
   */
  async getMany(condition: any = {}, attributes: string[] = [], other: object = {}): Promise<CountryType[]> {
    try {
      return await CountryMaster.findAll({
        attributes: attributes.length > 0 ? attributes : undefined,
        where: condition,
        ...other
      });
    } catch (error) {
      throw error;
    }
  }
}

export default new CountryModel();
