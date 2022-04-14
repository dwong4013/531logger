import React, { useState } from 'react'
import Modal from '../../components/modals/Modal';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import FormStep3 from './FormStep3';


export default function CycleForm(props) {
  const forms = [FormStep1, FormStep2, FormStep3]

  const initialState = {
    currentStepIndex: 0,
  }

  const [formState, setFormState] = useState(initialState)
  const { currentStepIndex } = formState
  const Component = forms[currentStepIndex]

  console.log(formState);

  return (
    <Modal>
        <Component formState={formState} setFormState={setFormState} {...props}/>
    </Modal>
  )
}
