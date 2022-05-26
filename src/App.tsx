import React, { useEffect, useState } from 'react';
import { TLetter } from './components/Keypad';
import Wordle from './components/Wordle';

function App() {
  const [solution, setSolution] = useState<string | null>(null);
  const [letters, setLetters] = useState<TLetter[]>([]);

  useEffect(() => {
    // fetch('http://localhost:5000/solutions')
    fetch('https://anjola-adeuyi.github.io/wordle-api/solutions.json')
      .then((res) => res.json())
      .then((json) => {
        // random int btw 0 & 14
        const randomSolution = json[Math.floor(Math.random() * json.length)];
        setSolution(randomSolution.word);
        console.log('solution called now');
      });

    // fetch('http://localhost:5000/letters')
    fetch('https://anjola-adeuyi.github.io/wordle-api/letters.json')
      .then((res) => res.json())
      .then((json) => {
        setLetters(json);
      });
    console.log('letters called now');
  }, [setSolution, setLetters]);

  // useEffect(() => {
  //   // fetch('http://localhost:5000/letters')
  //   fetch('https://anjola-adeuyi.github.io/wordle-api/letters.json')
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setLetters(json);
  //     });
  //   console.log(letters);
  // }, []);

  console.log(solution);

  return (
    <div className='App'>
      <h1>Wordle</h1>
      {solution && (
        <Wordle
          solution={solution}
          setSolution={setSolution}
          letters={letters}
          setLetters={setLetters}
        />
      )}
    </div>
  );
}

export default App;
