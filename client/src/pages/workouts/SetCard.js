import React, { Fragment } from 'react';

export default function SetCard ({id, set, time = null, notes = null, displayNotes, toggled = true}) {
  const  { weight, reps } = set;
  return (
    <Fragment>
      <div className="set-card set-card-container">
        <div className="set-card-details">
          <p className="text-dark text-small">{`set ${id +1}`}</p>
          <p className="text-dark text-regular text-bold">{`${weight} lbs`}</p>
          <p className="text-dark text-regular text-bold">{`${reps} reps`}</p>
          <p className="text-primary text-small">{time && time}</p>
          {displayNotes && <p className="text-dark text-small">{notes && notes}</p>}
          <i className="fa-solid fa-ellipsis fa-2x"/>
        </div>
        <div className={`notes-container ${toggled && `notes-container-toggled`}`}>
          {toggled && <p className="notes text-dark text-small">{notes &&notes}</p>}
          {!toggled ? <i className="fa-solid fa-caret-down"/> : 
          <i className="fa-solid fa-caret-up"/>}
        </div>
        </div>
    </Fragment>
  );
};


