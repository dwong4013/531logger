import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCycles, updateSetCompleted } from '../../actions/cycles';
import WorkoutCard from '../workout/WorkoutCard';
import SummaryCard from '../dashboard/SummaryCard';
import CycleCard from '../dashboard/CycleCard';


const Workout = ({
  getCycles,
  updateSetCompleted,
  cycles: { cycles, loading },
  match
}) => {
  useEffect(() => {
    getCycles();
    window.matchMedia('(max-width: 414px)').addEventListener('change', mediaHandler)
  }, [getCycles]);

  const [desktop, setDesktop] = useState(window.matchMedia('(max-width: 414px)').matches)

  const mediaHandler = e => {
    console.log(e.matches)
    setDesktop(e.matches)
  }


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
      <section className="summary-container container-flex container-vertical container-vertical-center px-6">
        <div className="big-action">
        <button className="btn btn-back btn-icon-left btn-small btn-dark"><i className="fa-solid fa-caret-left"/> back</button>
        </div>
        <div className="summary-cards-container container-grid my-2">
          <SummaryCard title='cycles completed' value='1'/>
          <SummaryCard light title='repeated weeks' value='0'/>
          <SummaryCard light={desktop} title='current cycle' value='4'/>
          <SummaryCard light={!desktop} title='workouts left' value='8'/>
        </div>
        <div className="section-header text-dark text-medium">
          Cycles
        </div>
        <CycleCard/>
        <CycleCard/>
        <CycleCard current/>
      </section>
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
