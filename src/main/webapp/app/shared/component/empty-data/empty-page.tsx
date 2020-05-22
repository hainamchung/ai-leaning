import React from 'react';
const notFoundIcon = 'content/images/not-found.svg';

const EmptyPage = props => (
  <div className={`d-flex align-items-stretch ${props.className || ''}`}>
    <div className={`w-100 d-flex align-items-center justify-content-center flex-column text-center`}>
      <img src={notFoundIcon} className="image-emptypage" alt="" />
      <h3 className="tx-gray-03 mg-t-20 tx-18 tx-sfdisplay-semibold mg-b-0">{props.title}</h3>
      {props.description && (
        <p className="tx-gray-03 mg-t-10 tx-14 tx-sfdisplay mg-b-0" dangerouslySetInnerHTML={{ __html: props.description }} />
      )}
    </div>
  </div>
);

export { EmptyPage };
