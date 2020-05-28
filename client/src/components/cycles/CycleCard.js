import React, { Fragment } from 'react';
import Moment from 'react-moment';

const CycleCard = ({ onClick, cycle: { _id, date, main, volume } }) => {
  return (
    <Fragment>
      <div className="col-lg-3 col-md-6 my-1">
        <div className="card">
          <div className="card-body">
            <button
              onClick={(e) => onClick(e, _id)}
              className="close btn btn-danger"
              type="button"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
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
