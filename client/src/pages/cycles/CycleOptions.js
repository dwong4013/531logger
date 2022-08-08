import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'


export default function CycleOptions({ repeatCycle, stepIncrement, toggleModal }) {

  return (
      <div className="modal-background">
        <div className="modal-form-container container-flex container-vertical">
            <div className='toolbar modal-toolbar'>
                <button onClick={()=> toggleModal()} className="toolbar-right btn btn-small-action btn-dark"><FontAwesomeIcon icon={solid('xmark')} /></button>
            </div>
            <div className='modal-form-items container-flex container-vertical container-vertical-center'>
            <p className="header-text text-primary text-bold text-medium my-2">
                What maxes do you want to use?
            </p>
            <div className="buttons container-flex container-vertical container-vetical-center">
                <button onClick={() => stepIncrement()}className="btn btn-primary btn-regular">
                    increase
                </button>
                <button onClick={() => repeatCycle()} className="btn btn-dark btn-regular my-1">
                    repeat
                </button>
            </div>

            </div>
        </div>
      </div>
  )
}
