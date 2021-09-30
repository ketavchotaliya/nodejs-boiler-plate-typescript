// Get host details of micro service apps
export const HOST = () => {
  const ENV = process.env.ENV;
  let IDENTITY, NOTIFICATION, PUSH_NOTIFICATION: any;
  if (ENV === 'localhost') {
    IDENTITY = process.env.IDENTITY_SERVICE_DEV;
    NOTIFICATION = process.env.NOTIFICATION_SERVICE_DEV;
    PUSH_NOTIFICATION = process.env.PUSH_NOTIFICATION_SERVICE_DEV;
  } else {
    IDENTITY = process.env.IDENTITY_SERVICE_LIVE;
    NOTIFICATION = process.env.NOTIFICATION_SERVICE_LIVE;
    PUSH_NOTIFICATION = process.env.PUSH_NOTIFICATION_SERVICE_LIVE;
  }
  return {
    IDENTITY,
    NOTIFICATION,
    PUSH_NOTIFICATION
  };
};

// SETUP Identity Service Routes
export const IDENTITY = {
  // Authentication Resources
  PROVIDER_LOGIN: 'identity/login/email',
  STUDENT_LOGIN: 'identity/login/mobile',
  AUTHORIZE_USER: 'private/authorize',
  GENERATE_CUSTOM_TOKEN: 'private/custom/token',
  GET_ALL_CLAIMS: `private/claim`,
  PRIVATE_LOGIN: (userId: number) => `private/user/${userId}/login`,
  LOGOUT: 'identity/logout',
  LOGOUT_ALL: (userId: number | string) => `/private/user/${userId}/logout/all`,

  // User Resources
  CREATE_USER: 'identity/user',
  CREATE_BULK_USER: '/identity/bulk/user',
  GET_PROVIDER: (appId: number, email: string) => `identity/user/app/${appId}/email/${email}`,
  GET_STUDENT: (appId: number, dialCodeId: number, mobile: number) =>
    `identity/user/app/${appId}/mobile/${dialCodeId}/${mobile}`,
  DELETE_USER: (userId: number) => `identity/user/${userId}`,
  VERIFY_PROVIDER: (userId: number, verify: boolean) => `identity/user/${userId}/email/verify/${verify}`,
  VERIFY_STUDENT: (userId: number, verify: boolean) => `identity/user/${userId}/mobile/verify/${verify}`,
  ACTIVATE_USER: (userId: number | string, active: boolean) => `identity/toggle/user/${userId}/active/${active}`,
  UPDATE_CONTACT: (userId: number) => `identity/user/${userId}/mobile`,

  // Role Resources
  REPLACE_PROVIDER_ROLE: (userId: number | string, providerId: number, roleId: number) =>
    `private/user/${userId}/provider/${providerId}/role/${roleId}/replace`,

  // Credential Resources
  RESET_PASSWORD: (userId: number) => `private/user/${userId}/reset/password`,
  CHANGE_PASSWORD: `identity/user/password`
};

// SETUP Notification Service Routes
export const NOTIFICATION = {
  // Email Resources
  SEND_EMAIL: 'email/mime',
  SEND_MULTIPLE_EMAIL: 'email/mime/list',

  // SMS Resources
  SEND_SMS: 'sms'
};

// Push notification routes
export const PUSH_NOTIFICATION = {
  GET_NOTIFICATION_TEMPLATE: 'notification-module/api/v1/template/get',
  SEND_PUSH_NOTIFICATION: 'notification-module/api/v1/notification',
  GET_NOTIFICATION_LIST: 'notification-module/api/v1/notification/list',
  GET_NOTIFICATION_BADGE_COUNT: 'notification-module/api/v1/notification/badgeCount',
  NOTIFICATION_DELETE: 'notification-module/api/v1/notification/delete',
  READ_ALL_NOTIFICATION: 'notification-module/api/v1/notification/readAll',
  VIEW_OR_READ_NOTIFICATION: 'notification-module/api/v1/notification/viewOrRead',
  UNREAD_NOTIFICATION: 'notification-module/api/v1/notification/unread'
};
