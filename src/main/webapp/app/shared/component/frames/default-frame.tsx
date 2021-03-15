import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { LoadingWraper, Breadcrumb } from 'app/shared/component';

interface IUserProps extends RouteProps {
  loadingAction?: string;
  title?: string;
  routePath?: string;
}
export const DefaultFrame = ({ component: Component, loadingAction, title, routePath, path, ...rest }: IUserProps) => {
  const encloseInDefaultRoute = props => {
    if (props.title) document.title = props.title;

    return (
      <React.Fragment>
        <div className="content ht-100v pd-0-f">
          <div className="content-body content-body-no-scroll">
            <PerfectScrollbar>
              <LoadingWraper>
                <Component {...props} />
              </LoadingWraper>
            </PerfectScrollbar>
          </div>
        </div>
      </React.Fragment>
    );
  };

  if (!Component) throw new Error(`A component needs to be specified for path ${(rest as any).path}`);

  return <Route {...rest} render={props => encloseInDefaultRoute({ ...props, loadingAction, title, path })} />;
};

export default DefaultFrame;
