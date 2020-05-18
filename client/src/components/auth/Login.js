import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Success');
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Log In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Log Into Your Account
      </p>
      <form
        action="dashboard.html"
        className="form"
        onSubmit={(e) => onSubmit(e)}
      >
        <div className="form-group">
          <input
            onChange={(e) => handleChange(e)}
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            required
          />
        </div>
        <div className="form-group">
          <input
            onChange={(e) => handleChange(e)}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
          />
        </div>
        <input type="submit" value="Login" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary">
          Register
        </Link>
      </p>
    </Fragment>
  );
};

export default Login;
