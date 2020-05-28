import React, { Fragment } from 'react';

const WorkoutCard = ({
  onClick,
  setType,
  index,
  set: { weight, reps, completed }
}) => {
  return (
    <Fragment>
      <div className="col-lg-3 col-md-6 my-1">
        <div className="card btn">
          <div
            className="card-body"
            onClick={(e) => onClick(e, setType, index)}
          >
            <h1 className="card-title lead"></h1>
            <p className="card-text lead">
              Set {index + 1}{' '}
              {completed && (
                <i className="fas fa-check" style={{ color: 'green' }}></i>
              )}
            </p>
            <p className="card-text">
              {weight} x {reps}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default WorkoutCard;
