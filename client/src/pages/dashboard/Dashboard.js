import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { logout, loadUser } from '../../actions/auth';
import { getCycles } from '../../actions/cycles';
import PropTypes from 'prop-types';
import Spinner from '../../components/layout/Spinner';
import SummaryCard from './SummaryCard';
import CycleCard from './CycleCard';
import CycleForm from '../cycles/CycleForm';

import UtilityButton from '../../components/buttons/UtilityButton';

const Dashboard = ({
  auth: { loading: authLoading, user },
  cycles: { cycles: cyclesData, loading: cyclesLoading },
  getCycles,
  loadUser,
  logout
}) => {
  useEffect(() => {
    loadUser();
    getCycles();
    window.matchMedia('(max-width: 414px)').addEventListener('change', mediaHandler)
  }, []);

  const [desktop, setDesktop] = useState(window.matchMedia('(max-width: 414px)').matches)
  const [modal, setModal] = useState(false);

  const mediaHandler = e => {
    setDesktop(e.matches)
  }

  const onModalClick = () => {
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
          {modal && <CycleForm/>}
          <div className="toolbar">
            <UtilityButton onClick={()=> logout()}>
              <i className="fa-solid fa-right-from-bracket"/> logout
            </UtilityButton>
            <button className="btn btn-big-action btn-primary" onClick={()=> onModalClick()}><i className="fa-solid fa-plus"/></button>
          </div>
          <div className="summary-cards-container my-2">
            <SummaryCard title='cycles completed' value={user && user.cyclesCompleted}/>
            <SummaryCard light title='workouts left' value={cyclesData && cyclesData[0].workoutsToDo.length}/>
            <SummaryCard light={desktop} title='current workout' value={cyclesData && cyclesData[0].workoutsToDo[0].exercise}/>
            <SummaryCard light={!desktop} title='current week' value={cyclesData && cyclesData[0].workoutsToDo[0].week}/>
          </div>
          <div className="section-header text-dark text-medium">
            Cycles
          </div>
          {/* CycleCards */}
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
