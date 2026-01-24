import React from 'react'

function Chances(props) {
  return (
    <div className='chances'>
      <p className={props.value ? 'animation' : ''}>{ props.value ? 'X' : ''}</p>
       
        
    </div>
  )
}

export default Chances