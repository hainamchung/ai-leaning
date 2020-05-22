export * from './common';

import { MIN_LENGTH_8, regexEmailRFC, MAX_LENGHT_127 } from 'app/shared/constant';
import i18next from 'app/shared/locales';

export const passwordValidate = [
  value => (value ? undefined : i18next.t('loginContainer.validates.password.require')),
  value => (value && value.length < MIN_LENGTH_8 ? i18next.t('loginContainer.validates.password.min_length') : undefined)
];

export const confirmPassword = (value, confirmValue, key = null) => {
  if (value && value !== confirmValue) {
    return key ? i18next.t(key) : i18next.t('validates.confirm_failed');
  }

  return undefined;
};

export const emailValidate = [
  value => ((value || '').trim() ? undefined : i18next.t('loginContainer.validates.email.require')),
  value =>
    value && value.trim().length > MAX_LENGHT_127 ? i18next.t('validates.email.max_length', { max_length: MAX_LENGHT_127 }) : undefined,
  value => (!regexEmailRFC.test(value.trim()) ? i18next.t('loginContainer.validates.email.format') : undefined)
];

export const required_field = (value, key) => (value ? undefined : i18next.t(key));
