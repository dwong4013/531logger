import React from 'react'
import CardItem from './CardItem'

export default function CycleCard ({ cycle, current }) {
  const {maxes: {squat, bench, deadlift, press}} = cycle;

  console.log(cycle);
  return (
    <div className="cycle-card-container my-1">
      <div className="cycle-details-primary">
        <CardItem weight={`${squat}lbs`} exercise='squat'/>
        <CardItem weight={`${bench}lbs`} exercise='bench'/>
        <CardItem weight={`${deadlift}lbs`} exercise='deadlift'/>
        <CardItem weight={`${press}lbs`} exercise='press'/>
      </div>
      <div className="cycle-details-secondary">
        <p className="text-dark text-small">start: {cycle.startDate && cycle.startDate}</p>
        <p className="text-dark text-small">end: {cycle.endDate && cycle.endDate}</p>
        <button className={`action btn btn-small btn-${current ? "primary" : "dark"}`}>{current ? `workout` : `view`}</button>
      </div>
    </div>
  )
}
