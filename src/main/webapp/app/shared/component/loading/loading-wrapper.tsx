import React, { Component } from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';

class LoadingWraper extends Component<StateProps> {
  render() {
    const { isLoading } = this.props;
    return (
      <React.Fragment>
        <Spin spinning={isLoading} delay={100} />
        {this.props.children}
      </React.Fragment>
    );
  }
}

const mapStateToProps = storeState => {
  const { loadingReducer } = storeState;
  const { isLoading } = loadingReducer;
  return {
    isLoading
  };
};

type StateProps = ReturnType<typeof mapStateToProps>;

const loadingWraper = connect(mapStateToProps)(LoadingWraper);

export { loadingWraper as LoadingWraper };
