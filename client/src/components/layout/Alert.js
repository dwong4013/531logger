import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeAlert } from '../../actions/alert';

const Alert = ({ alert, removeAlert }) => {
  if (alert.msg === null) {
    return null
  }

  return (
    <div className="alert-container">
      <div className={`alert-card alert-${alert.type}`}>
        <i onClick={() => removeAlert(alert.timeoutId)} className="fa-solid fa-xmark text-dark"/>
        <p className="title text-small text-bold text-dark mx-1">{alert.title}</p>
        <p className="description text-dark mx-1">{alert.msg}</p>
      </div>
    </div>
  )
};

Alert.propTypes = {
  alert: PropTypes.object.isRequired,
  removeAlert: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  alert: state.alert
});

export default connect(mapStateToProps, { removeAlert })(Alert);
