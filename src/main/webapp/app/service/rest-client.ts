import axios from 'axios';
import { isEmpty, get } from 'lodash';
import { notification } from 'antd';
import qs from 'qs';

import i18next from 'app/shared/locales';
import { CookiesStorage, handleSpecialCode } from 'app/shared/utils';

import { API_URL } from 'app/config/constants';
const DEFAULT_APP_URL = {
  baseURL: API_URL,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: CookiesStorage.getAccessToken()
  }
};

export const statusCode = {
  OK: 200,
  NOT_MODIFIED: 304,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOTALLOWED: 405,
  UNPROCESSABLE_ENTITY: 422,
  LOCKED: 423,
  BAD_GATEWAY: 502,
  GATEWAY_TIMEOUT: 504,
  INTERNAL_SERVER_ERROR: 500
};

export default class RestClient {
  config: any;
  constructor(config = {}) {
    this.config = { ...DEFAULT_APP_URL, ...config };
  }

  setBasicAuthAccessToken(accessToken) {
    this.config = { ...this.config, headers: { ...this.config.headers, Authorization: accessToken } };
  }

  setBasicAuth(username, password) {
    this.config = { ...this.config, auth: { username, password } };
  }

  setBaseURL(baseURL) {
    this.config = { ...this.config, baseURL };
  }

  get(url, params = {}, config = {}) {
    return this.executeRequest(url, {
      ...config,
      params
    });
  }

  geturlendCode(url, params = {}, config = {}) {
    return this.executeRequest(url, { ...config, params });
  }

  postUrlEndCode(url, data, config = {}) {
    return this.executeRequest(url, { method: 'post', ...config, data });
  }

  post(url, data, config = {}) {
    return this.executeRequest(url, { method: 'post', ...config, data: qs.stringify(data) });
  }

  put(url, data, config = {}) {
    return this.executeRequest(url, { method: 'put', ...config, data: qs.stringify(data) });
  }

  delete(url, data = {}, config = {}) {
    return this.executeRequest(url, { method: 'delete', ...config, data: qs.stringify(data) });
  }

  patch(url, data = {}, config = {}) {
    return this.executeRequest(url, { method: 'patch', ...config, data: qs.stringify(data) });
  }

  patchUrlEndcode(url, data = {}, config = {}) {
    return this.executeRequest(url, { method: 'patch', ...config, data });
  }

  executeRequest(url, config) {
    const finalHeaderConfig = { ...this.config.headers, ...config.headers };
    const finalConfig = {
      ...this.config,
      url,
      ...config,
      headers: { ...finalHeaderConfig },
      paramsSerializer: (params: any) => qs.stringify(params, { arrayFormat: 'comma', encode: false, skipNulls: true })
    };
    return axios
      .request(finalConfig)
      .then(response => Promise.resolve(response.data))
      .catch(errorResponse => {
        const status = get(errorResponse, 'response.status', '');
        const errorRes = get(errorResponse, 'response.data', { code: 1, data: null, message: ['Network error!'] });
        return handleHttpError(status, errorRes.errors);
      });
  }
}

function handleHttpError(status, errors) {
  const newError = {
    status,
    ...errors
  };

  switch (status) {
    case statusCode.NOT_MODIFIED:
      return Promise.resolve();
    case statusCode.UNAUTHORIZED:
      const promiseCookie = new Promise((resolve, reject) => {
        const currentPath = window.location.pathname;
        return reject({ errors: newError });
      });
      return promiseCookie.then(data => Promise.resolve(data)).catch(error => Promise.reject(error));
    case statusCode.BAD_REQUEST:
    case statusCode.FORBIDDEN:
    case statusCode.NOT_FOUND:
    case statusCode.METHOD_NOTALLOWED:
    case statusCode.UNPROCESSABLE_ENTITY:
    case statusCode.LOCKED:
    case statusCode.GATEWAY_TIMEOUT:
    case statusCode.INTERNAL_SERVER_ERROR:
    case statusCode.BAD_GATEWAY: {
      const { code, detail } = errors[0];

      if (!handleSpecialCode(code)) {
        notification.error({ key: 'updatable', message: !isEmpty(code) ? i18next.t(`errorMessage.${code}`) : detail });
      }

      return Promise.reject(newError);
    }
    default:
      if (status === '') {
        notification.error({ key: 'updatable', message: i18next.t(`errorMessage.networkError`) });
      } else {
        notification.error({ key: 'updatable', message: JSON.stringify(errors) });
      }

      return Promise.reject(newError);
  }
}
