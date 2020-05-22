import React, { Component, Fragment } from 'react';
import Select, { components } from 'react-select';
import { Icon } from 'antd';

import { ISelectItem } from 'app/shared/model';
import i18next from 'app/shared/locales';

export interface ISuggestionProps {
  placeholder?: string;
  name?: string;
  value?: any;
  className?: any;
  classNameDropDown?: any;
  disabled?: boolean;
  multi?: boolean;
  options: ISelectItem[];
  extendOptions?: ISelectItem[];
  onChange?: any;
  showThumbnail?: boolean;
  menuPlacement?: string;
  noOptionsMessage?: string;
}

interface ISuggestionState {
  isOpen: boolean;
}

const IndicatorsContainer = props =>
  components.IndicatorsContainer && (
    <components.IndicatorsContainer className="suggestion-indicator-container" {...props}>
      <Icon type="search" />
    </components.IndicatorsContainer>
  );

const Control = props =>
  components.Control && (
    <components.Control className="suggestion-control-container" {...props}>
      {props.children}
    </components.Control>
  );

const Input = props =>
  components.Input && (
    <components.Input className="suggestion-input" {...props}>
      {props.children}
    </components.Input>
  );

const Menu = props =>
  components.Menu && (
    <components.Menu className="suggestion-menu-container" {...props}>
      {props.children}
    </components.Menu>
  );

const MenuList = props =>
  components.MenuList && (
    <components.MenuList className="suggestion-menu-list-container" {...props}>
      {props.children}
    </components.MenuList>
  );

const Placeholder = props =>
  components.Placeholder && (
    <components.Placeholder className="suggestion-placeholder" {...props}>
      {props.children}
    </components.Placeholder>
  );

function renderThumbnail(data) {
  if (data.image === 'none') {
    return null;
  }
  if (data.image) {
    return (
      <div className="avatar avatar-20 suggestion-image mg-t-1">
        <img src={data.image} className="rounded-circle" alt="" />
      </div>
    );
  }
  return (
    <div className="avatar avatar-20 suggestion-image mg-t-1">
      <span className="avatar-initial select-image rounded-circle bg-skin-user">{data.label.charAt(0)}</span>
    </div>
  );
}

const Option = props => (
  <components.Option
    className={`suggestion-option ${props.isSelected ? 'suggestion-selected-option' : ''} ${
      props.isFocused ? 'suggestion-focused-option' : ''
    }`}
    {...props}
  >
    {props.selectProps.showThumbnail && props.data && renderThumbnail(props.data)}
    <span className="suggestion-label">{props.children}</span>
  </components.Option>
);

const Panel = props => <div className="suggestion-list" {...props} />;

const Dropdown = ({ children, isOpen, target, onClose, classNameDropDown }) => (
  <div className={`suggestion-wrap ${isOpen ? 'show' : ''}`}>
    {target}
    {isOpen ? <Panel className={`suggestion-list ${classNameDropDown ? classNameDropDown : ''}`}>{children}</Panel> : null}
    {isOpen ? <Panel className="suggestion-overlay" onClick={onClose} /> : null}
  </div>
);

class Suggestion extends Component<ISuggestionProps, ISuggestionState> {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  toggleOpen = () => {
    this.setState(state => ({ isOpen: !state.isOpen }));
  };

  onSelectChange = value => {
    this.toggleOpen();

    this.props.onChange(value);
  };

  render() {
    const {
      placeholder,
      name,
      value,
      className,
      classNameDropDown,
      disabled,
      multi,
      options,
      showThumbnail,
      menuPlacement,
      extendOptions,
      noOptionsMessage
    } = this.props;
    const { isOpen } = this.state;
    const fullOptions = extendOptions ? extendOptions.concat(options) : options;
    return (
      <div className={`suggestion-custom ${className || ''}`}>
        <Dropdown
          isOpen={isOpen}
          onClose={this.toggleOpen}
          classNameDropDown={classNameDropDown}
          target={
            <button type="button" className="btn btn-light" onClick={this.toggleOpen}>
              {showThumbnail && value && renderThumbnail(value)}
              <span className="suggestion-icon" />
              <span className="suggestion-label">{value ? `${value.label}` : <span className="tx-placeholder">{placeholder}</span>}</span>
            </button>
          }
        >
          <Select
            autoFocus
            backspaceRemovesValue={false}
            controlShouldRenderValue={false}
            components={{ IndicatorsContainer, Control, Input, Placeholder, Menu, MenuList, Option }}
            hideSelectedOptions={false}
            noOptionsMessage={() => (noOptionsMessage ? noOptionsMessage : i18next.t('component.selectionField.noOptionsMessage'))}
            isClearable={false}
            menuIsOpen
            tabSelectsValue={false}
            name={name}
            value={value}
            placeholder={placeholder}
            options={fullOptions}
            isMulti={multi}
            isDisabled={disabled}
            onChange={this.onSelectChange}
            showThumbnail={showThumbnail}
            maxMenuHeight={150}
            menuPlacement={menuPlacement || 'bottom'}
          />
        </Dropdown>
      </div>
    );
  }
}

export { Suggestion };
