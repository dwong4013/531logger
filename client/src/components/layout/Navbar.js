import React from 'react';

const Navbar = () => {
  return (
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
      </ul>
    </nav>
  );
};

export default Navbar;
