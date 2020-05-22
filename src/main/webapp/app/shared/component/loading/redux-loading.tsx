import React, { Component } from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { REQUEST, SUCCESS, FAILURE } from 'app/redux/constant';

interface IReduxLoadingProps extends StateProps {
  expectedAction?: string;
  expectedKey?: string;
  expectedActions?: string[];
  isLoadingComponent?: boolean;
  onChangeLoadingStatus?: (value) => void;
  componentKey?: string;
}

interface IReduxLoadingState {
  spinning: boolean;
}
class ReduxLoading extends Component<IReduxLoadingProps, IReduxLoadingState> {
  constructor(props) {
    super(props);
    const { isLoadingComponent, expectedAction, expectedKey, actionName, specialKey } = props;
    this.state = {
      spinning: !isLoadingComponent
        ? REQUEST(expectedAction) === actionName
        : REQUEST(expectedAction) === actionName && expectedKey === specialKey
    };
  }

  getCurrentSpinStatus() {
    return this.state.spinning;
  }

  handleExpectedAction(expectedAction: string, nextProps) {
    const { actionName, onChangeLoadingStatus, isLoadingComponent, expectedKey, specialKey } = nextProps;
    const checkComponentUpdate = !isLoadingComponent || (isLoadingComponent && (!expectedKey || expectedKey === specialKey));
    if (REQUEST(expectedAction) === actionName && checkComponentUpdate) {
      onChangeLoadingStatus && onChangeLoadingStatus(true);
      this.setState({ spinning: true });
    }
    if (checkComponentUpdate && (SUCCESS(expectedAction) === actionName || FAILURE(expectedAction) === actionName)) {
      onChangeLoadingStatus && onChangeLoadingStatus(false);
      this.setState({ spinning: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { expectedAction, expectedActions } = nextProps;

    expectedAction && this.handleExpectedAction(expectedAction, nextProps);

    if (expectedActions && expectedActions.length !== 0) {
      expectedActions.map(action => this.handleExpectedAction(action, nextProps));
    }
  }

  renderLoadingComponent = () => {
    const { spinning } = this.state;
    const { isLoadingComponent } = this.props;
    return (
      <div className="loading-wrapper">
        {isLoadingComponent && <span className={`${spinning ? 'isLoading' : 'normal'}`} />}
        {this.props.children}
      </div>
    );
  };

  renderLoadingPage = () => {
    const { spinning } = this.state;
    const { isLoadingComponent } = this.props;
    return (
      <React.Fragment>
        {!isLoadingComponent && <Spin spinning={spinning} />}
        {this.props.children}
      </React.Fragment>
    );
  };

  render() {
    const { isLoadingComponent } = this.props;
    return isLoadingComponent ? this.renderLoadingComponent() : this.renderLoadingPage();
  }
}

const mapStateToProps = storeState => {
  const { loadingReducer } = storeState;
  const { isLoading, actionName, specialKey } = loadingReducer;
  return {
    isLoading,
    actionName,
    specialKey
  };
};

type StateProps = ReturnType<typeof mapStateToProps>;

const reduxLoading = connect(mapStateToProps)(ReduxLoading);

export { reduxLoading as ReduxLoading };
