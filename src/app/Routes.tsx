import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import SignUp from "../components/pages/login";
import AdminPanel from "../components/pages/adminPanel";
import Items from "../components/pages/items";
import ItemsDetail from "../components/pages/itemsDetails";
import WrapComponent from "../components/wrapComponent";
import { GlobalStyle } from "../utils/styles";
import Header from "../components/header";
import { useSelector } from "customHooks/useSelector";

const ProtectedRoute = ({
  component: Component,
  isLogged,
  ...rest
}: {
  component: any;
  isLogged: boolean;
  path: string;
  exact?: boolean;
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLogged) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
};

const NotAuthRoute = ({
  component: Component,
  isLogged,
  ...rest
}: {
  component: any;
  isLogged: boolean;
  path: string;
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLogged) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/adminPanel",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
};

const Routes = () => {
  const isLogged = useSelector((state) => state.isLogged);

  return (
    <WrapComponent>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/items" />} />
        <NotAuthRoute component={SignUp} path="/login" {...{ isLogged }} />
        <Route exact component={Items} path="/items" {...{ isLogged }} />
        <Route component={ItemsDetail} path={`/items/:id`} {...{ isLogged }} />
        <ProtectedRoute
          component={AdminPanel}
          path="/adminPanel"
          {...{ isLogged }}
        />
        <Route render={() => <div>Not found</div>} />
      </Switch>
    </WrapComponent>
  );
};

export default Routes;
