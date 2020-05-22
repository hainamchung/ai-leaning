import React, { Component } from 'react';
import { Field } from 'react-final-form';
import momentPropTypes from 'react-moment-proptypes';
import { SingleDatePicker } from 'react-dates';
import i18next from 'i18next';
import moment from 'moment';
import _ from 'lodash';

import { MONTH_YEAR_JAPAN_FORMAT, MONTH_YEAR_NORMAL_FORMAT, APPLIED_DATE_FORMAT } from 'app/shared/constant';
import { SelectField } from 'app/shared/component';
import { composeValidators } from 'app/shared/utils';

moment.locale(i18next.language);

interface ICalendarFieldProps {
  placeholder?: string;
  name: string;
  className?: any;
  labelStyle?: string;
  value?: string;
  datepickerId: string;
  selectedDate: momentPropTypes.momentObj;
  handleChangeDate: (value: momentPropTypes.momentObj) => void;
  customInputIcon?: any;
  validates?: any;
  label?: string;
  isRequired?: boolean;
  isOutsideRange?: any;
  showMonthYear?: boolean;
  disabled?: boolean;
}

interface ICalendarFieldState {
  focused: boolean;
  showDefaultInputIcon: boolean;
}
const formatDate = value => moment(value);
const normalizeDate = value => value.value.format();
class InputCalendarField extends Component<ICalendarFieldProps, ICalendarFieldState> {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      showDefaultInputIcon: true
    };
  }

  handleFocusChange = value => {
    const { focused } = value;
    this.setState({ focused });
  };

  renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => {
    const monthOptions = [];
    const yearOptions = [];
    const currentYear = moment().year();
    for (let i = currentYear; i >= currentYear - 80; i--) {
      yearOptions.push({
        label: i,
        value: i
      });
    }

    moment.months().map((label, value) => {
      monthOptions.push({
        label: value + 1,
        value
      });
    });

    const selectedYear = yearOptions.filter(item => item.value === month.year());
    const selectedMonth = monthOptions.filter(item => item.value === month.month());

    _.isEmpty(selectedYear) &&
      selectedYear.push({
        label: month.year(),
        value: month.year()
      });

    return (
      <div className="calendar-select-top">
        <SelectField
          value={selectedMonth}
          options={monthOptions}
          onChange={e => onMonthSelect(month, e.value)}
          className="calendar-dropdown calendar-month"
        />
        <SelectField
          value={selectedYear}
          options={yearOptions}
          onChange={e => onYearSelect(month, e.value)}
          className="calendar-dropdown calendar-year mg-l-5"
        />
      </div>
    );
  };

  render() {
    const { name, validates } = this.props;
    const {
      selectedDate,
      handleChangeDate,
      customInputIcon,
      placeholder,
      label,
      isRequired,
      isOutsideRange,
      showMonthYear,
      disabled,
      labelStyle,
      className
    } = this.props;
    const { focused, showDefaultInputIcon } = this.state;
    const monthyearFormat = i18next.language === 'ja' ? MONTH_YEAR_JAPAN_FORMAT : MONTH_YEAR_NORMAL_FORMAT;

    return (
      <div className="datepicker-iconfield w-100">
        {label && (
          <label className={`label-control ${labelStyle || ''}`}>
            {label}
            {isRequired && <sup className="required">*</sup>}
          </label>
        )}
        <Field name={name} normalize={normalizeDate} format={formatDate} validate={validates ? composeValidators(...validates) : null}>
          {({ input, meta }) => {
            const hasError = meta.submitFailed && meta.error;
            return (
              <div className={`input-content ${className} || ''`}>
                <SingleDatePicker
                  id="calendar"
                  anchorDirection="left"
                  date={selectedDate}
                  focused={focused}
                  showDefaultInputIcon={showDefaultInputIcon}
                  customInputIcon={customInputIcon}
                  monthFormat={monthyearFormat}
                  displayFormat={APPLIED_DATE_FORMAT}
                  calendarInfoPosition="after"
                  placeholder={placeholder}
                  numberOfMonths={1}
                  hideKeyboardShortcutsPanel
                  daySize={32}
                  transitionDuration={0}
                  isOutsideRange={isOutsideRange}
                  onDateChange={value => {
                    input.onChange(value);
                    handleChangeDate(value);
                  }}
                  onFocusChange={this.handleFocusChange}
                  renderMonthElement={showMonthYear ? this.renderMonthElement : null}
                  disabled={disabled}
                />
                {hasError ? <span className="error"> {meta.error} </span> : ''}
              </div>
            );
          }}
        </Field>
      </div>
    );
  }
}

export { InputCalendarField };
