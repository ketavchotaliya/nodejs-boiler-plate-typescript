import got from 'got';
import { HOST, IDENTITY } from './config';
import { Authorize, CreateUser } from './identity.d';

const host = HOST().IDENTITY;

class Identity {
  /**
   * @description Create new user
   * @param {String} body
   */
  public async createUser(body: any): Promise<CreateUser.UserDetails> {
    try {
      const uri = `${host}${IDENTITY.CREATE_USER}`;
      const response = await got(uri, {
        method: 'POST',
        json: true,
        body
      });
      return response.body;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Get provider details by email
   * @param {number} appId
   * @param {string} email
   */
  public async getProviderByEmail(appId: number, email: string): Promise<CreateUser.UserDetails> {
    try {
      const uri = `${host}${IDENTITY.GET_PROVIDER(appId, email)}`;
      const res = await got(uri, { json: true, method: 'GET' });
      return res.body;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Replace provider role
   *
   * @param {number} userId
   * @param {number} providerId
   * @param {number} roleId
   */
  public async replaceProviderRole(userId: number | string, providerId: number, roleId: number): Promise<any> {
    try {
      const uri = `${host}${IDENTITY.REPLACE_PROVIDER_ROLE(userId, providerId, roleId)}`;
      const res = await got(uri, { method: 'PUT' });
      return res.body;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Replace provider role
   *
   * @param {number} userId
   * @param {number} providerId
   * @param {number} roleId
   */
  public async replaceStudentRole(userId: number, providerId: number, roleId: number): Promise<any> {
    try {
      const uri = `${host}${IDENTITY.REPLACE_PROVIDER_ROLE(userId, providerId, roleId)}`;
      const res = await got(uri, { method: 'PUT' });
      return res.body;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Get Student details by contact
   * @param {number} appId
   * @param {number} dialCodeCountryId,
   * @param {number} contact,
   */
  public async getStudentByContact(
    appId: number,
    dialCodeCountryId: number,
    contact: number
  ): Promise<CreateUser.UserDetails> {
    try {
      const uri = `${host}${IDENTITY.GET_STUDENT(appId, dialCodeCountryId, contact)}`;
      const res = await got(uri, { json: true, method: 'GET' });
      return res.body;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Delete user by id
   * @param {number} userId
   */
  public async deleteUser(userId: number): Promise<any> {
    try {
      const uri = `${host}${IDENTITY.DELETE_USER(userId)}`;
      const response = await got(uri, {
        method: 'DELETE',
        json: true
      });
      return response.body;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Authorize user
   * @param token
   */
  public async authorizeUser(token: string): Promise<Authorize.ResponseObj> {
    try {
      const uri = `${host}${IDENTITY.AUTHORIZE_USER}`;
      const response = await got(uri, {
        method: 'GET',
        json: true,
        headers: {
          Authorization: `${token}`
        }
      });
      return response.body;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Verify Provider
   * @param userId
   * @param verify
   */
  public async verifyProvider(userId: number, verify: boolean): Promise<any> {
    try {
      const uri = `${host}${IDENTITY.VERIFY_PROVIDER(userId, verify)}`;
      const response = await got(uri, { method: 'PUT', json: true });
      return response.body;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Verify Student
   * @param userId
   * @param verify
   */
  public async verifyStudent(userId: number, verify: boolean): Promise<any> {
    try {
      const uri = `${host}${IDENTITY.VERIFY_STUDENT(userId, verify)}`;
      const response = await got(uri, { method: 'PUT', json: true });
      return response.body;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Activate User
   * @param userId
   * @param active
   */
  public async activateUser(userId: number | string, active: boolean): Promise<CreateUser.UserDetails> {
    try {
      const uri = `${host}${IDENTITY.ACTIVATE_USER(userId, active)}`;
      const response = await got(uri, { method: 'PUT', json: true });
      return response.body;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Private login
   * @param userId
   */
  public async privateLogin(userId: number): Promise<any> {
    try {
      const uri = `${host}${IDENTITY.PRIVATE_LOGIN(userId)}`;
      const response = await got(uri, { method: 'POST', json: true, body: { params: {} } });
      return response.body;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description provider login
   * @param body
   */
  public async providerLogin(body: object): Promise<any> {
    try {
      const uri = `${host}${IDENTITY.PROVIDER_LOGIN}`;
      const response = await got(uri, { method: 'POST', json: true, body });
      return response.body;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description student login
   * @param body
   */
  public async studentLogin(body: object): Promise<any> {
    try {
      const uri = `${host}${IDENTITY.STUDENT_LOGIN}`;
      const response = await got(uri, { method: 'POST', json: true, body });
      return response.body;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Reset Password
   * @param {Object} body
   */
  public async resetPassword(userId: number, body: object): Promise<any> {
    try {
      const uri = `${host}${IDENTITY.RESET_PASSWORD(userId)}`;
      // Form Data
      const response = await got(uri, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;'
        },
        body: JSON.stringify(body)
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description logout user
   * @param {String} token
   */
  public async logout(token: string): Promise<any> {
    try {
      const uri = `${host}${IDENTITY.LOGOUT}`;
      const response = await got(uri, { method: 'GET', json: true, headers: { Authorization: `${token}` } });
      return response.body;
    } catch (error) {
      return error;
    }
  }

  /**
   * @description Generate custom token
   * @param {String} body
   */
  public async generateCustomToken(body: any): Promise<any> {
    try {
      const uri = `${host}${IDENTITY.GENERATE_CUSTOM_TOKEN}`;
      const response = await got(uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(body)
      });
      return response.body;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Get all claims from custom token
   * @param {String} token
   * @param {Array} claims
   */
  public async getAllClaims(token: any): Promise<any> {
    try {
      const uri = `${host}${IDENTITY.GET_ALL_CLAIMS}`;
      const response = await got(uri, { method: 'GET', json: true, headers: { Authorization: token } });
      return response.body;
    } catch (error) {
      return error;
    }
  }

  /**
   * @description Change Password
   * @param {Object} body
   */
  public async changePassword(authorization: string, body: object): Promise<any> {
    try {
      const uri = `${host}${IDENTITY.CHANGE_PASSWORD}`;
      // Form Data
      const response = await got(uri, {
        method: 'PUT',
        headers: {
          Authorization: authorization,
          'Content-Type': 'application/json;'
        },
        body: JSON.stringify(body)
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Update Contact
   * @param {Object} body
   */
  public async updateContact(userId: number, body: object): Promise<any> {
    try {
      const uri = `${host}${IDENTITY.UPDATE_CONTACT(userId)}`;
      const response = await got(uri, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;'
        },
        body: JSON.stringify(body)
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
  /**
   * @description Create bulk user
   * @param {String} body
   */
  public async createBulkUser(body: any): Promise<CreateUser.BulkUserDetails> {
    try {
      const uri = `${host}${IDENTITY.CREATE_BULK_USER}`;
      const response = await got(uri, {
        method: 'POST',
        json: true,
        body
      });
      return response.body;
    } catch (error) {
      throw error;
    }
  }
  /**
   * @description logout all user sesstion
   * @param {String} token
   */
  public async logoutAll(userId: number | string): Promise<any> {
    try {
      const uri = `${host}${IDENTITY.LOGOUT_ALL(userId)}`;
      const response = await got(uri, { method: 'GET', json: true, headers: {} });
      return response.body;
    } catch (error) {
      return error;
    }
  }
}

export default new Identity();
