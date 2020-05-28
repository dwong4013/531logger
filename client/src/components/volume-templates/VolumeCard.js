import React, { Fragment } from 'react';

const VolumeCard = ({
  onClick,
  volume: { _id, name, trainingMax, week5s, week3s, week531, accessoryReps }
}) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-lg my-1">
          <div className="card my-2">
            <div className="card-body">
              <button
                onClick={(e) => onClick(e, _id)}
                className="close btn btn-danger"
                type="button"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>

              <h1 className="card-title lead">{name}</h1>
              <p>Training Max: {trainingMax * 100}%</p>
              <p>Accessory Push Reps: {accessoryReps.push} reps</p>
              <p>Accessory Pull Reps: {accessoryReps.pull} reps</p>
              <div className="list-set">
                <div>
                  <ul>
                    <li className="lead">5's Week</li>
                    {week5s.map((set, index) => (
                      <li key={index}>
                        Set {index + 1}: {set.weight * 100}% x {set.reps}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <ul>
                    <li className="lead">3's Week</li>
                    {week3s.map((set, index) => (
                      <li key={index}>
                        Set {index + 1}: {set.weight * 100}% x {set.reps}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <ul>
                    <li className="lead">5/3/1 Week</li>
                    {week531.map((set, index) => (
                      <li key={index}>
                        Set {index + 1}: {set.weight * 100}% x {set.reps}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VolumeCard;
