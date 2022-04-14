import React from 'react'

export default function FormStep3({ modal, setModal }) {
  return (
      <div className="modal-background">
        <div className="modal-form-container container-flex container-vertical">
            <div className='toolbar'>
                <button onClick={()=> setModal(!modal)} className="toolbar-right btn btn-small-action btn-dark"><i className="fa-solid fa-xmark"/></button>
            </div>
            <div className='modal-form-items container-flex container-vertical container-vertical-center'>
                <p className="header-text text-primary text-bold text-medium">
                    Your maxes for the next cycle:
                </p>
                <div className="form-summary-container my-2">
                    <div className="details">
                        <p className="text-dark text-small"> Squat</p>
                        <p className="text-dark text-bold text-regular"> 250lbs </p>
                    </div>
                    <div className="details">
                        <p className="text-dark text-small"> Squat</p>
                        <p className="text-dark text-bold text-regular"> 250lbs </p>
                    </div>
                    <div className="details">
                        <p className="text-dark text-small"> Squat</p>
                        <p className="text-dark text-bold text-regular"> 250lbs </p>
                    </div>
                    <div className="details">
                        <p className="text-dark text-small"> Squat</p>
                        <p className="text-dark text-bold text-regular"> 250lbs </p>
                    </div>
                </div>
                <div className="buttons container-flex container-vertical container-vetical-center">
                    <button className="btn btn-primary btn-regular">
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
