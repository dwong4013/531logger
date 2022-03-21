import React, { Fragment } from 'react';

export default function SetCard ({notes = 'Struggled on the 3rd rep, but felt easy', displayNotes, toggled = true}) {
  return (
    <Fragment>
      <div className="set-card set-card-container">
        <div className="set-card-details">
          <p className="text-dark text-small">set 1</p>
          <p className="text-dark text-regular text-bold">200 lbs</p>
          <p className="text-dark text-regular text-bold">5 reps</p>
          <p className="text-primary text-small"> 10:04am</p>
          {displayNotes && <p className="text-dark text-small">{notes}</p>}
          <i className="fa-solid fa-ellipsis fa-2x"/>
        </div>
        <div className={`notes-container ${toggled && `notes-container-toggled`}`}>
          {toggled && <p className="notes text-dark text-small">{notes}</p>}
          {!toggled ? <i className="fa-solid fa-caret-down"/> : 
          <i className="fa-solid fa-caret-up"/>}
        </div>
        </div>
    </Fragment>
  );
};


