import { useCallback, useEffect, useState } from "react"
import HangmanDrawing from "./components/HangmanDrawing";
import HangmanWord from "./components/HangmanWord";
import Keyboard from "./components/Keyboard";
import words from './wordlist_spanish.json'

function App() {

  const getWord = () =>{
    return words[Math.floor(Math.random() * words.length)]
  }

  const [wordToGuess, setWordToGuess] = useState(()=>{    
    return getWord();
  });

  const[guessLetters, setGuessLetters] = useState<string[]>([]);

  const incorrectLetters = guessLetters.filter( letter => !wordToGuess.includes(letter))

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess.split('').every(letter => guessLetters.includes(letter));

  const addGuessedLetter = useCallback((letter: string) =>{
    if(guessLetters.includes(letter) || isLoser || isWinner) return

    setGuessLetters(currentLetters =>[...currentLetters, letter]);
  },[guessLetters, isWinner, isLoser])

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

  useEffect(()=>{
    const handler = (e: KeyboardEvent)=>{
      const key = e.key
      if(key!=='Enter') return 
      e.preventDefault();
      setGuessLetters([]);
      setWordToGuess(getWord());
    }

    document.addEventListener('keypress', handler)

    return ()=>{
      document.removeEventListener('keypress', handler)
    }
  },[])
  
  return <div style={{
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rm',
    margin: '0 auto',
    alignItems: 'center'
  }}>
    <div style={{fontSize: '2rem', textAlign: 'center'}}>
      {isWinner && 'Winner! - Refresh to try again'}
      {isLoser && 'Nice Try - Refresh to try again'}
    </div>
    <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
    <HangmanWord guessedLetters = {guessLetters} wordToGuess={wordToGuess} reveal={isLoser}/>
    <div style={{alignSelf:'stretch'}}>
      <Keyboard activeLetter ={guessLetters.filter(letter => wordToGuess.includes(letter))} inactiveLetters={incorrectLetters} addGuessedLetter={addGuessedLetter} disable={isWinner || isLoser}/>

    </div>
    
  </div>
}

export default App
