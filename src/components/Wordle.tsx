import React, { useEffect } from 'react';
import useWordle from '../hooks/useWordle';

interface WordleProps {
  solution: string;
}

const Wordle = ({ solution }: WordleProps) => {
  const { currentGuess, handlekeyup, guesses, isCorrect, turn } =
    useWordle(solution);

  useEffect(() => {
    window.addEventListener('keyup', handlekeyup);

    return () => {
      window.removeEventListener('keyup', handlekeyup);
    };
  }, [handlekeyup]);

  useEffect(() => {
    console.log(guesses, turn, isCorrect);
  }, [guesses, turn, isCorrect]);

  return (
    <>
      <div>solution - {solution}</div>
      <div>Current guess - {currentGuess}</div>
    </>
  );
};

export default Wordle;
