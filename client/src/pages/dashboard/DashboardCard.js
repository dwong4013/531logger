import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const WorkoutCard = ({ week, index, workout: { exercise, workingSets } }) => {
  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-lg my-1">
            <div className="card my-1">
              <div className="card-body">
                <h1 className="card-title lead">
                  {exercise[0].toUpperCase() + exercise.substring(1)}
                </h1>
                <div>
                  <div>
                    <ul className="horizontal-list">
                      {workingSets.map((set, index) => (
                        <li className="lead m-1" key={index}>
                          <strong>Set {index + 1}:</strong> {set.weight} x{' '}
                          {set.reps}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default WorkoutCard;
