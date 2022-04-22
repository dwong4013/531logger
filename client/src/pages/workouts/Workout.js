import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../components/layout/Spinner';
import { getWorkout, editWorkout } from '../../actions/workouts';
import { getCycles } from '../../actions/cycles';
import SetCard from './SetCard';
import SummaryCard from '../../pages/dashboard/SummaryCard';

const capitalize = (string) => {
  return string[0].toUpperCase()+string.slice(1);
}

const initialCurrentSetState = {
  setIndex: 0,
  setType: 'mainSets',
  setData: {
    id: '',
    weight: '',
    reps: '',
    notes: '',
    time: '',
  }
}

const Workout = ({ getWorkout, editWorkout, getCycles, cycles, workouts, match }) => {
  useEffect(() => {
    window.matchMedia('(max-width: 414px)').addEventListener('change', mediaHandler)
  }, []);

  const [desktop, setDesktop] = useState(window.matchMedia('(max-width: 414px)').matches)

  const mediaHandler = e => {
    console.log(e.matches)
    setDesktop(e.matches)
  }

  // Load cycle data
  useEffect(() => {
    getCycles()
  },[])

  const { workout, loading: workoutLoading } = workouts;
  const { currentCycle, loading: cyclesLoading } = cycles;
  const { cycleId } = useParams();
  const [ targetWorkout, setTargetWorkout ] = useState(null)
  const [ remainingSets, setRemainingSets ] = useState(null)
  const [ currentSet, setCurrentSet ] = useState(initialCurrentSetState)
  
  // Load workout with or without targetWorkout id
  useEffect(() => {
    if(targetWorkout) {
      console.log('1')
      getWorkout(cycleId, targetWorkout)
    } else{ 
      console.log('2')
      getWorkout(cycleId)
    }
  }, [targetWorkout]);
  
  // Set remainingSets state when workout is updated
  useEffect(() => {
    if (workout) {
      setRemainingSets({
        mainSets: [...workout.mainSets].filter(set => set.completed === false && set.missed === false),
        volumeSets: [...workout.volumeSets].filter(set => set.completed === false && set.missed === false)})
    }
  },[workout])

  // Set currentSet setType state when remainingSets state is updated
  useEffect(() => {
    if (remainingSets) {
      setCurrentSet({...currentSet,
        setType: remainingSets.mainSets.length > 0 ? 'mainSets' : 'volumeSets' 
      })
    }
  },[remainingSets])

  // Set currentSet setData when remainingSets state is updated
  useEffect(() => {
    if (remainingSets) {
      setCurrentSet({...currentSet, 
      setData: {
        id: remainingSets[currentSet.setType][currentSet.setIndex]._id,
        weight: remainingSets[currentSet.setType][currentSet.setIndex].weight,
        reps: remainingSets[currentSet.setType][currentSet.setIndex].reps,
      }})
    }
  },[remainingSets])

  console.log(remainingSets)
  console.log(currentSet);
  const onWorkoutSelect = (e) => {
    setTargetWorkout(e.target.value)
  }

  const updateSet = (outcome) => {
    let formData = {
      type: 'edit',
      values: {
        ...currentSet.setData,
        id: currentSet.setData.id,
        setType: currentSet.setType,
        [outcome]: true,
        time: new Date().toLocaleTimeString()
      }
    }
    console.log(formData);
    editWorkout(workout._id,formData)
  }

  // Select different workout ✅
  // Render all sets from redux store ✅
  // Put all workout sets that aren't completed in a todo in reverse order (local state) ✅
  // Create a state hook to handle current set ✅
  // User updates set
  // Set gets marked as complete, remainingSet, and currentSet is updated
  // Global state is updated with new workout set, and everything is re-rendered.
  // Handle toggled notes for each set


  // const onClick = (e, setType, index = 0) => {
  //   if (setType === 'accessoryReps') {
  //     updateCycle({
  //       cycle_id: cycles[0]._id,
  //       week: match.params.week,
  //       workout: match.params.index,
  //       set_type: setType
  //     });
  //   } else {
  //     updateCycle({
  //       cycle_id: cycles[0]._id,
  //       week: match.params.week,
  //       workout: match.params.index,
  //       set_type: setType,
  //       set: index
  //     });
  //   }
  // };

  return (
    <Fragment>
    {workoutLoading && 
    cyclesLoading ? (
      <Spinner/>
    ) : (
      <section className="summary-container container-flex container-vertical container-vertical-center px-6">
        <div className="toolbar">
        <button className="btn btn-back btn-icon-left btn-small btn-dark"><i className="fa-solid fa-caret-left"/> back</button>
        <select onChange={e=> onWorkoutSelect(e)} className="select" name="pets" id="pet-select">
          {currentCycle.workoutsToDo.map((workout, i) => (
            <option key={i} value={`${workout._id}`}>{`Week ${workout.week}: ${capitalize(workout.exercise)}`}</option>
          ))}
        </select>
        </div>
        <div className="summary-cards-container ">
          <SummaryCard title={workout && `${workout.exercise} max`} value={`${currentCycle && workout && currentCycle.maxes[workout.exercise]}`}/>
          <SummaryCard light title='set' value={currentSet.setIndex + 1}/>
          <SummaryCard light={desktop} title='weight' value={currentSet.setData.weight}/>
          <SummaryCard light={!desktop} title='reps' value={currentSet.setData.reps}/>
        </div>
        <div className="set-actions">
          <form>
            <input type="text" placeholder="notes for current set"/>
          </form>
          <div className="buttons container-flex container-horizontal">
            <button onClick={() => updateSet('missed')} className="btn btn-regular btn-dark"> missed </button>
            <button onClick={() => updateSet('completed')}className="btn btn-regular btn-primary"> complete </button>
          </div>
        </div>
        <p className="text-small text-dark text-bold my-1">Main Sets</p>
        {/* Main Sets */}
        {workout && workout.mainSets.map((set, id) => (
          <SetCard key={id} displayNotes={!desktop} id={id} set={set}/>
        ))}
        <p className="text-small text-dark text-bold my-1">Volume Sets</p>
        {workout && workout.volumeSets.map((set, id) => (
          <SetCard key={id} displayNotes={!desktop} id={id} set={set}/>
        ))}
      </section>
    )}
    </Fragment>
  );
};

Workout.propTypes = {
  workouts: PropTypes.object.isRequired,
  cycles: PropTypes.object.isRequired,
  getWorkout: PropTypes.func.isRequired,
  editWorkout: PropTypes.func.isRequired,
  getCycles: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  workouts: state.workouts,
  cycles: state.cycles
});

export default connect(mapStateToProps, { getWorkout, editWorkout, getCycles })(
  Workout
);
