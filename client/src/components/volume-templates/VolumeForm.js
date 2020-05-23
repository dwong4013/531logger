import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createVolume } from '../../actions/volume';
import PropTypes from 'prop-types';

const VolumeForm = ({ createVolume, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    trainingMax: '',
    week5s: [
      {
        weight: '',
        reps: ''
      }
    ],
    week3s: [
      {
        weight: '',
        reps: ''
      }
    ],
    week531: [
      {
        weight: '',
        reps: ''
      }
    ],
    push: '',
    pull: ''
  });

  const { name, trainingMax, week5s, week3s, week531, push, pull } = formData;

  // Remaining form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }, history);
  };

  // Submit form data
  const onSubmit = async (e) => {
    e.preventDefault();
    createVolume(formData, history);
  };

  // Week5s form data
  const handleWeek5sChange = (idx, e) => {
    const newWeek5s = week5s.map((set, sidx) => {
      if (idx !== sidx) return set;
      return { ...set, [e.target.name]: e.target.value };
    });
    setFormData({ ...formData, week5s: newWeek5s });
  };

  const handleAddWeek5s = () => {
    const newWeek5s = [...week5s];
    newWeek5s.push({ weight: '', reps: '' });
    setFormData({ ...formData, week5s: newWeek5s });
  };

  const handleRemoveWeek5s = (idx) => {
    const newWeek5s = [...week5s];
    newWeek5s.splice(idx, 1);
    setFormData({ ...formData, week5s: newWeek5s });
  };

  // Week3s form data
  const handleWeek3sChange = (idx, e) => {
    const newWeek3s = week3s.map((set, sidx) => {
      if (idx !== sidx) return set;
      return { ...set, [e.target.name]: e.target.value };
    });
    setFormData({ ...formData, week3s: newWeek3s });
  };

  const handleAddWeek3s = () => {
    const newWeek3s = [...week3s];
    newWeek3s.push({ weight: '', reps: '' });
    setFormData({ ...formData, week3s: newWeek3s });
  };

  const handleRemoveWeek3s = (idx) => {
    const newWeek3s = [...week3s];
    newWeek3s.splice(idx, 1);
    setFormData({ ...formData, week3s: newWeek3s });
  };

  // Week531 form data
  const handleWeek531Change = (idx, e) => {
    const newWeek531 = week531.map((set, sidx) => {
      if (idx !== sidx) return set;
      return { ...set, [e.target.name]: e.target.value };
    });
    setFormData({ ...formData, week531: newWeek531 });
  };

  const handleAddWeek531 = () => {
    const newWeek531 = [...week531];
    newWeek531.push({ weight: '', reps: '' });
    setFormData({ ...formData, week531: newWeek531 });
  };

  const handleRemoveWeek531 = (idx) => {
    const newWeek531 = [...week531];
    newWeek531.splice(idx, 1);
    setFormData({ ...formData, week531: newWeek531 });
  };

  return (
    <Fragment>
      <section className="container-dash">
        <h1 className="medium">Create Your Volume Template</h1>
        <p>Enter as many sets as you need.</p>
        <hr className="my-2" />
        <p className="lead">Template Name</p>
        <form onSubmit={(e) => onSubmit(e)} className="form">
          <div className="form-volume">
            <input
              type="text"
              onChange={(e) => handleChange(e)}
              name="name"
              value={name}
              placeholder="Name"
            />
          </div>
          <p className="lead">Training Max</p>
          <div className="form-volume">
            <input
              type="text"
              onChange={(e) => handleChange(e)}
              name="trainingMax"
              value={trainingMax}
              placeholder="Percentage"
            />
          </div>
          <p className="lead">5's Week</p>
          {week5s.map((set, idx) => (
            <div key={idx} className="form-volume">
              <input
                type="text"
                placeholder={`Set ${idx + 1} Percentage`}
                name="weight"
                value={set.weight}
                onChange={(e) => handleWeek5sChange(idx, e)}
              />
              <input
                type="text"
                name="reps"
                value={set.reps}
                placeholder="Reps"
                onChange={(e) => handleWeek5sChange(idx, e)}
              />
              <input
                type="button"
                value="-"
                onClick={handleRemoveWeek5s}
                className="btn btn-light"
              />
            </div>
          ))}
          <input
            type="button"
            value="Add Set"
            onClick={handleAddWeek5s}
            className="btn btn-light"
          />
          <p className="lead">3's Week</p>
          {week3s.map((set, idx) => (
            <div key={idx} className="form-volume">
              <input
                type="text"
                placeholder={`Set ${idx + 1} Percentage`}
                name="weight"
                value={set.weight}
                onChange={(e) => handleWeek3sChange(idx, e)}
              />
              <input
                type="text"
                name="reps"
                value={set.reps}
                placeholder="Reps"
                onChange={(e) => handleWeek3sChange(idx, e)}
              />
              <input
                type="button"
                value="-"
                onClick={handleRemoveWeek3s}
                className="btn btn-light"
              />
            </div>
          ))}
          <input
            type="button"
            value="Add Set"
            onClick={handleAddWeek3s}
            className="btn btn-light"
          />
          <p className="lead">5/3/1 Week</p>
          {week531.map((set, idx) => (
            <div key={idx} className="form-volume">
              <input
                type="text"
                placeholder={`Set ${idx + 1} Percentage`}
                name="weight"
                value={set.weight}
                onChange={(e) => handleWeek531Change(idx, e)}
              />
              <input
                type="text"
                name="reps"
                value={set.reps}
                placeholder="Reps"
                onChange={(e) => handleWeek531Change(idx, e)}
              />
              <input
                type="button"
                value="-"
                onClick={handleRemoveWeek531}
                className="btn btn-light"
              />
            </div>
          ))}
          <input
            type="button"
            value="Add Set"
            onClick={handleAddWeek531}
            className="btn btn-light"
          />
          <p className="lead">Accessories</p>
          <small>Total Reps per Workout</small>
          <div className="form-volume">
            <input
              type="text"
              onChange={(e) => handleChange(e)}
              name="push"
              value={push}
              placeholder="Push"
            />
          </div>
          <div className="form-volume">
            <input
              type="text"
              onChange={(e) => handleChange(e)}
              name="pull"
              value={pull}
              placeholder="Pull"
            />
          </div>
          <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
      </section>
    </Fragment>
  );
};

VolumeForm.propTypes = {
  createVolume: PropTypes.func.isRequired
};

export default connect(null, { createVolume })(withRouter(VolumeForm));
