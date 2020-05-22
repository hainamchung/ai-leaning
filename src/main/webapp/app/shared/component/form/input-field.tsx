import React from 'react';
import { Field } from 'react-final-form';

import { composeValidators } from 'app/shared/utils';
import { ButtonIcon } from 'app/shared/component';

export interface IFieldModel {
  placeholder?: string;
  type: string;
  name: string;
  validates?: any;
  prefix?: any;
  className?: any;
  inputRef?: any;
  autoFocus?: boolean;
  value?: string;
  showClearIndicator?: boolean;
  onClear?: any;
  onInputChange?: any;
  readOnly?: boolean;
}

const InputField: React.SFC<IFieldModel> = props => {
  const { placeholder, validates, name, type, value, className, showClearIndicator, onClear, onInputChange, readOnly } = props;

  return (
    <Field
      name={name}
      type={type}
      placeholder={placeholder}
      validate={validates ? composeValidators(...validates) : null}
      defaultValue={value}
      readOnly={readOnly}
    >
      {({ input, meta }) => {
        const hasError = meta.submitFailed && meta.error;
        return (
          <div className={`input-content ${className} ${hasError ? 'has-error' : ''} ${showClearIndicator ? 'input-form-has-icon' : ''}`}>
            <input
              {...input}
              placeholder={placeholder}
              className={`form-control ${showClearIndicator ? 'pd-r-25' : ''}`}
              autoComplete="off"
              onChange={event => {
                input.onChange(event);
                onInputChange && onInputChange(event.target && event.target.value);
              }}
              readOnly={readOnly}
            />
            {showClearIndicator && input.value && (
              <ButtonIcon
                iconName="x"
                iconClass="icon-8"
                containerClass="btn-transparent btn-clear-input btn-icon-pr pt-0"
                onClick={onClear}
              />
            )}
            {hasError ? <span className="error"> {meta.error} </span> : ''}
          </div>
        );
      }}
    </Field>
  );
};

export { InputField };
