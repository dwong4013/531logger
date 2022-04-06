import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { registerUser } from '../../actions/auth';
import PropTypes from 'prop-types';

import Input from '../../components/forms/Input'
import Submit from '../../components/forms/Submit'

const Register = ({ setAlert, registerUser, isAuthenticated }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    mode:"onBlur", 
    reValidateMode: 'onBlur'
  });

  const onSubmit = ({ name, email, password, password2}) => {
    if (password !== password2) {
      setAlert('Error', 'Passwords do not match', 'danger');
    } else {
      registerUser({ name, email, password });
    }
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
      <div className="container-flex container-vertical container-vertical-center mx-2">
        <h1 className="text-primary text-large">Welcome Aboard!</h1>
        <p className="text-medium text-dark">
          Register a new account
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input register={register} errors={errors}
            type='text'
            name='name'
            placeholder='Name'
            validation={{required: 'Please enter a name',
            maxLength: {
              value: 50,
              message: 'Name can\'t exceed 50 characters'
            }}}
          />
          <Input register={register} errors={errors}
            type='email'
            name='email'
            placeholder='Email'
            validation={{required: 'Please enter an email'}}
          />
          <Input register={register} errors={errors}
            type='password'
            name='password'
            placeholder='Password'
            validation={{required: 'Please enter a password',
            minLength: {
              value :6,
              message: 'Password should be at least 6 characters'
            }}}
          />
          <Input register={register} errors={errors}
            type='password'
            name='password2'
            placeholder='Re-enter Password'
            validation={{required: 'Please re-enter your password',
            minLength: {
              value :6,
              message: 'Password should be at least 6 characters'
            }}}
          />
          <Submit text="Register"/>
        </form>
        <p className="my-1 text-dark text-small">
          Already have an account?{' '}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </p>
      </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, registerUser })(Register);
