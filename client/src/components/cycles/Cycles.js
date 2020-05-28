import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCycles, deleteCycle } from '../../actions/cycles';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import CycleCard from './CycleCard';

const Cycles = ({ cycles: { cycles, loading }, getCycles, deleteCycle }) => {
  useEffect(() => {
    getCycles();
  }, [getCycles, deleteCycle]);

  const onClick = (e, id) => {
    deleteCycle(id);
  };
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className="container-dash">
            <div className="jumbotron">
              <p className="lead text-primary">
                To begin a new cycle, simply create one.
              </p>
              <Link to="/create-cycle" className="btn btn-primary my-2">
                <i className="fas fa-plus"></i> Create
              </Link>
              <hr className="my-2" />
              <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
              ></div>
            </div>
            <div className="container-row">
              {cycles.length > 0 ? (
                cycles.map((cycle) => (
                  <CycleCard onClick={onClick} key={cycle._id} cycle={cycle} />
                ))
              ) : (
                <h4>No cycles found...</h4>
              )}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

Cycles.propTypes = {
  getCycles: PropTypes.func.isRequired,
  deleteCycle: PropTypes.func.isRequired,
  cycles: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  cycles: state.cycles
});

export default connect(mapStateToProps, { getCycles, deleteCycle })(Cycles);
