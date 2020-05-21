import React, { Fragment } from 'react';

const VolumeCard = ({
  volume: { name, trainingMax, volumeSets, accessoryReps }
}) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-lg my-1">
          <div className="card btn-card my-2">
            <div className="card-body">
              <h1 className="card-title lead">{name}</h1>
              <p>Training Max: {trainingMax * 100}%</p>
              <table>
                <thead>
                  <tr className="my-1">
                    <th>5's Week</th>
                    <th>3's Week</th>
                    <th>5/3/1 Week</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Set 1: 65% x 5</td>
                    <td>Set 1: 70% x 5</td>
                    <td>Set 1: 75% x 5</td>
                  </tr>
                  <tr>
                    <td>Set 2: 65% x 5</td>
                    <td>Set 2: 70% x 5</td>
                    <td>Set 2: 75% x 5</td>
                  </tr>
                  <tr>
                    <td>Set 3: 65% x 5</td>
                    <td>Set 3: 70% x 5</td>
                    <td>Set 3: 75% x 5</td>
                  </tr>
                  <tr>
                    <td>Set 4: 65% x 5</td>
                    <td>Set 4: 70% x 5</td>
                    <td>Set 4: 75% x 5</td>
                  </tr>
                  <tr>
                    <td>Set 5: 65% x 5</td>
                    <td>Set 5: 70% x 5</td>
                    <td>Set 5: 75% x 5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VolumeCard;
