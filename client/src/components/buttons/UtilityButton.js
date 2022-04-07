import React from 'react'

export default function UtilityButton({ onClick, children}) {
  return (
    <button className="btn btn-back btn-icon-left btn-small btn-dark" onClick={onClick}>
        {children}
    </button>
    )
}
