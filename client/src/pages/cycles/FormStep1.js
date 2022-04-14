import React from 'react'

export default function FormStep1({ formState, setFormState, modal, setModal }) {

    const handleClick = () => {
        setFormState({
            ...formState,
            currentStepIndex: formState.currentStepIndex + 1
        })
    }
  return (
      <div className="modal-background">
        <div className="modal-form-container container-flex container-vertical">
            <div className='toolbar modal-toolbar'>
                <button onClick={()=> setModal(!modal)} className="toolbar-right btn btn-small-action btn-dark"><i className="fa-solid fa-xmark"/></button>
            </div>
            <div className='modal-form-items container-flex container-vertical container-vertical-center'>
            <p className="header-text text-primary text-bold text-medium my-2">
                What maxes do you want to use?
            </p>
            <div className="buttons container-flex container-vertical container-vetical-center">
                <button onClick={() => handleClick()}className="btn btn-primary btn-regular">
                    increase
                </button>
                <button className="btn btn-dark btn-regular my-1">
                    repeat
                </button>
            </div>

            </div>
        </div>
      </div>
  )
}
