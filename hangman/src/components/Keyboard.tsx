import '../modules/Keyboard.modules.css'

const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
]

type KeyboardProps = {
  activeLetter:string[]
  inactiveLetters:string[]
  addGuessedLetter:(letter: string) => void
  disable?: boolean
}

const Keyboard = ({activeLetter, inactiveLetters, addGuessedLetter, disable=false}:KeyboardProps)=> {
  return (
    <div style={{margin:'10px', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(75px, 1fr)', gap:'.5rem'}}>
      {KEYS.map(key =>{
        const isActive = activeLetter.includes(key)
        const isInactive = inactiveLetters.includes(key)
        return <button onClick={()=>addGuessedLetter(key)} className={`btn ${isActive ? 'active' : ''} ${isInactive ? 'inactive' : ''}`} disabled={isInactive || isActive || disable} key={key} >{key}</button>
      })}
    </div>
  )
}

export default Keyboard
