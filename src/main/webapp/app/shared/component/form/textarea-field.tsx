import React from 'react';
import { Field } from 'react-final-form';

import { composeValidators } from 'app/shared/utils/common';

export interface ITextareaFieldModel {
  placeholder?: string;
  name: string;
  validates?: any;
  className?: any;
  click?: any;
  onChange?: any;
  value?: any;
  classNameInput?: string;
  readOnly?: boolean;
}

const TextareaField: React.SFC<ITextareaFieldModel> = props => {
  const { placeholder, validates, name, className, click, onChange, value, classNameInput, readOnly } = props;

  return (
    <Field
      name={name}
      placeholder={placeholder}
      classNameInput={classNameInput}
      validate={validates ? composeValidators(...validates) : null}
      defaultValue={value}
    >
      {({ input, meta }) => {
        const hasError = meta.submitFailed && meta.error;

        return (
          <div className={`input-content ${className || ''} ${hasError ? 'has-error' : ''}`}>
            <textarea {...input} placeholder={placeholder} className={classNameInput} onClick={click} readOnly={readOnly} />
            {hasError ? <span className="error"> {meta.error} </span> : ''}
          </div>
        );
      }}
    </Field>
  );
};

export { TextareaField };
