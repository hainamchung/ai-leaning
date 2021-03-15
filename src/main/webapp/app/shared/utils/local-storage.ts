import moment from 'moment';
import Cookies from 'universal-cookie';

import { getCurrentDomain } from 'app/shared/utils';
import { CookieKey } from 'app/shared/constant';
import { ENV } from 'app/config/constants';

const USER_DATA = 'pts-ai-learning-user-data';
const History_Storage = 'historyStorage';

function isExpired(time) {
  const now = moment();
  const checkedTime = moment(time);

  if (!checkedTime.isValid()) return true;
  if (now.isAfter(checkedTime)) return true;

  return false;
}

export const HistoryStorage = {
  setData(res) {
    localStorage.setItem(History_Storage, JSON.stringify(res));
  },
  clearData() {
    localStorage.removeItem(History_Storage);
  },
  getHistory() {
    const storedData = JSON.parse(localStorage.getItem(History_Storage));
    return storedData;
  }
};

export const UserStorage = {
  setAccessTokenAuthen(res, remember) {
    remember ? localStorage.setItem(USER_DATA, res) : sessionStorage.setItem(USER_DATA, res);
  },
  setData(res, remember) {
    remember ? localStorage.setItem(USER_DATA, res) : sessionStorage.setItem(USER_DATA, res);
  },
  clearData() {
    localStorage.removeItem(USER_DATA);
    sessionStorage.removeItem(USER_DATA);
  },
  getRole() {
    const currentUser = JSON.parse(localStorage.getItem(USER_DATA));
    return (currentUser || {}).role;
  },

  getCurrentInfo() {
    const currentUser = JSON.parse(localStorage.getItem(USER_DATA));
    return currentUser;
  },

  authenticated() {
    const storedData = JSON.parse(localStorage.getItem(USER_DATA)) || JSON.parse(sessionStorage.getItem(USER_DATA));
    if (!storedData) return null;
    if (isExpired(storedData.expires_on)) return null;
    return storedData;
  }
};

const cookies = new Cookies();
export const CookiesStorage = {
  getCookieData(key: string) {
    return cookies.get(`${key}-${ENV}`);
  },
  setCookieData(key: string, data: string) {
    const domain = getCurrentDomain();
    const expires = moment()
      .add(1, 'day')
      .toDate();
    cookies.set(`${key}-${ENV}`, data, { domain, expires, path: '/' });
  },
  clearCookieData(key) {
    const domain = getCurrentDomain();
    cookies.remove(`${key}-${ENV}`, { domain, path: '/' });
  },
  getAccessToken() {
    return cookies.get(`${CookieKey.accessToken}-${ENV}`);
  },
  setAccessToken(accessToken) {
    const domain = getCurrentDomain();
    const expires = moment()
      .add(1, 'day')
      .toDate();
    cookies.set(`${CookieKey.accessToken}-${ENV}`, accessToken, { domain, expires });
  },
  clearData() {
    const domain = getCurrentDomain();
    cookies.remove(`${CookieKey.accessToken}-${ENV}`, { domain });
  },
  authenticated() {
    const accessToken = cookies.get(`${CookieKey.accessToken}-${ENV}`);
    // todo more case - ext: check expired time
    return accessToken !== undefined;
  }
};
