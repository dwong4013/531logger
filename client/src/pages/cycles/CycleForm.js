import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Modal from '../../components/modals/Modal';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import FormStep3 from './FormStep3';


export default function CycleForm(props) {
  const forms = [FormStep1, FormStep2, FormStep3]

  const formUtils = useForm({
      mode:"onBlur", 
      reValidateMode: 'onBlur'
    });

  const initialState = {
    currentStepIndex: 0,
  }

  const [formState, setFormState] = useState(initialState)
  const { currentStepIndex } = formState
  const Component = forms[currentStepIndex]

  const stepIncrement = () => {
    setFormState({
      ...formState,
      currentStepIndex: formState.currentStepIndex + 1,
  })
}

  const stepDecrement = () => {
    setFormState({
        ...formState,
        currentStepIndex: formState.currentStepIndex - 1,
    })
}

  console.log(formState);

  return (
    <Modal>
        <Component formUtils={formUtils} stepIncrement={stepIncrement} stepDecrement={stepDecrement} {...props}/>
    </Modal>
  )
}
