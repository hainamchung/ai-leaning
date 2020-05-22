import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { HeaderPublicContainer, ReduxLoading } from 'app/shared/component';

interface IPublicFrameProps extends RouteProps {
  loadingAction?: string;
  title?: string;
}

export const PublicFrame = ({ component: Component, loadingAction, title, ...rest }: IPublicFrameProps) => {
  const encloseInDefaultRoute = props => {
    let loadingRef = null;
    if (props.title) document.title = props.title;
    return (
      <React.Fragment>
        <HeaderPublicContainer containerClass="public-header" />
        <ReduxLoading
          expectedAction={props.loadingAction}
          ref={instance => {
            loadingRef = instance;
          }}
        >
          <Component loadingRef={loadingRef} {...props} />
        </ReduxLoading>
      </React.Fragment>
    );
  };

  if (!Component) throw new Error(`A component needs to be specified for path ${(rest as any).path}`);

  return <Route {...rest} render={props => encloseInDefaultRoute({ ...props, loadingAction, title })} />;
};

export default PublicFrame;
