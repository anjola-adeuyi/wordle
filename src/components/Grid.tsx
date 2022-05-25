import React from 'react';
import Row from './Row';

interface GridProps {
  currentGuess: string;
  guesses: string[];
  turn: number;
}

const Grid = ({ currentGuess, guesses, turn }: GridProps) => {
  return (
    <div>
      {guesses.map((guess, index) => {
        return <Row key={index} />;
      })}
    </div>
  );
};

export default Grid;
