import React from 'react'

export default function Submit({text}) {
  return (
    <input className="btn btn-primary my-1" type="submit" value={text}/>
  )
}
