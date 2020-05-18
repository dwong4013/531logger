import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">531 Logger</h1>
          <p className="lead">Track your progress</p>
          <div className="buttons">
            <Link className="btn btn-primary" to="/register">
              Sign Up
            </Link>
            <Link className="btn" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
