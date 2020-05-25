import React, { Fragment } from 'react';
import Moment from 'react-moment';

const CycleCard = ({ cycle: { date, main, volume } }) => {
  return (
    <Fragment>
      <div className="col-lg-3 col-md-6 my-1">
        <div className="card btn">
          <div className="card-body">
            <h1 className="card-title lead">
              <Moment format="MM/DD/YY">{date}</Moment>
            </h1>
            <p className="card-text lead">
              {main} | {volume}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CycleCard;
