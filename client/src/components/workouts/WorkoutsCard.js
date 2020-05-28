import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const WorkoutCard = ({
  week,
  index,
  workout: { exercise, workingSets, volumeSets, accessoryReps }
}) => {
  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-lg my-1">
            <div className="card my-2">
              <Link className="btn btn-card" to={`/workout/${week}/${index}`}>
                <div className="card-body">
                  <h1 className="card-title lead">
                    {exercise[0].toUpperCase() + exercise.substring(1)}
                  </h1>
                  <div className="list-set">
                    <div>
                      <ul>
                        <li className="lead">Working Sets</li>
                        {workingSets.map((set, index) => (
                          <li key={index}>
                            Set {index + 1}: {set.weight} x {set.reps}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <ul>
                        <li className="lead">Volume Sets</li>
                        {volumeSets.map((set, index) => (
                          <li key={index}>
                            Set {index + 1}: {set.weight} x {set.reps}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <ul>
                        <li className="lead">Accessory Reps</li>
                        <li>Push: {accessoryReps.push} Reps</li>
                        <li>Pull: {accessoryReps.pull} Reps</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default WorkoutCard;
