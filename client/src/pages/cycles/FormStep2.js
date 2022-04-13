import React from 'react'

export default function FormStep2() {
  return (
      <div className="modal-background">
        <div className="modal-form-container container-flex container-vertical container-vertical-center">
            <form>
                <p className="text-dark text-bold text-regular">Squat</p>
                <input type="text" placeholder="Enter Max"/>
                <p className="text-dark text-bold text-regular">Bench</p>
                <input type="text" placeholder="Enter Max"/>
                <p className="text-dark text-bold text-regular">Deadlift</p>
                <input type="text" placeholder="Enter Max"/>
                <p className="text-dark text-bold text-regular">Press</p>
                <input type="text" placeholder="Enter Max"/>
            </form>
            <div className="buttons container-flex container-vertical container-vetical-center">
                <button className="btn btn-primary btn-regular my-1">
                    submit
                </button>
                <button className="btn btn-dark btn-regular">
                    back
                </button>
            </div>
        </div>
      </div>
  )
}
