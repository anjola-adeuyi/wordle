import React, { useEffect } from 'react';
import useWordle from '../hooks/useWordle';

interface WordleProps {
  solution: string;
}

const Wordle = ({ solution }: WordleProps) => {
  const { currentGuess, handlekeyup } = useWordle(solution);

  useEffect(() => {
    window.addEventListener('keyup', handlekeyup);

    return () => {
      window.removeEventListener('keyup', handlekeyup);
    };
  }, [handlekeyup]);

  return <div>Wordle</div>;
};

export default Wordle;
