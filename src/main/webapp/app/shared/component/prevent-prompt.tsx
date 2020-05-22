import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'react-bootstrap';

import i18next from 'app/shared/locales';
import { Icon } from 'app/shared/component';

interface IUserConfimProps {
  title?: string;
  contentMessage?: string;
  message?: string;
  reverse?: boolean;
  onCancel: (value?: any) => void;
  onConfirm: (value?: any) => void;
  classNameContent?: any;
}

interface IUserConfimState {
  showModal: boolean;
}

class UserConfirm extends Component<IUserConfimProps, IUserConfimState> {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true
    };
  }
  handleConfirm = () => {
    const { onConfirm } = this.props;
    this.setState({ showModal: false });
    onConfirm();
  };

  handleClose = () => {
    const { onCancel } = this.props;
    this.setState({ showModal: false });
    onCancel();
  };

  handleShow = () => {
    this.setState({ showModal: true });
  };

  render() {
    const { message, title, contentMessage, reverse, classNameContent } = this.props;
    const { showModal } = this.state;

    return (
      <Modal show={showModal} onHide={() => this.handleClose()} animation size="sm" dialogClassName="modal-user-confirm">
        <button className="btn-close-modal close pos-absolute tx-15 t-15 r-20" onClick={this.handleClose}>
          <Icon icon="x" />
        </button>
        <Modal.Header>
          <div className="d-flex">
            <div className="header-content">
              <h5 className="tx-18 tx-sftext-semibold mg-b-0 lh-2">{title || i18next.t('component.userConfirm.title')}</h5>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className={`dailog-message-content ${classNameContent || ''}`}>
            <p
              className="description mg-b-0"
              dangerouslySetInnerHTML={{ __html: contentMessage || i18next.t('component.userConfirm.content') }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <button type="button" className="btn wd-140 btn-sm btn-outline-light" onClick={reverse ? this.handleConfirm : this.handleClose}>
            {i18next.t('component.userConfirm.button.cancel')}
          </button>
          <button type="button" className="btn wd-140 btn-sm btn-primary" onClick={reverse ? this.handleClose : this.handleConfirm}>
            {i18next.t('component.userConfirm.button.ok')}
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}
const userConfirmation = (message, callback) => {
  const container = document.createElement('div');
  container.setAttribute('custom-confirmation-navigation', '');
  document.body.appendChild(container);
  const closeModal = callbackState => {
    ReactDOM.unmountComponentAtNode(container);
    callback(callbackState);
  };
  ReactDOM.render(
    <UserConfirm reverse message={message} onCancel={() => closeModal(false)} onConfirm={() => closeModal(true)} />,
    container
  );
};

export { UserConfirm, userConfirmation };
