import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCycles, updateSetCompleted } from '../../actions/cycles';
import WorkoutCard from '../workout/WorkoutCard';

const Workout = ({
  getCycles,
  updateSetCompleted,
  cycles: { cycles, loading },
  match
}) => {
  useEffect(() => {
    getCycles();
  }, [getCycles]);

  const onClick = (e, setType, index = 0) => {
    if (setType === 'accessoryReps') {
      updateSetCompleted({
        cycle_id: cycles[0]._id,
        week: match.params.week,
        workout: match.params.index,
        set_type: setType
      });
    } else {
      updateSetCompleted({
        cycle_id: cycles[0]._id,
        week: match.params.week,
        workout: match.params.index,
        set_type: setType,
        set: index
      });
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className="container-dash">
            <div>
              <h2 className="medium">Working Sets</h2>
              <hr className="my-2" />
              <div className="container-row">
                {cycles.length > 0 ? (
                  cycles[0][match.params.week][
                    match.params.index
                  ].workingSets.map((set, index) => (
                    <WorkoutCard
                      onClick={onClick}
                      setType="workingSets"
                      key={set._id}
                      set={set}
                      index={index}
                    />
                  ))
                ) : (
                  <h4>No working sets found...</h4>
                )}
              </div>
            </div>
            <div>
              <h2 className="medium">Volume Sets</h2>
              <hr className="my-2" />
              <div className="container-row">
                {cycles.length > 0 ? (
                  cycles[0][match.params.week][
                    match.params.index
                  ].volumeSets.map((set, index) => (
                    <WorkoutCard
                      onClick={onClick}
                      setType="volumeSets"
                      key={set._id}
                      set={set}
                      index={index}
                    />
                  ))
                ) : (
                  <h4>No working sets found...</h4>
                )}
              </div>
            </div>
            <div>
              <h2 className="medium">AccessoryReps</h2>
              <hr className="my-2" />
              <div className="container-row">
                <div className="col-lg-3 col-md-6 my-1">
                  <div
                    onClick={(e) => onClick(e, 'accessoryReps')}
                    className="card btn"
                  >
                    <div className="card-body">
                      <p>
                        {cycles[0][match.params.week][match.params.index]
                          .accessoryReps.completed && (
                          <i
                            className="fas fa-check"
                            style={{ color: 'green' }}
                          ></i>
                        )}
                      </p>
                      <p className="card-text">
                        Push:{' '}
                        {
                          cycles[0][match.params.week][match.params.index]
                            .accessoryReps.push
                        }
                      </p>
                      <p className="card-text">
                        Pull:{' '}
                        {
                          cycles[0][match.params.week][match.params.index]
                            .accessoryReps.push
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

Workout.propTypes = {
  cycles: PropTypes.object.isRequired,
  getCycles: PropTypes.func.isRequired,
  updateSetCompleted: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  cycles: state.cycles
});

export default connect(mapStateToProps, { getCycles, updateSetCompleted })(
  Workout
);
