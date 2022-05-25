import React, { useEffect } from 'react';
import useWordle from '../hooks/useWordle';
import Grid from './Grid';
import Keypad from './Keypad';

interface WordleProps {
  solution: string;
}

const Wordle = ({ solution }: WordleProps) => {
  const { currentGuess, handlekeyup, guesses, isCorrect, turn, usedKeys } =
    useWordle(solution);

  useEffect(() => {
    window.addEventListener('keyup', handlekeyup);

    if (isCorrect) {
      console.log('congrats you win!');
      window.removeEventListener('keyup', handlekeyup);
    }

    if (turn > 5) {
      console.log('you lose!');
      window.removeEventListener('keyup', handlekeyup);
    }

    return () => {
      window.removeEventListener('keyup', handlekeyup);
    };
  }, [handlekeyup, isCorrect]);

  useEffect(() => {
    console.log(guesses, turn, isCorrect);
  }, [guesses, turn, isCorrect]);

  return (
    <>
      <div>solution - {solution}</div>
      <div>Current guess - {currentGuess}</div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} />
    </>
  );
};

export default Wordle;
