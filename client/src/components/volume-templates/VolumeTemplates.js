import React, { Fragment, useEffect } from 'react';
import VolumeCard from './VolumeCard';
import { connect } from 'react-redux';
import { getVolume, deleteVolume } from '../../actions/volume';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

const VolumeTemplates = ({
  volume: { volume, loading },
  getVolume,
  deleteVolume
}) => {
  useEffect(() => {
    getVolume();
  }, [getVolume]);

  const onClick = (e, id) => {
    deleteVolume(id);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className="container-dash">
            <div className="jumbotron">
              <p className="lead text-primary">
                Volume templates accompany your main templates when generating a
                cycle.
              </p>
              <p>
                Create as many volume templates as you want. You can select any
                one of them when you generate a new cycle
              </p>
              <Link to="/create-volume" className="btn btn-primary my-2">
                <i className="fas fa-plus"></i> Create
              </Link>
              <hr className="my-2" />
              <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
              ></div>
            </div>
            <div className="container">
              {volume.length > 0 ? (
                volume.map((template) => (
                  <VolumeCard
                    onClick={onClick}
                    key={template._id}
                    volume={template}
                  />
                ))
              ) : (
                <h4>No volume templates found...</h4>
              )}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

VolumeTemplates.propTypes = {
  getVolume: PropTypes.func.isRequired,
  deleteVolume: PropTypes.func.isRequired,
  volume: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  volume: state.volume
});

export default connect(mapStateToProps, { getVolume, deleteVolume })(
  VolumeTemplates
);
