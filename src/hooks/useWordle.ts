import { useState } from 'react';

const useWordle = (solution: string) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState<string[]>(['qwert']);
  const [isCorrect, setIsCorrect] = useState(false);

  // format a guess into an array of letter objects
  // e.g. [{ key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    console.log('formatting guesses', currentGuess);
    console.log('solution', solution);

    let solutionArray = solution.split('');
    console.log('solutionarray', solutionArray);

    let formattedGuess = currentGuess.split('').map((letter) => {
      return { key: letter, color: 'grey' };
    });
    console.log('formatted guess', formattedGuess);

    // find any green letters
    formattedGuess.forEach((letter, index) => {
      if (letter.key === solutionArray[index]) {
        letter.color = 'green';
        console.log(formattedGuess[index] === letter);
        solutionArray[index] = ' ';
      }
    });

    // find any yellow letters
    formattedGuess.forEach((letter, index) => {
      if (solutionArray.includes(letter.key) && letter.color !== 'green') {
        letter.color = 'yellow';
        console.log(formattedGuess[index] === letter);
        solutionArray[solutionArray.indexOf(letter.key)] = ' ';
      }
    });

    return formattedGuess;
  };

  // add a new guess to the guesses state
  //  update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess: any) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => prevTurn + 1);
    setCurrentGuess('');
  };

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handlekeyup = ({ key }: { key: any }) => {
    console.log(key);

    if (key === 'Enter') {
      // only add guess if turn is less than 5
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
    }

    if (key === 'Backspace') {
      setCurrentGuess(currentGuess.slice(0, -1));
      return;
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, handlekeyup };
};

export default useWordle;
