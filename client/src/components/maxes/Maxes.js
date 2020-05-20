import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMaxes } from '../../actions/maxes';
import MaxCard from './MaxCard';
import Spinner from '../layout/Spinner';

const Maxes = ({ maxes: { maxes, loading }, getMaxes }) => {
  useEffect(() => {
    getMaxes();
  }, [getMaxes]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className="container-dash">
            <div className="jumbotron">
              <p className="lead text-primary">
                To update your max simply create a new one.
              </p>
              <Link to="/create-max" className="btn btn-primary my-2">
                <i className="fas fa-plus"></i> Create{' '}
              </Link>
              <hr className="my-2" />
              <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
              ></div>
            </div>
            <div className="container">
              {maxes.length > 0 ? (
                maxes.map((max) => <MaxCard key={max._id} max={max} />)
              ) : (
                <h4>No maxes found...</h4>
              )}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

Maxes.propTypes = {
  maxes: PropTypes.object.isRequired,
  getMaxes: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  maxes: state.maxes
});

export default connect(mapStateToProps, { getMaxes })(Maxes);
