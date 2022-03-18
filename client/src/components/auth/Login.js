import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { loginUser } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Login = ({ loginUser, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    loginUser(formData);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="container-flex container-vertical container-vertical-center">
        <h1 className="text-dark text-large">Welcome Back!</h1>
        <p className="text-primary text-medium">
          Log into your account
        </p>
        <form
          className="form-center"
          onSubmit={(e) => onSubmit(e)}
        >
            <input
              onChange={(e) => handleChange(e)}
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              required
            />
            <input
              onChange={(e) => handleChange(e)}
              type="password"
              placeholder="Password"
              name="password"
              value={password}
            />
          <input className="btn btn-primary" type="submit" value="Login"/>
        </form>
        <p className="my-1 text-dark text-small">
          Don't have an account? {' '}
          <Link to="/register" className="text-primary text-small">
            Register
          </Link>
        </p>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { loginUser })(Login);
