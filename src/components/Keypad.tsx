import React, { useEffect, useState } from 'react';

interface KeypadProps {
  letters: TLetter[];
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

export interface TLetter {
  key: string;
}

const Keypad = ({
  letters,
  usedKeys,
  setCurrentGuess,
  turn,
  currentGuess,
  history,
  formatGuess,
  addNewGuess,
}: KeypadProps) => {
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
            console.log(color);
            console.log(usedKeys);
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
