import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons';


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
            <p className="card-text lead">
              Set {index + 1}{' '}
              {completed && (
                <FontAwesomeIcon icon={faCheck} style={{color: 'green'}}/>
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
