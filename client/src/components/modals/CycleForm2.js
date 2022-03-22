import React from 'react'

export default function CycleForm2() {
  return (
      <div className="modal-background">
        <div className="modal-form-container container-flex container-vertical container-vertical-center">
            <p className="header-text text-primary text-bold text-medium my-2">
                What maxes do you want to use?
            </p>
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
  )
}
