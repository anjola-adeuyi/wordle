import React, { useEffect, useState } from 'react';

interface KeypadProps {
  usedKeys: Record<any, string>;
}

interface TLetter {
  key: string;
}

const Keypad = ({ usedKeys }: KeypadProps) => {
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

  console.log(letters);

  return (
    <div className='keypad'>
      {letters &&
        letters.map((letter) => {
          const color = usedKeys[letter.key];
          return (
            <div key={letter.key} className={color}>
              {letter.key}
            </div>
          );
        })}
    </div>
  );
};

export default Keypad;
