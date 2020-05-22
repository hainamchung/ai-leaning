import React from 'react';
import { FontIcon } from 'app/shared/component';

const EmptyData = props => (
  <div className={`d-flex align-items-stretch ${props.className || ''}`}>
    <div className={`w-100 d-flex align-items-center justify-content-center flex-column text-center`}>
      <FontIcon iconName={props.iconName} className={props.classNameIcon} />
      <h3 className="main-description tx-color-03 mg-t-20">{props.title}</h3>
    </div>
  </div>
);

export { EmptyData };
