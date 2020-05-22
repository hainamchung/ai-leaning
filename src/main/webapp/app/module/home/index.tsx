import React, { Component } from 'react';

import { HeaderPublicContainer, ReduxLoading } from 'app/shared/component';

class HomeContainer extends Component {
  render() {
    return (
      <ReduxLoading isLoadingComponent expectedActions={[]}>
        <HeaderPublicContainer />
        <div className="container home-container pd-20">
          <div className="row">
            <div className="col-sm-12 col-lg-6 pd-t-10">Hello Word</div>
          </div>
        </div>
      </ReduxLoading>
    );
  }
}

export default HomeContainer;
