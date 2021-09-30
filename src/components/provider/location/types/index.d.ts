declare module LocationMaster {
  export interface CountryType {
    country_id?: number;
    country_name?: string;
    code?: string;
    dial_code?: string;
    is_active?: number;
  }

  export interface StateType {
    state_id?: number;
    state_name?: string;
    country_id?: number;
  }

  export interface CityType {
    city_id?: number;
    city_name?: string;
    state_id?: number;
    country_id?: number;
    is_user_defined?: number;
  }
}

export = LocationMaster;
