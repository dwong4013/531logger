import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { logout, loadUser } from '../../actions/auth';
import { getCycles } from '../../actions/cycles';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'

// Components
import Spinner from '../../components/layout/Spinner';
import SummaryCard from './SummaryCard';
import CycleCard from './CycleCard';
import CycleForm from '../cycles/CycleForm';
import UtilityButton from '../../components/buttons/UtilityButton';

// Prevent fontawesome from adding css to the head
config.autoAddCss = false;

const Dashboard = ({
  auth: { loading: authLoading, user },
  cycles: { cycles: cyclesData, loading: cyclesLoading },
  getCycles,
  loadUser,
  logout
}) => {
  // load user and cycles data and listen to screen width changes
  useEffect(() => {
    loadUser();
    getCycles();
    window.matchMedia('(max-width: 414px)').addEventListener('change', (e) => setDesktop(e.matches))
  }, [loadUser,getCycles]);

  // Expose hooks utils
  const [desktop, setDesktop] = useState(window.matchMedia('(max-width: 414px)').matches)
  const [modal, setModal] = useState(false);

  // Toggle modal open/close
  const toggleModal = () => {
    setModal(!modal)
  }

  return (
    <Fragment>
      {authLoading && 
      cyclesLoading && 
      cyclesData === null &&
      user === null ? (
      <Spinner/>
      ):(
      <Fragment>
        <section className="summary-container container-flex container-vertical container-vertical-center">
          {/* Render modal*/}
          {modal && <CycleForm toggleModal={toggleModal}/>}
          {/* Logout and Create Cycle Buttons */}
          <div className="toolbar">
            <UtilityButton classes={'toolbar-left'} onClick={()=> logout()}>
              <FontAwesomeIcon icon={solid('right-from-bracket')} /> logout
            </UtilityButton>
            <button data-testid='create-cycle-button' className="toolbar-right btn btn-big-action btn-primary" onClick={()=> toggleModal()}><FontAwesomeIcon icon={solid('plus')} /></button>
          </div>
          {/* Summary Info */}
          <div className="summary-cards-container my-2">
            <SummaryCard title='cycles completed' value={user && user.cyclesCompleted}/>
            <SummaryCard light title='workouts left' value={cyclesData && cyclesData[0].workoutsToDo.length}/>
            <SummaryCard light={desktop} title='current workout' value={cyclesData && cyclesData[0].workoutsToDo[0].exercise}/>
            <SummaryCard light={!desktop} title='current week' value={cyclesData && cyclesData[0].workoutsToDo[0].week}/>
          </div>
          <div className="section-header text-dark text-medium">
            Cycles
          </div>
          {/* Cycles Data */}
            {!cyclesLoading && cyclesData !== null ? (
              cyclesData.map((cycle, key) => (<CycleCard cycle={cycle} key={key} current={key===0}/>)) 
            ):( 
              <p className="text-primary text-regular">No cycles available, create one to get started</p>
            )}
        </section>
      </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  cycles: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCycles: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  cycles: state.cycles,
  auth: state.auth
});

export default connect(mapStateToProps, { getCycles, logout, loadUser })(Dashboard);
