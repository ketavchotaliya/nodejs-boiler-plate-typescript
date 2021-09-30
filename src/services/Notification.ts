import got from 'got';
import { HOST, NOTIFICATION } from './config';

const host = HOST().NOTIFICATION;

class Notification {
  /**
   * @description Send email function
   */
  public async sendEmail(obj: any) {
    try {
      const uri = `${host}${NOTIFICATION.SEND_EMAIL}`;
      const response: any = await got(uri, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
      return response.body;
    } catch (error) {
      throw error;
    }
  }
  public async sendMultiEmail(obj: any) {
    try {
      const uri = `${host}${NOTIFICATION.SEND_MULTIPLE_EMAIL}`;
      const response: any = await got(uri, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
      return response.body;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Send sms function
   */
  public async sendSms(obj: any) {
    try {
      const uri = `${host}${NOTIFICATION.SEND_SMS}`;
      const response: any = await got(uri, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.body;
    } catch (error) {
      throw error;
    }
  }
}

export default new Notification();
