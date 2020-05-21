import React, { Fragment, useEffect } from 'react';
import VolumeCard from './VolumeCard';
import { connect } from 'react-redux';
import { getVolume } from '../../actions/volume';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

const VolumeTemplates = ({ volume: { volume, loading }, getVolume }) => {
  useEffect(() => {
    getVolume();
  }, [getVolume]);

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
              <a href="create-volume.html" className="btn btn-primary my-2">
                <i className="fas fa-plus"></i> Create
              </a>
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
                  <VolumeCard key={template._id} volume={template} />
                ))
              ) : (
                <h4>No maxes found...</h4>
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
  volume: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  volume: state.volume
});

export default connect(mapStateToProps, { getVolume })(VolumeTemplates);
