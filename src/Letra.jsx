import React from 'react'

function Letra(props) {
  
  return (
    
    <div onClick={() => props.vef(props.letra)}>
       <button 
       disabled={ props.isSelected || props.gameOver }
       className={ props.isCorrect ? 'letraOk' : 'letra-Comp'}
       onClick={() => props.select(props.letra) }>
        {props.letra}</button>
        </div>
  )
}

export default Letra