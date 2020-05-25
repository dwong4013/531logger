import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getMaxes } from '../../actions/maxes';
import { getVolume } from '../../actions/volume';
import { getMain } from '../../actions/main';
import { createCycle } from '../../actions/cycles';
import Spinner from '../layout/Spinner';

const CycleForm = ({
  maxes: { maxes, loading: maxLoading },
  volume: { volume, loading: volumeLoading },
  main: { main, loading: mainLoading },
  getMaxes,
  getVolume,
  getMain,
  createCycle,
  history
}) => {
  useEffect(() => {
    getMaxes();
    getMain();
    getVolume();
  }, [getMaxes, getMain, getVolume]);

  const [formData, setFormData] = useState({
    maxId: '',
    mainId: '',
    volumeId: ''
  });

  const { mainId, volumeId } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    createCycle({ ...formData, maxId: maxes[0]._id }, history);
    console.log({ ...formData, maxId: maxes[0]._id });
  };

  return (
    <Fragment>
      {maxLoading || mainLoading || volumeLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className="container-dash">
            <h1 className="medium">Create a new cycle.</h1>
            <hr className="my-2" />
            <div className="my-4">
              <h2 className="lead">Current Maxes:</h2>
              <p>Update your maxes before creating a cycle</p>
              <ul className="horizontal-list lead">
                <li>Squat: {maxes[0].squat}</li>
                <li>Bench: {maxes[0].bench}</li>
                <li>Deadlift: {maxes[0].deadlift}</li>
                <li>Press: {maxes[0].press}</li>
              </ul>
            </div>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form form-group">
                <h2 className="lead">Choose a Main Template</h2>
                <select
                  onChange={(e) => handleChange(e)}
                  name="mainId"
                  value={mainId}
                >
                  <option></option>
                  {main.length > 0 ? (
                    main.map((template) => (
                      <option key={template._id} value={template._id}>
                        {template.name}
                      </option>
                    ))
                  ) : (
                    <option>N/A</option>
                  )}
                </select>
              </div>
              <div className="form form-group">
                <h2 className="lead">Choose a Volume Template</h2>

                <select
                  onChange={(e) => handleChange(e)}
                  name="volumeId"
                  value={volumeId}
                >
                  <option></option>
                  {volume.length > 0 ? (
                    volume.map((template) => (
                      <option key={template._id} value={template._id}>
                        {template.name}
                      </option>
                    ))
                  ) : (
                    <option>No Templates Yet</option>
                  )}
                </select>
              </div>
              <input type="submit" value="Create" className="btn btn-primary" />
            </form>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

CycleForm.propTypes = {
  getMaxes: PropTypes.func.isRequired,
  getVolume: PropTypes.func.isRequired,
  getMain: PropTypes.func.isRequired,
  createCycle: PropTypes.func.isRequired,
  maxes: PropTypes.object.isRequired,
  volume: PropTypes.object.isRequired,
  main: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  maxes: state.maxes,
  volume: state.volume,
  main: state.main
});

export default connect(mapStateToProps, {
  getMaxes,
  getVolume,
  getMain,
  createCycle
})(withRouter(CycleForm));
