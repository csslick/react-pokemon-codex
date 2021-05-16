import React from 'react'

export default function Pokemon({id, name, image, type}) {
  return (
    <div className='pokemon-info'>
      <span className="pokemon-id">#{id}</span>
      <h4>{name}</h4>
      <img src={image} alt={name} />
      <span className="type">Type: {type}</span>
    </div>
  )
}
