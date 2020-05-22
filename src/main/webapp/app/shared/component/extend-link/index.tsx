import React, { Component } from 'react';
import { FontIcon } from 'app/shared/component';

const ExtendLink = props => <a href={props.to} {...props} target="_blank" />;
const enum FileType {
  pdf = 'application/pdf',
  word = 'application/word'
}

interface IExtendFileLinkProps {
  id: string;
  name: string;
  mineType: string;
  downloadUrl: string;
  downloadAction: (value) => void;
}

class ExtendFileLink extends Component<IExtendFileLinkProps> {
  renderFileIcon = () => {
    const { mineType } = this.props;
    switch (mineType) {
      case FileType.pdf: {
        return <FontIcon iconName="file-pdf" className="icon-left" />;
      }
      case FileType.word: {
        return <FontIcon iconName="file-word" className="icon-left" />;
      }
      default:
        return null;
    }
  };
  render() {
    const { name, id, mineType, downloadUrl, downloadAction } = this.props;
    return (
      // <div className="col-6 col-sm-4 col-md-3 col-xl pd-y-10 mn-wd-20p">
      <div className="pd-y-10 mn-wd-100p mn-wd-md-50p mn-wd-lg-25p">
        <button type="button" className="btn btn-link btn-file-link" onClick={() => downloadAction({ id, name, mineType, downloadUrl })}>
          {this.renderFileIcon()}
          <span className="btn-text tx-sftext-semibold text-left">{name}</span>
        </button>
      </div>
    );
  }
}
export { ExtendLink, ExtendFileLink };
