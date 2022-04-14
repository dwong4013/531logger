import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Modal from '../../components/modals/Modal';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import FormStep3 from './FormStep3';


export default function CycleForm(props) {
  const formUtils = useForm({
    mode:"onBlur", 
    reValidateMode: 'onBlur'
  });

  const [formState, setFormState] = useState({currentStepIndex: 0})

  // Dynamic component based on step index
  const forms = [FormStep1, FormStep2, FormStep3]
  const Component = forms[formState.currentStepIndex]

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
        <Component formUtils={formUtils} stepIncrement={stepIncrement} stepDecrement={stepDecrement} {...props}/>
    </Modal>
  )
}
