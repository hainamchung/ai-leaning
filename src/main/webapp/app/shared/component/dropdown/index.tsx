import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'app/shared/component';
import { IDropdownItem } from 'app/shared/model/layout';

interface IDropdownProps {
  isActive?: boolean;
  className?: string;
  menuContainerClass?: string;
  header?: string;
  items: IDropdownItem[];
  isDisable?: boolean;
  renderHeader?: () => JSX.Element;
  renderFooter?: () => JSX.Element;
}

interface IDropdownState {
  show: boolean;
}

class Dropdown extends Component<IDropdownProps, IDropdownState> {
  wrapperRef = null;
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ show: false });
    }
  };

  hideDropdown() {
    this.setState({ show: false });
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleShowHide = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  };

  handleItemSelect = (action, value) => {
    this.handleShowHide();
    action(value);
  };

  renderItems = () => {
    const { items } = this.props;
    return items.map((item, index) => {
      if (item.selectAction) {
        return (
          <button
            type="button"
            className={`dropdown-item ${item.value ? 'item-value' : ''}`}
            key={index.toString()}
            onClick={e => this.handleItemSelect(item.selectAction, item.value)}
          >
            {item.iconSmall && (
              <span>
                <Icon icon={item.iconSmall} />
              </span>
            )}
            {item.icon && (
              <span className="thumb">
                <Icon icon={item.icon} />
              </span>
            )}
            <span>{item.label}</span>
            {item.text && <span>{item.text}</span>}
          </button>
        );
      }
      return (
        <Link className="dropdown-item" key={index.toString()} to={item.link}>
          {item.icon && (
            <span className="icon-left">
              <Icon icon={item.icon} />
            </span>
          )}
          {item.label}
        </Link>
      );
    });
  };

  render() {
    const { className, menuContainerClass, header, renderFooter, isActive, renderHeader, isDisable } = this.props;
    const { show } = this.state;
    return (
      <div ref={this.setWrapperRef} className={`dropdown ${className} ${show ? 'show' : ''}`}>
        <div
          className={`dropdown-link bd-0 ${isActive ? 'actived' : ''}`}
          data-toggle="dropdown"
          data-display="static"
          aria-expanded={show}
          onClick={this.handleShowHide}
        >
          {this.props.children}
        </div>
        {!isDisable && (
          <div className={`dropdown-menu ${menuContainerClass} ${show ? 'show' : ''}`}>
            {header && <div className="dropdown-header">{header}</div>}
            {renderHeader && renderHeader()}
            {this.renderItems()}
            {renderFooter && renderFooter()}
          </div>
        )}
      </div>
    );
  }
}

export { Dropdown };
