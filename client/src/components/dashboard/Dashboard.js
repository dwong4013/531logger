import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Dashboard = ({ auth: { isAuthenticated, loading }, logout }) => {
  return (
    <section className="container-dash">
      <div className="jumbotron">
        <h1 className="medium text-primary">Hello, Derrick!</h1>
        <p className="lead text-primary">
          Here's the working sets of your current cycle.
        </p>
        <hr className="my-4" />
        <div className="btn-group my-4" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-large text-primary m-2">
            5's Week
          </button>
          <button type="button" className="btn btn-large text-primary m-2">
            3's Week
          </button>
          <button type="button" className="btn btn-large text-primary m-2">
            5/3/1 Week
          </button>
        </div>
      </div>
      <div className="accordion" id="accordionExample">
        <div className="card">
          <div className="card-header" id="headingOne">
            <h2 className="mb-0">
              <button
                className="btn btn-link medium"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Squats
              </button>
            </h2>
          </div>
          <div
            id="collapseOne"
            className="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              <ul className="horizontal-list">
                <li className="lead">225</li>
                <li className="lead">235</li>
                <li className="lead">245</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="headingTwo">
            <h2 className="mb-0">
              <button
                className="btn btn-link collapsed medium"
                type="button"
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                Bench Press
              </button>
            </h2>
          </div>
          <div
            id="collapseTwo"
            className="collapse show"
            aria-labelledby="headingTwo"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              <ul className="horizontal-list">
                <li className="lead">120</li>
                <li className="lead">135</li>
                <li className="lead">155</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="headingThree">
            <h2 className="mb-0">
              <button
                className="btn btn-link collapsed medium"
                type="button"
                data-toggle="collapse"
                data-target="#collapseThree"
                aria-expanded="true"
                aria-controls="collapseThree"
              >
                Deadlift
              </button>
            </h2>
          </div>
          <div
            id="collapseThree"
            className="collapse show"
            aria-labelledby="headingThree"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              <ul className="horizontal-list">
                <li className="lead">185</li>
                <li className="lead">210</li>
                <li className="lead">235</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="headingFour">
            <h2 className="mb-0">
              <button
                className="btn btn-link collapsed medium"
                type="button"
                data-toggle="collapse"
                data-target="#collapseFour"
                aria-expanded="true"
                aria-controls="collapseFour"
              >
                Overhead Press
              </button>
            </h2>
          </div>
          <div
            id="collapseFour"
            className="collapse show"
            aria-labelledby="headingFour"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              <ul className="horizontal-list">
                <li className="lead">95</li>
                <li className="lead">105</li>
                <li className="lead">115</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Dashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Dashboard);
