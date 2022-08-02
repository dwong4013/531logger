import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createCycle } from '../../actions/cycles';

function FormStep2({ formUtils: { getValues, handleSubmit }, formState, stepDecrement, toggleModal, createCycle, actionCompleted }) {
    // Close modal after successfully creating cycle
    useEffect(() => {
        if (actionCompleted) {
            toggleModal();
        }
    },[actionCompleted, toggleModal])

    let initialState = {}
    // use existing maxes for repeat cycles
    if (formState.repeat) {
        initialState = {
            ...formState.formData
        }
    // use form values for new maxes
    } else {
        initialState = {
            ...getValues()
        }
    }
    // hook for summary of maxes
    const [summaryData] = useState(initialState)
    const { squat, bench, deadlift, press } = summaryData;

    //action creator to create new cycle 
    const submitData = (data, e) => {
        if (formState.repeat) {
            createCycle(formState.formData);
        }
        createCycle(data);
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

FormStep2.propTypes = {
    createCycle: PropTypes.func.isRequired,
    actionCompleted: PropTypes.bool 
}

const mapStateToProps = state => ({
    actionCompleted: state.cycles.actionCompleted
})

export default connect(mapStateToProps, { createCycle })(FormStep2)
