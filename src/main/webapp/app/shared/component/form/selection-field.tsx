import React, { Component } from 'react';
import { Field } from 'react-final-form';

import { SelectField } from './select-field';
import { composeValidators } from 'app/shared/utils';
import { ISelectItem } from 'app/shared/model';
import i18next from 'app/shared/locales';

interface ISelectionFieldProps {
  options: ISelectItem[];
  name: string;
  menuPlacement?: string;
  label?: string;
  isRequired?: boolean;
  disabled?: boolean;
  multi?: boolean;
  showThumbnail?: boolean;
  placeholder?: string;
  classNameStyle?: string;
  validates?: any;
  extendOptions?: ISelectItem[];
  noOptionsMessage?: () => string;
  onSelectChange?: any;
}
class SelectionField extends Component<ISelectionFieldProps> {
  render() {
    const {
      options,
      name,
      menuPlacement,
      label,
      isRequired,
      disabled,
      placeholder,
      multi,
      classNameStyle,
      showThumbnail,
      validates,
      extendOptions,
      noOptionsMessage,
      onSelectChange
    } = this.props;

    return (
      <div className="form-group">
        {label && (
          <label className="label-control">
            {label}
            {isRequired && <sup className="required">*</sup>}
          </label>
        )}
        <Field
          name={name}
          options={options}
          extendOptions={extendOptions}
          placeholder={placeholder || i18next.t('component.selectionField.placeholderDefault')}
          menuPlacement={menuPlacement || 'bottom'}
          disabled={disabled}
          multi={multi}
          showThumbnail={showThumbnail}
          className={classNameStyle}
          validate={validates ? composeValidators(...validates) : null}
          noOptionsMessage={noOptionsMessage ? noOptionsMessage : () => i18next.t('component.selectionField.noOptionsMessage')}
        >
          {({ input, meta, ...rest }) => {
            const hasError = meta.touched && meta.error;
            return (
              <div className={`input-content ${hasError ? 'has-error' : ''}`}>
                <SelectField
                  {...input}
                  {...rest}
                  onChange={event => {
                    input.onChange(event);
                    onSelectChange && onSelectChange(event);
                  }}
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

export { SelectionField };
