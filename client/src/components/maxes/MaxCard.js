import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const MaxCard = ({
  onClick,
  max: { _id, date, squat, bench, deadlift, press }
}) => {
  return (
    <div className="row">
      <div className="col-lg my-1">
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
            <ul className="horizontal-list">
              <li className="p-1 lead">Squat: {squat}</li>
              <li className="p-1 lead">Bench: {bench}</li>
              <li className="p-1 lead">Deadlift: {deadlift}</li>
              <li className="p-1 lead">Press: {press}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

MaxCard.propTypes = {
  max: PropTypes.object.isRequired
};

export default MaxCard;
