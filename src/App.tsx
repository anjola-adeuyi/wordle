import React, { useEffect, useState } from 'react';
import Wordle from './components/Wordle';

function App() {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    // fetch('http://localhost:5000/solutions')
    fetch('https://anjola-adeuyi.github.io/wordle-api/solutions.json')
      .then((res) => res.json())
      .then((json) => {
        // random int btw 0 & 14
        const randomSolution = json[Math.floor(Math.random() * json.length)];
        setSolution(randomSolution.word);
      });
  }, [setSolution]);

  console.log(solution);

  return (
    <div className='App'>
      <h1>Wordle</h1>
      {solution && <Wordle solution={solution} />}
    </div>
  );
}

export default App;
