export const MAX_LENGHT_127 = 127;
export const MAX_LENGHT_200 = 200;
export const MAX_LENGHT_1000 = 1000;
export const MIN_LENGTH_8 = 8;
export const APP_LOCAL_DATE_FORMAT = 'DD/MM/YYYY';
export const MONTH_YEAR_JAPAN_FORMAT = 'YYYY年MM月';
export const MONTH_YEAR_NORMAL_FORMAT = 'YYYY-MM';
export const DAY_MONTH_LOCALE = 'MM/DD (dd)';
export const DATE_FORMAT_TASK_NOTIFY = 'YYYY/MM/DD(月) HH:mm';
export const APP_TIME_FORMAT = 'H:mm';
export const APPLIED_DATE_FORMAT = 'YYYY/MM/DD';

const emailRFC = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const regexEmailRFC = emailRFC;

export enum CookieKey {
  accessToken = 'accessToken-ai-learning',
  pastUrl = 'pastUrl-ai-learning',
  deviceToken = 'deviceToken-ai-learning',
  userRole = 'userRole-ai-learning'
}
export const lgSize = 1200;

export enum SpecialErrorCode {
  Invitation = 'RS30-1005'
}

export const InvitationSpecialErrorCode = [SpecialErrorCode.Invitation];
