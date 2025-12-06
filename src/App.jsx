import './App.css'
import { useState,useEffect } from 'react'
import Letra from './Letra.jsx'
import Word from './Word.jsx'
import Chances from './Chances.jsx'
export default function App() {

  // const wordJSX = word.split('').map( (el) => {
  //   return <div className='letters-word'>
  //     <p className='none'>{el}</p>
  //   </div>
  //   })

  // todo - useEffect para pegar a palavra, botão de new game

  const [getWord,setGetWord] = useState(0)

  const [word,setWord] = useState('')
  const [selectedLetters, setSelectedLetters] = useState([])
  const [chances, setChances] = useState(0)

  useEffect(() => {
    fetch('https://random-word-api.vercel.app/api?words=1' )
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        setWord(data.join('').toUpperCase())})
      
  }, [getWord])


  const letrasArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'] 
  const letrasJSX = letrasArray.map( ( el, key ) => {
    const wasSelected = selectedLetters.includes(el)
    const isCorrect = wasSelected && word.includes(el)
      
    return <Letra
          letra={el}
          key={el}
          select={selecLetter}
          vef={vefChances}
          isSelected={wasSelected}
          isCorrect={isCorrect}
          gameOver={chances == 8}
        />
  })

  function selecLetter(value){
    setSelectedLetters(prevValue => [...prevValue, value])
  }

  // Lógica de total de chances
  function vefChances(value){
      if(word.split('').includes(value)){
        return true
      }else{
        setChances( prevValue => prevValue = prevValue + 1)
        return false
      }

  }

  const wordJSX = word.split('').map( (el,key) => {
     return <Word
      word={el}
      key={key}
      gameOver={chances == 8}
      // Alguma letra de word está nesse array selectedletters, cada componente irá verificar
      // se ele esta naquele nesse array, se estiver display=block
      isSelected = {selectedLetters.includes(el)}
      />

   })

  const chancesJSX = Array.from({length:8},(el,index) =>{
    return <Chances
    key={index}
    id={index}
    value={index < chances}
    />  
  })

  console.log('HERE')
  console.log('letras ⬇️',letrasJSX)
  console.log('palavra ⬇️',wordJSX)
  console.log(selectedLetters)
 
  function newGame(){
    setChances(0)
    setSelectedLetters([])
    setGetWord( prev => prev + 1)
  }

  return (
    <main>
      <div className='header'>
         <h1>Jogo da Forca</h1>
      <p>Acerte a palavra em 8 tentativas!</p>

      <div className='chances-cont'>
        {chancesJSX}
      </div>

      </div>

      <div className='word'>

          {wordJSX}
      </div>

      <div className='container-letras'>
        <div className='letras'>{letrasJSX}</div>
      </div>
      {wordJSX.every( el => el.props.isSelected == true) &&
        <div>
        <h1 style={{marginTop:'20px'}}>VOCE GANHOU!</h1>
          <button className='newGame' onClick={newGame}>NEW GAME</button>
        </div>
      }
      
      
      {chances == 8 && 
        <div>
        <h1 style={{marginTop:'20px'}}>VOCE PERDEU!</h1>
          <button className='newGame' onClick={newGame}>NEW GAME</button>
        </div>
        
        
        }

    </main>
  )
}

