import React from 'react'

export default function FormStep3({ formUtils, modal, setModal, handleBack }) {

    const { getValues } = formUtils;
    let { squat, bench, deadlift, press } = getValues();

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
                        <button className="btn btn-primary btn-regular">
                            create
                        </button>
                        <button onClick={() => handleBack()} className="btn btn-dark btn-regular my-1">
                            back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
