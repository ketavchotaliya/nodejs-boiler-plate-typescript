/**
 * Get Role Details API response types
 */
declare namespace CreateUser {
  export interface UserDetails {
    active: boolean;
    dialCode: number;
    email: string;
    emailVerified: boolean;
    id: number;
    mobile: string;
    mobileVerified: boolean;
    roles: number[];
    timeout: number;
  }

  export interface ServiceResponse {
    message: string;
    status: number;
    payload: UserDetails;
  }

  export interface ServiceRequest {
    active?: boolean;
    applicationType: number;
    dialCode?: number;
    email?: string;
    emailVerified?: boolean;
    mobile?: string;
    mobileVerified?: boolean;
    password: string;
    roles?: number[];
  } // bulk user
  export interface BulkUserDetails {
    providerId: number;
    users: {
      active: boolean;
      applicationType: number;
      email: string;
      emailVerified: boolean;
      password: string;
      roles: number[];
    }[];
  }
}

// Authorize user
declare module Authorize {
  interface ResponseObj {
    id: number;
    sessionId: string;
    timeout: number;
    loginDate: number;
    active: boolean;
    stayLoggedIn: boolean;
    userId: number;
    email: string;
    lastAccessDate: number;
    privileges: any[];
    roles: number[];
    appIds: number[];
  }
}

export { CreateUser, Authorize };
