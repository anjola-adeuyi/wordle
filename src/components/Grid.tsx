import React from 'react';
import Row from './Row';

interface GridProps {
  currentGuess: string;
  guesses: any[];
  turn: number;
}

const Grid = ({ currentGuess, guesses, turn }: GridProps) => {
  return (
    <div>
      {guesses.map((guess, index) => {
        if (index === turn) {
          return <Row key={index} currentGuess={currentGuess} />;
        }
        return <Row key={index} guess={guess} />;
      })}
    </div>
  );
};

export default Grid;
