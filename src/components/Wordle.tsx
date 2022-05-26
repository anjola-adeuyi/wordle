import React, { useEffect, useState } from 'react';
import useWordle from '../hooks/useWordle';
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';

interface WordleProps {
  solution: string;
}

const Wordle = ({ solution }: WordleProps) => {
  const {
    currentGuess,
    setCurrentGuess,
    handlekeyup,
    guesses,
    isCorrect,
    turn,
    usedKeys,
    history,
    formatGuess,
    addNewGuess,
  } = useWordle(solution);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener('keyup', handlekeyup);

    if (isCorrect) {
      console.log('congrats you win!');
      setTimeout(() => {
        setShowModal(true);
      }, 2000);
      window.removeEventListener('keyup', handlekeyup);
    }

    if (turn > 5) {
      console.log('you lose!');
      setTimeout(() => {
        setShowModal(true);
      }, 2000);
      window.removeEventListener('keyup', handlekeyup);
    }

    return () => {
      window.removeEventListener('keyup', handlekeyup);
    };
  }, [handlekeyup, isCorrect]);

  return (
    <>
      <div>solution - {solution}</div>
      <div>Current guess - {currentGuess}</div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad
        usedKeys={usedKeys}
        setCurrentGuess={setCurrentGuess}
        turn={turn}
        currentGuess={currentGuess}
        history={history}
        formatGuess={formatGuess}
        addNewGuess={addNewGuess}
      />
      {showModal && (
        <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
      )}
    </>
  );
};

export default Wordle;
