const config = {
  VERSION: process.env.VERSION
};

export default config;

export const ENV = process.env;
export const FE_URL = process.env.FE_URL;
export const API_URL = process.env.API_URL;
export const serviceName = 'Popolamama';

export const AUTHORITIES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER'
};

export const messages = {
  DATA_ERROR_ALERT: 'Internal Error'
};

export const MEDIUM_DEVICE_MIN = 992;
export const LARGE_DEVICE_MIN = 1200;
