import React from 'react'

export default function CardItem({weight, exercise}) {
  return (
    <div className="container-flex container-vertical container-vertical-center">
        <p className="text-dark text-bold">{weight}</p>
        <p className="text-dark text-small">{exercise}</p>
    </div>
  )
}
