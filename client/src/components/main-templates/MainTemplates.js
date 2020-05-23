import React, { Fragment } from 'react';

const MainTemplates = () => {
  return (
    <Fragment>
      <section className="container-dash">
        <div className="jumbotron">
          <p className="lead text-primary">
            Build your cycles with these two 5/3/1 staples.
          </p>
          <p>Your training max is found in your volume templates.</p>
          <hr className="my-2" />
          <div
            className="btn-group"
            role="group"
            aria-label="Basic example"
          ></div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg my-1">
              <div className="card btn-card my-2">
                <div className="card-body">
                  <h1 className="card-title lead">5/3/1</h1>
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
                        <td>Set 1: 70% x 3</td>
                        <td>Set 1: 75% x 5</td>
                      </tr>
                      <tr>
                        <td>Set 2: 75% x 5</td>
                        <td>Set 2: 80% x 3</td>
                        <td>Set 2: 85% x 3</td>
                      </tr>
                      <tr>
                        <td>Set 3: 85% x 5</td>
                        <td>Set 3: 90% x 3</td>
                        <td>Set 3: 95% x 1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card btn-card my-2">
                <div className="card-body">
                  <h1 className="card-title lead">5's Progression</h1>
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
                        <td>Set 2: 75% x 5</td>
                        <td>Set 2: 80% x 5</td>
                        <td>Set 2: 85% x 5</td>
                      </tr>
                      <tr>
                        <td>Set 3: 85% x 5</td>
                        <td>Set 3: 90% x 5</td>
                        <td>Set 3: 95% x 5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default MainTemplates;
