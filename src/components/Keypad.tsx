import React, { useEffect, useState } from 'react';

interface TLetter {
  key: string;
}

const Keypad = () => {
  const [letters, setLetters] = useState<TLetter[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/letters')
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
          return <div key={letter.key}>{letter.key}</div>;
        })}
    </div>
  );
};

export default Keypad;
