import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import { loginUser } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import Input from '../../components/forms/Input';
import Submit from '../../components/forms/Submit';

const Login = ({ loginUser, isAuthenticated }) => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    mode:"onBlur", 
    reValidateMode: 'onBlur'
  });

  const onSubmit = (data) => {
    loginUser(data);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="container-flex container-vertical container-vertical-center mx-2">
      <h1 className="text-primary text-large">Welcome Back!</h1>
      <p className="text-dark text-medium">
        Log into your account
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input register={register} errors={errors}
          name='email' 
          type='email' 
          placeholder='Email'
          validation={{required: 'Please enter an email'}}
        />
        <Input register={register} errors={errors}
          name='password'
          type='password'
          placeholder='Password'
          validation={{required: 'Please enter a password'}}
        />
        <Submit text='Login'/>
      </form>
      <p className="my-1 text-dark text-small">
        Don't have an account? {' '}
        <Link to="/register" className="text-primary text-small">
          Register
        </Link>
      </p>
    </div>
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
