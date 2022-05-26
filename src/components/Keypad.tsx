import React, { useEffect, useState } from 'react';

interface KeypadProps {
  usedKeys: Record<any, string>;
  setCurrentGuess: React.Dispatch<React.SetStateAction<string>>;
  turn: number;
  currentGuess: string;
  history: any[];
  formatGuess: () => { key: string; color: string }[];
  addNewGuess: ([]) => void;
  // addNewGuess: (TFormatGuess[]) => void;
}

interface TFormatGuess {
  key: string;
  color: string;
}

interface TLetter {
  key: string;
}

const Keypad = ({
  usedKeys,
  setCurrentGuess,
  turn,
  currentGuess,
  history,
  formatGuess,
  addNewGuess,
}: KeypadProps) => {
  const [letters, setLetters] = useState<TLetter[]>([]);

  useEffect(() => {
    // fetch('http://localhost:5000/letters')
    fetch('https://anjola-adeuyi.github.io/wordle-api/letters.json')
      .then((res) => res.json())
      .then((json) => {
        setLetters(json);
      });
    console.log(letters);
  }, []);

  const handleKeyPadClick = (letter: TLetter) => {
    console.log('letter', letter.key);

    if (currentGuess.length < 5) {
      setCurrentGuess((prev) => {
        return prev + letter.key;
      });
    }
  };

  const handleKeyPadEnter = () => {
    if (turn > 5) {
      console.log('you"ve used all your guess turns');
      return;
    }
    //  do not allow duplicate words
    if (history.includes(currentGuess)) {
      console.log('you already guessed that word');
      return;
    }
    // check word is 5 char long
    if (currentGuess.length !== 5) {
      console.log('word must be 5 letters long');
      return;
    }
    const formattedGuess = formatGuess();
    addNewGuess(formattedGuess);
  };

  console.log(letters);

  return (
    <>
      <div className='keypad'>
        {letters &&
          letters.map((letter) => {
            const color = usedKeys[letter.key];
            return (
              <div
                key={letter.key}
                className={color}
                onClick={() => handleKeyPadClick(letter)}
              >
                {letter.key}
              </div>
            );
          })}
      </div>
      <div className='enter' onClick={handleKeyPadEnter}>
        Enter
      </div>
    </>
  );
};

export default Keypad;
