import React from 'react';
import Select, { components } from 'react-select';
import { ISelectItem } from 'app/shared/model/layout';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ButtonIcon } from 'app/shared/component';

export interface ISelectFieldModel {
  placeholder?: string;
  name?: string;
  value?: any;
  className?: any;
  disabled?: boolean;
  multi?: boolean;
  showList?: boolean;
  options?: ISelectItem[];
  showThumbnail?: boolean;
  onChange?: any;
  onRemove?: any;
  menuPlacement?: string;
  extendOptions?: ISelectItem[];
  noOptionsMessage?: () => string;
}

const ClearIndicator = props =>
  components.ClearIndicator && (
    <components.ClearIndicator className="select-clear-indicator" {...props}>
      <i className="delete-icon opleicon-x" />
    </components.ClearIndicator>
  );

const IndicatorSeparator = props =>
  components.IndicatorSeparator && (
    <components.IndicatorSeparator className="select-indicator-separator" {...props}>
      {props.children}
    </components.IndicatorSeparator>
  );

const DropdownIndicator = props =>
  components.DropdownIndicator && (
    <components.DropdownIndicator className="select-indicator" {...props}>
      <span className="select-icon" />
    </components.DropdownIndicator>
  );

const Control = props =>
  components.Control && (
    <components.Control className={`select-control ${props.isFocused ? 'is-opened' : ''}`} {...props}>
      {props.children}
    </components.Control>
  );

const Menu = props =>
  components.Menu && (
    <components.Menu className="select-menu" {...props}>
      {props.children}
    </components.Menu>
  );

const MenuList = props =>
  components.MenuList && (
    <PerfectScrollbar>
      <components.MenuList className="select-menu-list" {...props}>
        {props.children}
      </components.MenuList>
    </PerfectScrollbar>
  );

const Option = props => (
  <components.Option
    className={`select-option-item ${props.isSelected ? 'selected-option' : ''} ${props.isFocused ? 'select-focused-option' : ''}`}
    {...props}
  >
    {props.selectProps.showThumbnail && (
      <div className="avatar avatar-xs select-image">
        {props.data && props.data.image ? (
          <img src={props.data.image} className="rounded-circle" alt="" />
        ) : (
          <span className="avatar-initial select-image rounded-circle bg-skin-user">{props.data.label.charAt(0)}</span>
        )}
      </div>
    )}
    <span className="select-label">{props.children}</span>
  </components.Option>
);

const MultiValueContainer = props => (
  <components.MultiValueContainer {...props} className="select-multi-value-container">
    {props.children}
  </components.MultiValueContainer>
);

const EmptyMultiValueContainer = () => <components.MultiValueContainer />;

const MultiValue = props => (
  <components.MultiValue {...props} className="select-multi-value">
    {props.children}
  </components.MultiValue>
);

const MultiValueRemove = props => (
  <div className="remove-value">
    <components.MultiValueRemove {...props}>
      <span className="opleicon-x" />
    </components.MultiValueRemove>
  </div>
);

const MultiValueLabel = props => (
  <div className="select-multi-label">
    <components.MultiValueLabel {...props} className="select-multi-label-1">
      {props.data &&
        (props.data.image ? (
          <div className="avatar avatar-xs select-image">
            <img src={props.data.image} className="rounded-circle" alt="" />
          </div>
        ) : (
          <div className="avatar avatar-xs select-image">
            <span className="avatar-initial select-image rounded-circle bg-skin-user">{props.data.label.charAt(0)}</span>
          </div>
        ))}
      <span className="select-label">{props.children}</span>
    </components.MultiValueLabel>
  </div>
);

const ValueContainer = props => (
  <components.ValueContainer {...props} className="value-container">
    {props.children}
  </components.ValueContainer>
);

const SelectContainer = props => (
  <components.SelectContainer {...props} className="select-value-container">
    {props.children}
  </components.SelectContainer>
);

const Input = props => (
  <components.Input {...props} className="select-input">
    {props.children}
  </components.Input>
);

const Placeholder = props => (
  <components.Placeholder {...props} className="select-placeholder">
    {props.children}
  </components.Placeholder>
);

const SelectField: React.SFC<ISelectFieldModel> = props => {
  const {
    placeholder,
    name,
    value,
    className,
    disabled,
    multi,
    showList,
    menuPlacement,
    showThumbnail,
    options,
    extendOptions,
    onChange,
    onRemove,
    noOptionsMessage
  } = props;
  if (!options) return null;

  const handleRemoveValue = index => {
    value.splice(index, 1);
    return value;
  };

  return (
    <div className={`select-custom ${className || ''}`}>
      <Select
        noOptionsMessage={noOptionsMessage}
        name={name}
        value={value}
        components={{
          DropdownIndicator,
          ClearIndicator,
          IndicatorSeparator,
          Input,
          Placeholder,
          Control,
          ValueContainer,
          MultiValueContainer: !showList ? MultiValueContainer : EmptyMultiValueContainer,
          MultiValue,
          MultiValueLabel,
          MultiValueRemove,
          Menu,
          MenuList,
          Option,
          SelectContainer
        }}
        placeholder={placeholder}
        options={extendOptions ? [...extendOptions, ...options] : options}
        isMulti={multi}
        isDisabled={disabled}
        onChange={onChange}
        isSearchable
        menuPlacement={menuPlacement || 'bottom'}
        maxMenuHeight={150}
        showThumbnail={showThumbnail}
      />

      {showList && value && value.length > 0 && (
        <PerfectScrollbar className="list-item-content mg-t-5">
          {value.map((item, index) => {
            return (
              <div key={index} className="d-flex align-items-center justify-content-between pd-t-5 pd-b-5 pd-l-10">
                <div className="select-user-info d-flex align-items-center">
                  {item &&
                    (item.image ? (
                      <div className="avatar avatar-xs select-image">
                        <img src={item.image} className="rounded-circle" alt="" />
                      </div>
                    ) : (
                      <div className="avatar avatar-xs select-image">
                        <span className="avatar-initial select-image rounded-circle bg-skin-user">{item.label.charAt(0)}</span>
                      </div>
                    ))}
                  <span className="select-label">{item.label}</span>
                </div>
                <ButtonIcon iconName="x" containerClass="remove-value bd-0-f" onClick={() => onRemove(handleRemoveValue(index))} />
              </div>
            );
          })}
        </PerfectScrollbar>
      )}
    </div>
  );
};

export { SelectField };
