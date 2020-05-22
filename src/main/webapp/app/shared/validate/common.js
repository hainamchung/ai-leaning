import moment from 'moment';

import i18next from '../locales';
import { MAX_LENGHT_200, MAX_LENGHT_1000, APP_TIME_FORMAT, APP_LOCAL_DATE_FORMAT, MIN_LENGTH_8 } from '../constant';

export const required = value => (value ? undefined : i18next.t('validates.require'));
export const passwordRequired = value => (value ? undefined : i18next.t('validates.password_required'));
export const emptyString = value => (typeof value && value.trim() ? undefined : i18next.t('validates.require'));
export const maxLength = value =>
  value && value.length > MAX_LENGHT_200 ? i18next.t('validates.max_length', { max_length: MAX_LENGHT_200 }) : undefined;
export const timeFormat = value => (!moment(value, APP_TIME_FORMAT, true).isValid() ? i18next.t('validates.invalid_time') : undefined);
export const datePickerFormat = data =>
  data && data.value && !moment(data.value, APP_LOCAL_DATE_FORMAT, true).isValid() ? i18next.t('validates.invalid_date') : undefined;
export const ageFormat = value => (value > 80 ? i18next.t('validates.max_age_80') : undefined);
export const explanationMaxLength = value =>
  value && value.length > MAX_LENGHT_1000 ? i18next.t('validates.max_length', { max_length: MAX_LENGHT_1000 }) : undefined;

export const required_field = (value, key) => (value ? undefined : i18next.t(key));
export const emptyString_field = (value, key) => (typeof value && value.trim() ? undefined : i18next.t(key));
export const minLength_field = (value, key) => (value && value.length < MIN_LENGTH_8 ? i18next.t(key) : undefined);
