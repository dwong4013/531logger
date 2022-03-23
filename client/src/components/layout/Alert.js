import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>{
  // alerts !== null &&
  // alerts.length > 0 &&
  // alerts.map((alert) => (
  //   <div key={alert.id} className={`alert alert-${alert.alertType}`}>
  //     {alert.msg}
  //   </div>
    return (
      <div className="alert-container">
        <div className="alert-card alert-success">
          <i className="fa-solid fa-xmark text-dark"/>
          <p className="title text-small text-bold text-dark mx-1">Success</p>
          <p className="description text-dark mx-1">A new cycle has been created!</p>
        </div>
      </div>
)};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
