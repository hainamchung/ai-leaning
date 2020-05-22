import React from 'react';
const logoOpela = 'content/images/logos/logo.png';

const HeaderPublicContainer = props => {
  const { containerClass } = props;
  return (
    <div className={`content-header pd-l-15 ${containerClass || ''}`}>
      <div className="logo-container">
        <a href="/" className="aside-logo">
          <img src={logoOpela} className="logo" alt="Opela" height="40" />
        </a>
      </div>
    </div>
  );
};

export { HeaderPublicContainer };
