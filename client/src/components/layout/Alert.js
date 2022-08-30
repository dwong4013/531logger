import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeAlert } from "../../actions/alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Alert = ({ alert, removeAlert }) => {
  if (alert.msg === null) {
    return null;
  }

  return (
    <div className="alert-container">
      <div className={`alert-card alert-${alert.type}`}>
        <FontAwesomeIcon
          onClick={() => removeAlert(alert.timeoutId)}
          icon={solid("xmark")}
          className="text-dark"
        />
        <p className="title text-small text-bold text-dark mx-1">
          {alert.title}
        </p>
        <p className="description text-dark mx-1">{alert.msg}</p>
      </div>
    </div>
  );
};

Alert.propTypes = {
  alert: PropTypes.object.isRequired,
  removeAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps, { removeAlert })(Alert);
