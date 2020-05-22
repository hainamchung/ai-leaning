import React, { Component } from 'react';
import $ from 'jquery';
import 'timepicker';

interface ITimePickerProps {
  className?: any;
  name: any;
  type: string;
  value?: any;
  placeholder?: any;
  onChange?: any;
  onFocus?: any;
  defaultValue?: any;
}

class TimePicker extends Component<ITimePickerProps> {
  _timepicker = null;
  componentDidMount() {
    this.initDatepicker();
  }

  initDatepicker = () => {
    $(this._timepicker).timepicker({
      appendTo: '.input-time-content',
      closeOnWindowScroll: true,
      timeFormat: 'H:i'
    });
  };

  handleChange = e => {
    const { onChange } = this.props;

    onChange && onChange(e.currentTarget.value);
  };

  render() {
    const { name, type, className, placeholder, defaultValue, onFocus } = this.props;

    return (
      <input
        {...this.props}
        type={type}
        name={name}
        defaultValue={defaultValue}
        className={`timepicker-container ${className || ''}`}
        placeholder={placeholder}
        ref={ref => (this._timepicker = ref)}
        onBlur={e => this.handleChange(e)}
        onChange={e => this.handleChange(e)}
        onFocus={event => {
          onFocus(event);
          event.target.select();
        }}
        autoComplete="off"
      />
    );
  }
}

export { TimePicker };
