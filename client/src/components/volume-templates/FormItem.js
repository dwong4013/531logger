import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

const FormItem = ({ week5s }) => {
  const initialState = [...week5s];
  const [formData, setFormData] = useState(initialState);

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
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default FormItem;
