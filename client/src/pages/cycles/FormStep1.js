import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Components
import Input from "../../components/forms/Input";

// Prevent fontawesome from adding css to the head
config.autoAddCss = false;

export default function FormStep1({
  formUtils,
  stepIncrement,
  stepDecrement,
  toggleModal,
}) {
  // Expose react form hook utils
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = formUtils;
  const exercises = ["squat", "bench", "deadlift", "press"];

  return (
    <div className="modal-background">
      <div className="modal-form-container container-flex container-vertical">
        <div className="toolbar">
          <button
            onClick={() => toggleModal()}
            className="toolbar-right btn btn-small-action btn-dark"
          >
            <FontAwesomeIcon icon={solid("xmark")} />
          </button>
        </div>
        <div className="modal-form-items container-flex container-vertical container-vertical-center">
          <form>
            {/* Form inputs for each exercise */}
            {exercises.map((exercise, i) => (
              <Fragment key={exercise}>
                <label
                  htmlFor={exercise}
                  className="text-dark text-bold text-regular"
                >{`${exercise[0].toUpperCase()}${exercise.slice(1)}`}</label>
                <Input
                  register={register}
                  errors={errors}
                  name={exercise}
                  type="text"
                  placeholder="Enter Max"
                  validation={{ required: "Enter your max" }}
                />
              </Fragment>
            ))}
          </form>
          <div className="buttons container-flex container-vertical container-vetical-center">
            <button
              onClick={handleSubmit(stepIncrement)}
              className="btn btn-primary btn-regular my-1"
            >
              submit
            </button>
            <button
              onClick={() => stepDecrement()}
              className="btn btn-dark btn-regular"
            >
              back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
