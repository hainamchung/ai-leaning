import React from 'react';
import { Field } from 'react-final-form';
import { Checkbox } from 'antd';

import {
  IFieldModel,
  InputField,
  ISelectFieldModel,
  SelectField,
  RadioField,
  IRadioFieldModel,
  InputTimePickerField,
  TextareaField
} from './index';
import { Suggestion, ISuggestionProps, ITextareaFieldModel } from '../index';
import { composeValidators } from 'app/shared/utils';
import { ISelectItem } from 'app/shared/model';
export interface IFieldGroupProps extends IFieldModel {
  label?: string;
  isRequired?: boolean;
  value?: string;
  readOnly?: boolean;
  labelStyle?: string;
}

interface IOnlyViewField extends IFieldGroupProps {
  value: any;
  classNameValue?: any;
}

interface ISelectFieldProps extends ISelectFieldModel {
  label?: string;
  isRequired?: boolean;
  extendOptions?: ISelectItem[]; // add option: none and all
  validates?: any;
  classNameContent?: string;
}

interface ISuggestionFieldProps extends ISuggestionProps {
  label?: string;
  isRequired?: boolean;
  validates?: any;
  classNameContent?: string;
}

interface IOnlyTextareaField extends ITextareaFieldModel {
  label?: string;
  isRequired?: boolean;
  value?: string;
  readOnly?: boolean;
  classNameInput?: any;
  labelStyle?: string;
}

const NormalViewOnlyField: React.SFC<IOnlyViewField> = props => {
  const { label, value, classNameValue, className } = props;
  return (
    <div className={`form-group ${className || ''}`}>
      {label && <label className="label-control">{label}</label>}
      <div className="input-content">
        <span className={`value-control ${classNameValue || ''}`}>{value}</span>
      </div>
    </div>
  );
};

const NormalField: React.SFC<IFieldGroupProps> = props => {
  const { label, isRequired, labelStyle } = props;
  return (
    <div className="form-group">
      {label && (
        <label className={`label-control ${labelStyle || ''}`}>
          {label}
          {isRequired && <sup className="required">*</sup>}
        </label>
      )}
      <InputField {...props} />
    </div>
  );
};

const NormalTimePickerField: React.SFC<IFieldGroupProps> = props => {
  const { label, isRequired } = props;
  return (
    <div className="form-group">
      {label && (
        <label className="label-control">
          {label}
          {isRequired && <sup className="required">*</sup>}
        </label>
      )}
      <InputTimePickerField {...props} />
    </div>
  );
};

const NormalSelectField: React.SFC<ISelectFieldProps> = props => {
  const { label, name, value, options, className, isRequired, extendOptions, validates, classNameContent } = props;
  const selectionOptions = extendOptions
    ? {
        ...options,
        ...extendOptions
      }
    : options;
  return (
    <div className="form-group">
      {label && (
        <label className="label-control">
          {label}
          {isRequired && <sup className="required">*</sup>}
        </label>
      )}
      <Field name={name} options={selectionOptions} defaultValue={value} validate={validates ? composeValidators(...validates) : null}>
        {({ input, meta }) => {
          const hasError = meta.touched && meta.error;
          return (
            <div className={`input-content ${classNameContent || ''} ${hasError ? 'has-error' : ''}`}>
              <SelectField {...input} {...props} />
              {hasError ? <span className="error"> {meta.error} </span> : ''}
            </div>
          );
        }}
      </Field>
    </div>
  );
};

const NormalSuggestionField: React.SFC<ISuggestionFieldProps> = props => {
  const { label, name, value, options, className, isRequired, validates, classNameContent } = props;
  return (
    <div className="form-group">
      {label && (
        <label className="label-control">
          {label}
          {isRequired && <sup className="required">*</sup>}
        </label>
      )}
      <Field name={name} options={options} defaultValue={value} validate={validates ? composeValidators(...validates) : null}>
        {({ input, meta }) => {
          const hasError = meta.submitFailed && meta.error;
          return (
            <div className={`input-content ${classNameContent || ''} ${hasError ? 'has-error' : ''}`}>
              <Suggestion {...input} {...props} />
              {hasError ? <span className="error"> {meta.error} </span> : ''}
            </div>
          );
        }}
      </Field>
    </div>
  );
};

const CheckboxField: React.SFC<IFieldGroupProps> = props => {
  const { placeholder, validates, name, type } = props;
  return (
    <div className="form-group">
      <Field name={name} type={type} placeholder={placeholder} validate={validates ? composeValidators(...validates) : null}>
        {({ input, meta }) => {
          const hasError = meta.touched && meta.error;
          return (
            <div className={`custom-control custom-checkbox input-content ${hasError ? 'has-error' : ''}`}>
              <Checkbox {...input}>{props.children}</Checkbox>
              {hasError ? <span className="error"> {meta.error} </span> : ''}
            </div>
          );
        }}
      </Field>
    </div>
  );
};

const NormalRadioField: React.SFC<IRadioFieldModel> = props => <RadioField {...props} />;

const NormalTextereaField: React.SFC<IOnlyTextareaField> = props => {
  const { label, isRequired, labelStyle } = props;
  return (
    <div className="form-group">
      {label && (
        <label className={`label-control ${labelStyle || ''}`}>
          {label}
          {isRequired && <sup className="required">*</sup>}
        </label>
      )}
      <TextareaField {...props} />
    </div>
  );
};

export {
  NormalField,
  CheckboxField,
  NormalViewOnlyField,
  NormalSelectField,
  NormalSuggestionField,
  NormalRadioField,
  NormalTimePickerField,
  NormalTextereaField
};
