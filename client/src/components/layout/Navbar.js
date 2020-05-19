import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  return (
    <div>
      {!loading && isAuthenticated && (
        <nav className="navbar bg-primary">
          <h1>
            <Link to="/dashboard">
              <i className="fas fa-dumbbell"></i> 531 Logger
            </Link>
          </h1>
          <ul>
            <li>
              <Link to="/maxes">
                <i className="fas fa-weight-hanging"></i> Maxes
              </Link>
            </li>
            <li>
              <Link to="/main-templates">
                <i className="fas fa-list-ol"></i> Main Templates
              </Link>
            </li>
            <li>
              <Link to="/volume-templates">
                <i className="fas fa-heartbeat"></i> Volume Templates
              </Link>
            </li>
            <li>
              <Link to="/cycles">
                <i className="fas fa-sync-alt"></i>Cycles
              </Link>
            </li>
            <li>
              <Link to="/workouts">
                <i className="fas fa-dumbbell"></i> Workouts
              </Link>
            </li>
            <li>
              <a onClick={logout} href="#!">
                <i class="fas fa-sign-out-alt"></i> Sign Out
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
  auth: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
