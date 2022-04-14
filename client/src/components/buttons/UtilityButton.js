import React from 'react'

export default function UtilityButton({ onClick, classes, children,}) {
  return (
    <button className={`btn btn-back btn-icon-left btn-small btn-dark ${classes}`} onClick={onClick}>
        {children}
    </button>
    )
}
