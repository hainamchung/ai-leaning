import React from 'react';
import { Field } from 'react-final-form';

import { RadioField, IRadioFieldModel } from './radio-field';
import { composeValidators } from 'app/shared/utils';

export interface IRadioGroupFieldModel {
  className?: string;
  classNameItem?: string;
  name: string;
  options: IRadioFieldModel[];
  validates?: any;
  label?: string;
  isRequired?: boolean;
  value?: any;
  classNameGroup?: string;
}

const RadioGroupField: React.SFC<IRadioGroupFieldModel> = props => {
  const { options, name, className, validates, label, isRequired, classNameGroup, classNameItem } = props;

  return (
    <Field name={name} validate={validates ? composeValidators(...validates) : null}>
      {({ meta }) => {
        const hasError = meta.submitFailed && meta.error;
        return (
          <div className={`custom-group-radio ${className || ''} ${hasError ? 'has-error' : ''}`}>
            {label && (
              <label className="label-control">
                {label}
                {isRequired && <sup className="required">*</sup>}
              </label>
            )}
            <div className={classNameGroup}>
              {options.map((item, index) => (
                <RadioField
                  key={index.toString()}
                  classNameItem={classNameItem}
                  value={item.value}
                  label={item.label}
                  name={name}
                  id={`${name}-${index.toString()}`}
                />
              ))}
            </div>
            {hasError ? <span className="error"> {meta.error} </span> : ''}
          </div>
        );
      }}
    </Field>
  );
};

export { RadioGroupField };
