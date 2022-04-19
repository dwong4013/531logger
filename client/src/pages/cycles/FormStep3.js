import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createCycle } from '../../actions/cycles';

function FormStep3({ formUtils: { getValues, handleSubmit }, stepDecrement, toggleModal, createCycle, actionCompleted }) {

     // Get form values
    let { squat, bench, deadlift, press } = getValues();

    const submitData = (data, e) => {
        createCycle(data);
    }

    // Close modal after successfully creating cycle
    if (actionCompleted) {
        toggleModal();
    }

    return (
        <div className="modal-background">
            <div className="modal-form-container container-flex container-vertical">
                <div className='toolbar'>
                    <button onClick={() => toggleModal()} className="toolbar-right btn btn-small-action btn-dark"><i className="fa-solid fa-xmark"/></button>
                </div>
                <div className='modal-form-items container-flex container-vertical container-vertical-center'>
                    <p className="header-text text-primary text-bold text-medium">
                        Your maxes for the next cycle:
                    </p>
                    <div className="form-summary-container my-2">
                        <div className="details">
                            <p className="text-dark text-small"> Squat</p>
                            <p className="text-dark text-bold text-regular"> {squat} </p>
                        </div>
                        <div className="details">
                            <p className="text-dark text-small"> Bench</p>
                            <p className="text-dark text-bold text-regular"> {bench} </p>
                        </div>
                        <div className="details">
                            <p className="text-dark text-small"> Deadlift</p>
                            <p className="text-dark text-bold text-regular"> {deadlift} </p>
                        </div>
                        <div className="details">
                            <p className="text-dark text-small"> Press</p>
                            <p className="text-dark text-bold text-regular"> {press} </p>
                        </div>
                    </div>
                    <div className="buttons container-flex container-vertical container-vetical-center">
                        <button onClick={handleSubmit(submitData)} className="btn btn-primary btn-regular">
                            create
                        </button>
                        <button onClick={() => stepDecrement()} className="btn btn-dark btn-regular my-1">
                            back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

FormStep3.propTypes = {
    createCycle: PropTypes.func.isRequired,
    actionCompleted: PropTypes.bool.isRequired 
}

const mapStateToProps = state => ({
    actionCompleted: state.cycles.actionCompleted
})

export default connect(mapStateToProps, { createCycle })(FormStep3)
