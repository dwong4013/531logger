import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import Maxes from '../maxes/Maxes';
import MaxForm from '../maxes/MaxForm';
import PrivateRoute from '../routing/PrivateRoute';
import MainTemplates from '../main-templates/MainTemplates';
import VolumeTemplates from '../volume-templates/VolumeTemplates';
import VolumeForm from '../volume-templates/VolumeForm';
import Cycles from '../cycles/Cycles';
import CycleForm from '../cycles/CycleForm';
import Workouts from '../workouts/Workouts';
import Workout from '../workout/Workout';

const Routes = (props) => {
  return (
    <Fragment>
      <Alert />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/maxes" component={Maxes} />
        <PrivateRoute exact path="/create-max" component={MaxForm} />
        <PrivateRoute exact path="/main-templates" component={MainTemplates} />
        <PrivateRoute
          exact
          path="/volume-templates"
          component={VolumeTemplates}
        />
        <PrivateRoute exact path="/create-volume" component={VolumeForm} />
        <PrivateRoute exact path="/cycles" component={Cycles} />
        <PrivateRoute exact path="/create-cycle" component={CycleForm} />
        <PrivateRoute exact path="/workouts" component={Workouts} />
        <PrivateRoute exact path="/workout/:week/:index" component={Workout} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
