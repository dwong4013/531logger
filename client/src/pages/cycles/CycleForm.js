import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Modal from "../../components/modals/Modal";
import CycleOptions from "./CycleOptions";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FirstCycle from "./FirstCycle";

function CycleForm({ currentCycle, toggleModal }) {
  const formUtils = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const initialState = {
    repeat: false,
    currentStepIndex: 0,
    formData: {
      squat: "",
      bench: "",
      deadlift: "",
      press: "",
    },
  };
  const [formState, setFormState] = useState(initialState);

  // Dyanmic form sequence
  let forms;
  if (!currentCycle) {
    // user's first cycle
    forms = [FirstCycle, FormStep1, FormStep2];
  } else {
    // not the user's first cycle
    forms = [CycleOptions, FormStep1, FormStep2];
  }
  // Dynamic component based on step index
  const Component = forms[formState.currentStepIndex];

  // Repeat Cycle
  const repeatCycle = () => {
    setFormState({
      ...formState,
      repeat: true,
      formData: currentCycle.maxes,
      currentStepIndex: formState.currentStepIndex + 2,
    });
  };

  // Increment step index
  const stepIncrement = () => {
    setFormState({
      ...formState,
      repeat: false,
      currentStepIndex: formState.currentStepIndex + 1,
    });
  };

  // Decrement step index
  const stepDecrement = () => {
    // this will go back to step 1 from step 3 if user is repeating the cycle weight
    if (formState.repeat) {
      setFormState({
        ...formState,
        repeat: false,
        currentStepIndex: formState.currentStepIndex - 2,
      });
      // this will go back one step from any step if the user is increasing weight
    } else {
      setFormState({
        ...formState,
        repeat: false,
        currentStepIndex: formState.currentStepIndex - 1,
      });
    }
  };

  return (
    <Modal>
      <Component
        repeatCycle={repeatCycle}
        formState={formState}
        formUtils={formUtils}
        stepIncrement={stepIncrement}
        stepDecrement={stepDecrement}
        toggleModal={toggleModal}
      />
    </Modal>
  );
}

CycleForm.propTypes = {
  currentCycle: PropTypes.object,
};

const mapStateToProps = (state) => ({
  currentCycle: state.cycles.currentCycle,
});

export default connect(mapStateToProps, {})(CycleForm);
