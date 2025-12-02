import React from 'react'

function Word(props) {
  return (
    <div className='letters-word'>
        <p className={props.isSelected  ? `block showletter` : 
          `none ${props.gameOver && 'red block showletter'}`}>
          {props.word}</p>
    </div>
  )
}
// Somente as letras que faltaram ficarão vermelhas
export default Word