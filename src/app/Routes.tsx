import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import SignUp from "../components/pages/login";
import AdminPanel from "../components/pages/adminPanel";
import Items from "../components/pages/items";
import ItemsDetail from "../components/pages/itemsDetails";
import WrapComponent from "../components/wrapComponent";
import { IProfile } from "../utils/interfaces";
import { GlobalStyle } from "../utils/styles";
import Header from "../components/header";
import { useSelector } from "store/reducers";

const ProtectedRoute = ({
  component: Component,
  isAuth,
  profile,
  isAdmin,
  ...rest
}: {
  component: any;
  isAuth: boolean;
  profile: IProfile;
  isAdmin: boolean;
  path: string;
  exact?: boolean;
}) => {
  console.log(isAdmin, "adm");
  return (
    <Route
      {...rest}
      render={props => {
        if (isAdmin) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/items",
                state: { from: props.location }
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
  isAuth,
  type,
  ...rest
}: {
  component: any;
  isAuth: boolean;
  path: string;
  type: string;
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!isAuth) {
          return <Component {...props} type={type} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/items",
                state: { from: props.location }
              }}
            />
          );
        }
      }}
    />
  );
};

const Routes = () => {
  const isAuth = useSelector(state => state.isAuth);
  const isAdmin = useSelector(state => state.isAdmin);
  const profile = useSelector(state => state.profile);

  return (
    <WrapComponent>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/items" />} />
        <NotAuthRoute
          component={SignUp}
          path="/login"
          {...{ isAuth, type: "auth" }}
        />
        <NotAuthRoute
          component={SignUp}
          path="/signUp"
          {...{ isAuth, type: "signUp" }}
        />
        <Route
          exact
          component={Items}
          path="/items"
          {...{ isAuth, profile, isAdmin }}
        />
        <Route
          component={ItemsDetail}
          path={`/items/:id`}
          {...{ isAuth, profile, isAdmin }}
        />
        <ProtectedRoute
          component={AdminPanel}
          path="/adminPanel"
          {...{ isAuth, type: "auth", profile, isAdmin }}
        />

        <Route render={() => <div>Not found</div>} />
      </Switch>
    </WrapComponent>
  );
};

export default Routes;
