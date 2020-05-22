import React, { Component } from 'react';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

import { APP_LOCAL_DATE_FORMAT, MONTH_YEAR_JAPAN_FORMAT, MONTH_YEAR_NORMAL_FORMAT } from 'app/shared/constant';
import i18next from 'i18next';

moment.locale(i18next.language);
interface IAtsDatePickerProps {
  datepickerId: string;
  selectedDate: momentPropTypes.momentObj;
  handleChangeDate: (value: momentPropTypes.momentObj) => void;
  placeholder?: string;
}

interface IAtsDatePickerState {
  focused: boolean;
}

class AtsDatePicker extends Component<IAtsDatePickerProps, IAtsDatePickerState> {
  // inputRef = null;
  constructor(props) {
    super(props);
    this.state = {
      focused: false
    };
  }

  handleFocusChange = value => {
    const { focused } = value;
    this.setState({ focused });
  };

  render() {
    const { datepickerId, selectedDate, handleChangeDate, placeholder } = this.props;
    const monthyearFormat = i18next.language === 'ja' ? MONTH_YEAR_JAPAN_FORMAT : MONTH_YEAR_NORMAL_FORMAT;
    return (
      <div className="datepicker-cus">
        <SingleDatePicker
          placeholder={placeholder}
          anchorDirection="left"
          onDateChange={handleChangeDate}
          focused
          monthFormat={monthyearFormat}
          displayFormat={APP_LOCAL_DATE_FORMAT}
          date={selectedDate}
          onFocusChange={this.handleFocusChange}
          id={datepickerId}
          calendarInfoPosition="after"
          numberOfMonths={1}
          noBorder
          hideKeyboardShortcutsPanel
          daySize={32}
          transitionDuration={0}
        />
      </div>
    );
  }
}

export { AtsDatePicker };
