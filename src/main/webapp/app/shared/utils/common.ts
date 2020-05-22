import * as jsonapi from 'jsonapi-serializer';
import _ from 'lodash';
import qs from 'qs';
import moment from 'moment';

import i18next from 'app/shared/locales';

import { MONTH_YEAR_JAPAN_FORMAT, SpecialErrorCode, InvitationSpecialErrorCode, CookieKey } from 'app/shared/constant';
import { CookiesStorage } from './local-storage';

const JSONAPIDeserializer = jsonapi.Deserializer;

export function* deserializerResponse(response) {
  return yield new JSONAPIDeserializer({ keyForAttribute: 'camelCase' }).deserialize(response);
}

export function getTabPath(pathname: string) {
  return `/${pathname.split('/')[1]}`;
}

export function getTabType(pathname: string) {
  return pathname.split('/')[2];
}

export function getIdItem(pathname: string) {
  return pathname.split('/')[3];
}
export function composeValidators(...validators) {
  return value => validators.reduce((error, validator) => error || validator(value), undefined);
}

export function extendTaskRouteDetail(path: string) {
  return `${path}/view/:id`;
}

export function getAccessTokenParams(searchQuery: string) {
  const startKey = '?accessToken=';
  return searchQuery.startsWith(startKey) ? searchQuery.split(startKey)[1] : null;
}

export function getCurrentDomain() {
  const parts = window.location.hostname.split('.');
  parts.shift();
  return parts.join('.');
}

export function snakeToCamel(str) {
  const newStr = str;
  return newStr.replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', '')
  );
}

export function convertSnakeObjectToCamel(data) {
  const covertData = {};
  _.forEach(data, (value, key) => {
    if (value) {
      covertData[snakeToCamel(key)] = value;
    }
  });
  return covertData;
}

export function camelToSnake(string) {
  return string.replace(/[\w]([A-Z])/g, m => m[0] + '_' + m[1]).toLowerCase();
}

export function convertCamelObjectToSnake(data, skipNil?: boolean) {
  const covertData = {};
  _.forEach(data, (value, key) => {
    if (skipNil) {
      covertData[camelToSnake(key)] = value === undefined ? null : value;
    } else {
      if (value) {
        covertData[camelToSnake(key)] = value;
      }
    }
  });
  return covertData;
}

export function parseArrayToComma(params: any[]) {
  let data = '';
  params && params.map((value, index) => (data = `${index === 0 ? '' : `${data},`}${value}`));
  return data;
}
export function sleepFunc(sec) {
  return new Promise(resolve => setTimeout(resolve, sec * 1000));
}

export function handlePayloadPushUrl(payload) {
  return _.omitBy(payload, _.isNil);
}

export function handlePayload(payload) {
  const newPayload = {};
  Object.keys(payload).forEach(key => (newPayload[key] = payload[key] === 'all' || payload[key] === '' ? null : payload[key]));
  return _.omitBy(newPayload, _.isNil);
}

export function parseParams(search: string) {
  return qs.parse(search.substr(1)); // remove '?'
}

export function handleBreakCharacterText(text: string) {
  let newText = null;
  if (text) {
    newText = text.replace(/(?:\r\n|\r|\n)/g, '<br>');
  }
  return newText;
}

export function toAscii(value: string): string {
  const charArray: number[] = [];
  for (let i = value.length - 1; 0 <= i; i--) {
    const charCode = (charArray[i] = value.charCodeAt(i));
    switch (true) {
      case charCode <= 0xff5e && 0xff01 <= charCode:
        charArray[i] -= 0xfee0;
        break;
      case charCode === 0x3000:
        charArray[i] = 0x0020;
        break;
      case charCode === 0x30fc:
        charArray[i] = 0x002d;
        break;
      default:
        charArray[i] = charCode;
    }
  }
  return String.fromCharCode.apply(null, charArray);
}

export function convertPeriodData(data: string) {
  const periods = data.split(' - ');
  let periodConvert = '';
  if (periods[0]) periodConvert += moment(periods[0]).isValid() ? `${moment(periods[0]).format(MONTH_YEAR_JAPAN_FORMAT)} - ` : periods[0];
  if (periods[1]) periodConvert += moment(periods[1]).isValid() ? `${moment(periods[1]).format(MONTH_YEAR_JAPAN_FORMAT)}` : periods[1];
  return periodConvert;
}

export function convertYearMonthJapan(dateTime: string) {
  return moment(dateTime).isValid() ? moment(dateTime).format(MONTH_YEAR_JAPAN_FORMAT) : dateTime;
}

export function handleLastItem(list) {
  // Just only set last item when total list greater than 1 item
  if (list && list.length > 1) {
    list[list.length - 1].isLast = true;
  }

  return list;
}

export function historyPushState(pathName) {
  return window.history.pushState('', '', pathName);
}

export function getLastPath() {
  const currentPath = window.location.pathname;
  return currentPath.substring(currentPath.lastIndexOf('/'));
}

export function handleSpecialCode(errorCode) {
  const errorCodes = Object.values(SpecialErrorCode);
  return errorCodes.includes(errorCode);
}

export function isInvitationUrlErrorCode(errorCode) {
  return InvitationSpecialErrorCode.includes(errorCode);
}

async function clearAllCookie() {
  await CookiesStorage.clearCookieData(CookieKey.accessToken);
  await CookiesStorage.clearCookieData(CookieKey.deviceToken);
  await CookiesStorage.clearCookieData(CookieKey.pastUrl);
}

export function clearCookieHandle(calback: () => any) {
  const promiseCookie = new Promise((resolve, reject) => {
    clearAllCookie();
    return resolve();
  });
  return promiseCookie.then(data => Promise.resolve(calback())).catch(error => Promise.reject(error));
}
