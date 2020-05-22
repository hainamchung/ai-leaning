import React from 'react';
import { Field } from 'react-final-form';

import { composeValidators } from 'app/shared/utils';
import { TimePicker, IFieldModel } from 'app/shared/component';

const InputTimePickerField: React.SFC<IFieldModel> = props => {
  const { placeholder, validates, name, type, value, className } = props;

  return (
    <Field
      name={name}
      type={type}
      placeholder={placeholder}
      validate={validates ? composeValidators(...validates) : null}
      defaultValue={value}
    >
      {({ input, meta }) => {
        const hasError = meta.submitFailed && meta.error;
        return (
          <div className={`input-content ${className} ${hasError ? 'has-error' : ''} input-time-content`}>
            <TimePicker {...input} type={type} name={name} placeholder={placeholder} className="form-control" />
            {hasError ? <span className="error"> {meta.error} </span> : ''}
          </div>
        );
      }}
    </Field>
  );
};

export { InputTimePickerField };
