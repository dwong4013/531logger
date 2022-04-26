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
  const [ notes, setNotes ] = useState('')
  
  // Load workout with or without targetWorkout id
  useEffect(() => {
    if(targetWorkout) {
      getWorkout(cycleId, targetWorkout)
    } else{ 
      getWorkout(cycleId)
    }
  }, [targetWorkout]);
  
  // Set remainingSets state when workout is updated
  useEffect(() => {
    if (workout) {
      // only take elements in the array that have a false value for completed and missed
      setRemainingSets({
        mainSets: [...workout.mainSets].filter(set => set.completed === false && set.missed === false),
        volumeSets: [...workout.volumeSets].filter(set => set.completed === false && set.missed === false)})
    }
  },[workout])

  // Set currentSet state when remainingSets state is updated
  useEffect(() => {
    if (remainingSets) {
      // If there are any remainingSets left, then set the currentSet
      if (remainingSets.mainSets.length > 0 || remainingSets.volumeSets.length > 0) {
        // Determine setIndex based on setType
        let setType = remainingSets.mainSets.length > 0 ? 'mainSets': 'volumeSets'
        let expectedSetLength = setType === 'mainSets' ? 3 : 5
        let setIndex = expectedSetLength - remainingSets[setType].length
        // set the currentSet state with new setType, setIndex
        // setData is always filled with the first set in the remainingSets[setType] array
        setCurrentSet({...currentSet,
          setIndex, 
          setType,
          setData: {
            id: remainingSets[setType][0]._id,
            weight: remainingSets[setType][0].weight,
            reps: remainingSets[setType][0].reps,
        }})
      } else {
        // Set the currentSet back to inital state when the workout is complete
        setCurrentSet(initialCurrentSetState);
      }
    }
  },[remainingSets])

  const onWorkoutSelect = (e) => {
    setTargetWorkout(e.target.value)
  }

  const onNotesChange = (e) => {
    setNotes(e.target.value)
  }

  const updateSet = (outcome) => {
    let formData = {
      type: 'edit',
      values: {
        ...currentSet.setData,
        id: currentSet.setData.id,
        setType: currentSet.setType,
        [outcome]: true,
        time: new Date().toLocaleTimeString(),
        notes
      }
    }
    // If it is the last element in the volumeSets array, 
    // then add workoutCompleted to the values to complete the workout
    if (currentSet.setType === 'volumeSets' && currentSet.setIndex === 4) {
      formData.values.workoutCompleted = true;
    }
    editWorkout(workout._id,formData)
    setNotes('')
  }

  return (
    <Fragment>
    {workoutLoading && 
    cyclesLoading ? (
      <Spinner/>
    ) : (
      <section className="summary-container container-flex container-vertical container-vertical-center px-6">
        <div className="toolbar">
        <button className="btn btn-back btn-icon-left btn-small btn-dark toolbar-left"><i className="fa-solid fa-caret-left"/> back</button>
        <select onChange={e=> onWorkoutSelect(e)} className="select toolbar-right" name="pets" id="pet-select">
          {workout && currentCycle && currentCycle.workoutsToDo.map((workoutOption, i) => (
            <option key={i} value={`${workoutOption._id}`} selected={workoutOption._id === workout._id }>{`Week ${workoutOption.week}: ${capitalize(workoutOption.exercise)}`}</option>
          ))}
        </select>
        </div>
        {/* Summary Cards */}
        {workout && !workout.completed ? (<div className="summary-cards-container ">
          <SummaryCard title={workout && `${workout.exercise} max`} value={`${currentCycle && workout && currentCycle.maxes[workout.exercise]}`}/>
          <SummaryCard light title='set' value={currentSet.setIndex + 1}/>
          <SummaryCard light={desktop} title='weight' value={currentSet.setData.weight}/>
          <SummaryCard light={!desktop} title='reps' value={currentSet.setData.reps}/>
        </div>) :(
          <p className="text-primary text-regular my-1">Workout Completed!</p>
        )}
        {/* Actions */}
        {workout && !workout.completed && <div className="set-actions">
          <form>
            <input onChange={e=>onNotesChange(e)} name='notes' value={notes} type="text" placeholder="notes for current set"/>
          </form>
          <div className="buttons container-flex container-horizontal">
            <button onClick={() => updateSet('missed')} className="btn btn-regular btn-dark"> missed </button>
            <button onClick={() => updateSet('completed')}className="btn btn-regular btn-primary"> complete </button>
          </div>
        </div>}
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
