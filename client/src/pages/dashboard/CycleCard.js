import React from 'react'
import CardItem from './CardItem'

export default function CycleCard ({ current }) {
  return (
    <div className="cycle-card-container my-1">
      <div className="cycle-details-primary">
        <CardItem weight='200lbs' exercise='squat'/>
        <CardItem weight='200lbs' exercise='bench'/>
        <CardItem weight='200lbs' exercise='deadlift'/>
        <CardItem weight='200lbs' exercise='press'/>
      </div>
      <div className="cycle-details-secondary">
        <p className="text-dark text-small">start: 2/15/22</p>
        <p className="text-dark text-small">end: 3/15/22</p>
        <button className={`action btn btn-small btn-${current ? "primary" : "dark"}`}>{current ? `workout` : `view`}</button>
      </div>
    </div>
  )
}
