import React from 'react';
import { Field } from 'react-final-form';

export interface IRadioFieldModel {
  name: string;
  label: string;
  id?: string;
  value?: any;
  classNameItem?: string;
}

const RadioField: React.SFC<IRadioFieldModel> = props => {
  const { name, label, id, value, classNameItem } = props;

  return (
    <Field name={name} type="radio" value={value}>
      {({ input }) => {
        return (
          <div className={classNameItem}>
            <input
              type="radio"
              name={input.name}
              value={value}
              checked={input.checked}
              onChange={input.onChange}
              id={id}
              className="custom-control-input"
            />
            <label htmlFor={id} className="custom-control-label">
              {label}
            </label>
          </div>
        );
      }}
    </Field>
  );
};

export { RadioField };
