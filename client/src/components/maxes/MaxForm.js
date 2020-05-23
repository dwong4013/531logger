import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { createMax } from '../../actions/maxes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const MaxForm = ({ createMax, history }) => {
  const [formData, setFormData] = useState({
    squat: '',
    bench: '',
    deadlift: '',
    press: ''
  });

  const { squat, bench, deadlift, press } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    createMax(formData, history);
  };
  return (
    <Fragment>
      <section className="container-dash">
        <h1 className="medium">Create a new maxes record.</h1>
        <hr className="my-2" />
        <h2 className="lead">Enter your maxes.</h2>
        <form
          onSubmit={(e) => onSubmit(e)}
          action="maxes.html"
          className="form"
        >
          <div className="form-group">
            <input
              onChange={handleChange}
              type="text"
              name="squat"
              value={squat}
              placeholder="Squat"
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange}
              type="text"
              name="bench"
              value={bench}
              placeholder="Bench"
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange}
              type="text"
              name="deadlift"
              value={deadlift}
              placeholder="Deadlift"
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange}
              type="text"
              name="press"
              value={press}
              placeholder="Press"
            />
          </div>
          <input type="submit" value="Create" className="btn btn-primary" />
        </form>
      </section>
    </Fragment>
  );
};

MaxForm.propTypes = {
  createMax: PropTypes.func.isRequired
};

export default connect(null, { createMax })(withRouter(MaxForm));
