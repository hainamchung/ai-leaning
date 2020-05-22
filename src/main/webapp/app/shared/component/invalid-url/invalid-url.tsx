import React from 'react';

const imgInvalidUrl = 'content/images/img-invalid-url.png';
const InvalidUrl = props => (
  <div className={`content content-fixed content-auth-alt public-container ${props.className || ''}`}>
    <div className={`container d-flex justify-content-center ht-100p pd-sm-0`}>
      <div className="ht-100p mx-wd-500 wd-sm-500 m-auto d-flex flex-column align-items-center justify-content-center">
        <div className="wd-70p wd-sm-250 wd-lg-300 m-auto pd-b-15">
          <img src={imgInvalidUrl} className="img-fluid" alt="" />
        </div>
        <h1 className="tx-color-01 tx-24 tx-sm-32 tx-lg-36 mg-xl-b-5 tx-center">{props.title}</h1>
        <h5 className="tx-16 tx-sm-18 tx-lg-20 tx-normal mg-b-20 tx-center mg-t-10">{props.content}</h5>
        <button onClick={props.onClickButton} className="btn btn-white-default pd-x-30">
          {props.buttonName}
        </button>
      </div>
    </div>
  </div>
);

export { InvalidUrl };
