import React, { Component } from 'react';

interface ILoadingButtonProps {
  containerClass?: string;
  title?: string;
  loadingTitle?: string;
  handleClick?: any;
  isLoading?: boolean;
  type?: any;
  disabled?: boolean;
  children?: any;
}

const LoadingIconButton = (props: ILoadingButtonProps) => {
  const { containerClass, handleClick, isLoading, type, children, disabled } = props;
  return (
    <button
      type={type ? type : 'button'}
      disabled={isLoading || disabled}
      onClick={!isLoading ? handleClick : null}
      className={`btn-loading-wrapper ${containerClass}`}
    >
      {isLoading && <div className="btn-loading btn-loading-icon" />}
      {children}
    </button>
  );
};

const LoadingButton = (props: ILoadingButtonProps) => {
  const { containerClass, title, loadingTitle, handleClick, isLoading, type, children, disabled } = props;
  return (
    <button
      type={type ? type : 'button'}
      disabled={isLoading || disabled}
      onClick={!isLoading ? handleClick : null}
      className={`btn-loading-wrapper ${containerClass}`}
    >
      {isLoading && <div className="btn-loading mg-t-2 mg-r-8" />}
      {isLoading && loadingTitle ? loadingTitle : title}
      {!isLoading && children ? children : null}
    </button>
  );
};

export { LoadingButton, LoadingIconButton };
