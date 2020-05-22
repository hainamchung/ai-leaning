import React from 'react';
import { Link } from 'react-router-dom';
import { IFieldGroupProps, InputField } from './index';

export interface IGroupLinkFieldProps extends IFieldGroupProps {
  routelink?: any;
  linkText?: any;
}

const GroupLinkField: React.SFC<IGroupLinkFieldProps> = props => {
  const { label, routelink, linkText } = props;
  return (
    <div className="form-group">
      <div className="d-flex justify-content-between label-group">
        <label className="label-control">{label}</label>
        <Link to={routelink} className="tx-13 form-link" tabIndex={-1}>
          {linkText}
        </Link>
      </div>
      <InputField {...props} />
    </div>
  );
};

export { GroupLinkField };
