import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { getCycles } from '../../actions/cycles';
import PropTypes from 'prop-types';
import Spinner from '../../components/layout/Spinner';
import SummaryCard from './SummaryCard';
import CycleCard from './CycleCard';
import CycleForm from '../../components/modals/CycleForm2';
import Modal from '../../components/modals/Modal';

import UtilityButton from '../../components/buttons/UtilityButton';

const Dashboard = ({
  auth: { user },
  cycles: { cycles, loading },
  getCycles,
  logout
}) => {
  useEffect(() => {
    getCycles();
    window.matchMedia('(max-width: 414px)').addEventListener('change', mediaHandler)
  }, [getCycles]);

  const [week, setWeek] = useState('week5s');
  const [desktop, setDesktop] = useState(window.matchMedia('(max-width: 414px)').matches)
  const [modal, setModal] = useState(false);

  const mediaHandler = e => {
    console.log(e.matches)
    setDesktop(e.matches)
  }

  const onClick = (e) => {
    setWeek([e.target.name]);
  };

  const onModalClick = () => {
    setModal(!modal)
  }

  return (
    <Fragment>
      <section className="summary-container container-flex container-vertical container-vertical-center">
        {modal && 
        <Modal>
          <CycleForm/>
        </Modal>}
        <div className="toolbar">
          <UtilityButton onClick={()=> logout()}>
            <i className="fa-solid fa-right-from-bracket"/> logout
          </UtilityButton>
          <button className="btn btn-big-action btn-primary" onClick={()=> onModalClick()}><i className="fa-solid fa-plus"/></button>
        </div>
        <div className="summary-cards-container my-2">
          <SummaryCard title='cycles completed' value='1'/>
          <SummaryCard light title='repeated weeks' value='0'/>
          <SummaryCard light={desktop} title='current cycle' value='4'/>
          <SummaryCard light={!desktop} title='workouts left' value='8'/>
        </div>
        <div className="section-header text-dark text-medium">
          Cycles
        </div>
        <CycleCard/>
        <CycleCard/>
        <CycleCard current/>
      </section>
    </Fragment>
  );
};

Dashboard.propTypes = {
  cycles: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCycles: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  cycles: state.cycles,
  auth: state.auth
});

export default connect(mapStateToProps, { getCycles, logout })(Dashboard);
