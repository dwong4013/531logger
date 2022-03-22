import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCycles, updateSetCompleted } from '../../actions/cycles';
import SetCard from './SetCard';
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
        <div className="toolbar">
        <button className="btn btn-back btn-icon-left btn-small btn-dark"><i className="fa-solid fa-caret-left"/> back</button>
        <select className="select" name="pets" id="pet-select">
          <option value="squats">Squats</option>
          <option value="bench">Bench</option>
          <option value="deadlift">Deadlift</option>
          <option value="press">Press</option>
        </select>
        </div>
        <div className="summary-cards-container ">
          <SummaryCard title='cycles completed' value='1'/>
          <SummaryCard light title='repeated weeks' value='0'/>
          <SummaryCard light={desktop} title='current cycle' value='4'/>
          <SummaryCard light={!desktop} title='workouts left' value='8'/>
        </div>
        <div className="set-actions">
          <form>
            <input type="text" placeholder="notes for current set"/>
          </form>
          <div className="buttons container-flex container-horizontal">
            <button className="btn btn-regular btn-dark"> missed </button>
            <button className="btn btn-regular btn-primary"> complete </button>
          </div>
        </div>
        <p className="text-small text-dark text-bold my-1">Main Sets</p>
        <SetCard displayNotes={!desktop}/>
        <SetCard displayNotes={!desktop}/>
        <SetCard displayNotes={!desktop}/>
        <p className="text-small text-dark text-bold my-1">Volume Sets</p>
        <SetCard displayNotes={!desktop}/>
        <SetCard displayNotes={!desktop}/>
        <SetCard displayNotes={!desktop}/>
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
