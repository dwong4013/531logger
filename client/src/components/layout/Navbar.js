import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell, faWeightHanging, faList, faHeartbeat, faSyncAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  return (
    <div>
      {!loading && isAuthenticated && (
        <nav className="navbar bg-primary">
          <h1>
            <Link to="/dashboard">
              <FontAwesomeIcon icon={faDumbbell} /> 531 Logger
            </Link>
          </h1>
          <ul>
            <li>
              <Link to="/maxes">
              <FontAwesomeIcon icon={faWeightHanging} /> Maxes
              </Link>
            </li>
            <li>
              <Link to="/main-templates">
              <FontAwesomeIcon icon={faList} /> Main Templates
              </Link>
            </li>
            <li>
              <Link to="/volume-templates">
              <FontAwesomeIcon icon={faHeartbeat} /> Volume Templates
              </Link>
            </li>
            <li>
              <Link to="/cycles">
              <FontAwesomeIcon icon={faSyncAlt} /> Cycles
              </Link>
            </li>
            <li>
              <Link to="/workouts">
                <FontAwesomeIcon icon={faDumbbell} /> Workouts
              </Link>
            </li>
            <li>
              <a onClick={logout} href="#!">
                <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
              </a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
