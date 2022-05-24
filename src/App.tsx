import React, { useEffect, useState } from 'react';

function App() {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/solutions')
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
      {solution ? <h2>{solution}</h2> : <h2>Loading...</h2>}
    </div>
  );
}

export default App;
