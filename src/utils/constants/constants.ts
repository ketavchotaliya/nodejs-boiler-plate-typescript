// Reg ex list
export const REGEXP = {
  DATE_FORMAT: /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/,
  DATE_TIME_FORMAT: /^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01]) (00|0[1-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/,
  PASSWORD_REGEXP: /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z])(.{8,}))$/,
  ALPHA_NUMERIC_REGEXP: /^[A-Za-z0-9 ]*$/,
  ALPHABETS_REGEXP: /^[A-Za-z ]*$/,
  EMAIL_ADDRESS_REGEXP: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  URL: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
};

export const RECORDS_PER_PAGE = 10;
export const RECORDS_PER_PAGE_FOR_PROVIDER_MATERIAL_LIST = 15;

// APP id list
export const APP = {
  IDENTITY: 1
};

// APP Hosts
export const HOST: Function = () => {
  const ENV = process.env.ENV;
  if (ENV === 'development') {
    return {
      ADMIN: `http://dev.google.com`
    };
  } else if (ENV === 'test') {
    return {
      ADMIN: `http://test.google.com`
    };
  } else {
    return {
      ADMIN: `http://dev-admin.google.com`
    };
  }
};

export const APP_HOSTS = {
  ADMIN: HOST().ADMIN
};

// APP Links
export const APP_LINKS = {
  SET_PASSWORD: '/reset-password'
};

// s3 buckets
export const S3_BUCKETS = {
  S3_USER_PRIVATE_BUCKET: process.env.S3_USER_PRIVATE_BUCKET
};

// FILE UPLOAD PATH
export const S3_UPLOAD_PATH = {
  BREAKDOWN_SHEET: 'breakdown'
};

// s3 bucket ACL permissions
export const S3_ACL_PERMISSIONS = {
  PRIVATE: 'private',
  PUBLIC_READ: 'public-read',
  PUBLIC_READ_WRITE: 'public-read-write'
};

// Email template code List
export const EMAIL_TEMPLATE_CODES = {
  FORGOT_PASSWORD_PROVIDER: 'FORGOT_PASSWORD_PROVIDER',
  SIGN_UP_PROVIDER_OTP: 'SIGN_UP_PROVIDER_OTP',
  USER_INVITATION: 'USER_INVITATION',
  RESEND_OTP: 'RESEND_OTP',
  EDIT_USER_INVITATION: 'EDIT_USER_INVITATION',
  CONTACT_US: 'CONTACT_US'
};

// Redis TTL
export const REDIS_TTL = '180';

// System App Types
export const APP_TYPES = {
  STUDENT: 1,
  PROVIDER: 2,
  ADMIN: 3
};

// System roles
export const ROLES = {
  ADMIN: 0,
  OWNER: 1
};
export const ROLES_NAME = ['Owner', 'Admin'];
export const ALLOWED_FILE_TYPES: any = ['image/png', 'image/jpeg', 'image/jpg'];

export const ALLOWED_FILE_SIZE: number = 5; // in MB

export const SENDER_EMAIL = 'noreply@google.com';
export const ENROLLMENT_STATUS = { PENDING: 1, ACCEPTED: 2, REJECTED: 3 };
export const PARTICIPANT_STATUS = {
  WAITING: 1,
  ACTIVE: 2,
  IDLE: 3
};

export const MICRO_SERVICE = {
  IDENTITY: 1
};

export const TO_USER_ID = 1;

export const EMAIL_TEMPLATE_ADDRESS = 'Copyright 2020 | Google Inc';

export const STUDENT_VERIFYING_SUBJECTS = {
  VERIFY_FORGOT_PASSWORD_OTP: 'VERIFY_FORGOT_PASSWORD_OTP',
  RESET_FORGOT_PASSWORD: 'RESET_FORGOT_PASSWORD',
  SIGN_UP: 'SIGN_UP'
};

export const SMS_TEXT_CONTENT = '<#>Your Verification Code for XYZ is:';

export const PROVIDER_VERIFYING_SUBJECTS = {
  VERIFY_FORGOT_PASSWORD_OTP: 'VERIFY_FORGOT_PASSWORD_OTP',
  RESET_FORGOT_PASSWORD: 'RESET_FORGOT_PASSWORD',
  SIGN_UP: 'SIGN_UP'
};
