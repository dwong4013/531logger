import React, { Fragment, useState } from 'react';

export default function SetCard ({id, set, displayNotes}) {
  const  { weight, reps, time, notes } = set;
  // View notes toggle state
  const [ toggled, setToggled ] = useState(false);

  // Toggle note
  const handleToggle = () => {
    setToggled(!toggled)
  }
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
        {!displayNotes && notes && <div className={`notes-container ${toggled && `notes-container-toggled`}`}>
          {toggled && <p className="notes text-dark text-small">{notes && notes}</p>}
          <div onClick={() => handleToggle()}>
            {!toggled ? <i className="fa-solid fa-caret-down"/> : 
            <i className="fa-solid fa-caret-up"/>}
          </div> 
        </div>}
        </div>
    </Fragment>
  );
};


