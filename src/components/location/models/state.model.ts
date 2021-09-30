import { Transaction } from 'sequelize';
import { StateMaster } from '../schemas';
import { StateType } from '../types';

class StateModel {
  /**
   * @description Add new state
   * @param stateObj
   * @param transaction
   */
  async addOne(stateObj: StateType, transaction: Transaction | undefined = undefined): Promise<StateType> {
    try {
      const insertedObj = await StateMaster.create(stateObj, {
        transaction: transaction ? transaction : undefined
      });
      return insertedObj;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Add many state
   * @param stateArr
   * @param transaction
   */
  async addMany(stateArr: StateType[], transaction: Transaction | undefined = undefined): Promise<StateType[]> {
    try {
      return await StateMaster.bulkCreate(stateArr, { transaction: transaction ? transaction : undefined });
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Get state by ID
   * @param stateId
   */
  async getSingle(stateId: number): Promise<StateType | null> {
    try {
      return await StateMaster.findByPk(stateId);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Update state by Id
   * @param stateId
   * @param stateObj
   * @param transaction
   */
  async updateOne(stateId: number, stateObj: StateType, transaction: Transaction | undefined = undefined): Promise<any> {
    try {
      await StateMaster.update(stateObj, {
        where: {},
        transaction: transaction ? transaction : undefined
      });
      return;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Get total count of state
   * @param condition
   */
  async getTotal(condition: any = {}): Promise<number> {
    try {
      const count: number = await StateMaster.count({
        where: condition
      });
      return count;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Get state list with zone
   * @param condition
   * @param attributes
   * @param others
   */
  async getMany(condition: any = {}, attributes: string[] = [], other: object = {}): Promise<StateType[]> {
    try {
      return await StateMaster.findAll({
        attributes: attributes.length > 0 ? attributes : undefined,
        where: condition,
        ...other
      });
    } catch (error) {
      throw error;
    }
  }
}

export default new StateModel();
