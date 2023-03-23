import { useCallback, useEffect, useState } from "react"
import HangmanDrawing from "./components/HangmanDrawing";
import HangmanWord from "./components/HangmanWord";
import Keyboard from "./components/Keyboard";
import words from './wordlist.json'

function App() {

  const [wordToGuess, setWordToGuess] = useState(()=>{
    return words[Math.floor(Math.random() * words.length)]
  });

  const[guessLetters, setGuessLetters] = useState<string[]>([]);

  const incorrectLetter = guessLetters.filter( letter => !wordToGuess.includes(letter))

  const addGuessedLetter = useCallback((letter: string) =>{
    if(guessLetters.includes(letter)) return

    setGuessLetters(currentLetters =>[...currentLetters, letter]);
  },[guessLetters])

  useEffect(()=>{
    const handler = (e: KeyboardEvent)=>{
      const key = e.key
      if(!key.match(/^[a-z]$/)) return 

      e.preventDefault();
      addGuessedLetter(key)
    }

    document.addEventListener('keypress', handler)

    return ()=>{
      document.removeEventListener('keypress', handler)
    }
  },[guessLetters])
  
  return <div style={{
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rm',
    margin: '0 auto',
    alignItems: 'center'
  }}>
    <div style={{fontSize: '2rem', textAlign: 'center'}}>Lose Win</div>
    <HangmanDrawing numberOfGuesses={incorrectLetter.length}/>
    <HangmanWord guessedLetters = {guessLetters} wordToGuess={wordToGuess}/>
    <div style={{alignSelf:'stretch'}}>
      <Keyboard activeLetter ={guessLetters.filter(letter => wordToGuess.includes(letter))}/>
    </div>
    
  </div>
}

export default App
