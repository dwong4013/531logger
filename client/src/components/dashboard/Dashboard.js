import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCycles } from '../../actions/cycles';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import DashboardCard from './DashboardCard';

const Dashboard = ({
  auth: { user },
  cycles: { cycles, loading },
  getCycles
}) => {
  useEffect(() => {
    getCycles();
  }, [getCycles]);

  const [week, setWeek] = useState('week5s');

  const onClick = (e) => {
    setWeek([e.target.name]);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className="container-dash">
            <div className="jumbotron">
              <h1 className="medium text-primary">Hello, {user.name}!</h1>
              <p className="lead text-primary">
                Here's the main sets of your current cycle.
              </p>
              <hr className="my-4" />
              <div
                className="btn-group my-2"
                role="group"
                aria-label="Basic example"
              >
                <button
                  type="button"
                  onClick={(e) => onClick(e)}
                  name="week5s"
                  className="btn btn-large text-primary m-2"
                >
                  5's Week
                </button>
                <button
                  type="button"
                  onClick={(e) => onClick(e)}
                  name="week3s"
                  className="btn btn-large text-primary m-2"
                >
                  3's Week
                </button>
                <button
                  type="button"
                  onClick={(e) => onClick(e)}
                  name="week531"
                  className="btn btn-large text-primary m-2"
                >
                  5/3/1 Week
                </button>
              </div>
            </div>
            <div className="container">
              <div className="row">
                {cycles.length > 0 ? (
                  cycles[0][week].map((workout, index) => (
                    <DashboardCard
                      key={workout._id}
                      index={index}
                      workout={workout}
                      week={week}
                    />
                  ))
                ) : (
                  <h4>No cycles found... Begin by creating your maxes</h4>
                )}
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  cycles: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCycles: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  cycles: state.cycles,
  auth: state.auth
});

export default connect(mapStateToProps, { getCycles })(Dashboard);
