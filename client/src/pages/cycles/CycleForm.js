import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../components/modals/Modal';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import FormStep3 from './FormStep3';


function CycleForm({ currentCycle, toggleModal }) {
  const formUtils = useForm({
    mode:"onBlur", 
    reValidateMode: 'onBlur'
  });

  const initialState = {
    repeat: false,
    currentStepIndex: 0,
    formData: {
      squat: '',
      bench: '',
      deadlift: '',
      press: ''
    }
  }
  const [formState, setFormState] = useState(initialState)

  // Dynamic component based on step index
  const forms = [FormStep1, FormStep2, FormStep3]
  const Component = forms[formState.currentStepIndex]

  // Repeat Cycle
  const repeatCycle = () => {
    setFormState({
      ...formState,
      repeat: true,
      formData: currentCycle.maxes,
      currentStepIndex: formState.currentStepIndex + 2
    })
  }

  // Increment step index
  const stepIncrement = () => {
    setFormState({
      ...formState,
      currentStepIndex: formState.currentStepIndex + 1,
  })
  }

  // Decrement step index
  const stepDecrement = () => {
    setFormState({
        ...formState,
        currentStepIndex: formState.currentStepIndex - 1,
    })
}

  return (
    <Modal>
        <Component repeatCycle={repeatCycle} formState={formState} formUtils={formUtils} stepIncrement={stepIncrement} stepDecrement={stepDecrement} toggleModal={toggleModal}/>
    </Modal>
  )
}

CycleForm.propTypes = {
  currentCycle: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  currentCycle: state.cycles.currentCycle
})

export default connect(mapStateToProps, {})(CycleForm)