import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/authentication/Login';
import Register from '../pages/authentication/Register';
import Alert from '../components/layout/Alert';
import Dashboard from '../components/dashboard/Dashboard';
import Workout from '../components/workout/Workout';

const Routes = (props) => {
  return (
    <Fragment>
      <Alert />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/workout" component={Workout} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
