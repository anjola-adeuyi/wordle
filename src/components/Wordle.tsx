import React, { useEffect, useRef, useState } from 'react';
import useWordle from '../hooks/useWordle';
import Grid from './Grid';
import Keypad, { TLetter } from './Keypad';
import Modal from './Modal';

interface WordleProps {
  solution: string;
  setSolution: React.Dispatch<React.SetStateAction<string | null>>;
  letters: TLetter[];
  setLetters: React.Dispatch<React.SetStateAction<TLetter[]>>;
}

const DELAY = 2000;

const Wordle = ({
  solution,
  setSolution,
  letters,
  setLetters,
}: WordleProps) => {
  const {
    currentGuess,
    setCurrentGuess,
    handlekeyup,
    guesses,
    setGuesses,
    isCorrect,
    setIsCorrect,
    turn,
    setTurn,
    usedKeys,
    setUsedKeys,
    history,
    setHistory,
    formatGuess,
    addNewGuess,
  } = useWordle(solution);
  const [showModal, setShowModal] = useState(false);
  const [loop, setLoop] = useState<NodeJS.Timer>();
  const timer = useRef<NodeJS.Timer | NodeJS.Timeout>();

  useEffect(() => {
    window.addEventListener('keyup', handlekeyup);

    // if (isCorrect) {
    //   console.log('congrats you win!');
    //   const interval = setTimeout(() => {
    //     setShowModal(true);
    //   }, 2000);
    //   // clearInterval(interval);
    //   window.removeEventListener('keyup', handlekeyup);
    // }

    if (isCorrect) {
      // const intervalID = setInterval(() => {
      //   setShowModal(true);
      // }, 2000);

      // setLoop(intervalID);

      timer.current = setInterval(() => {
        setShowModal(true);
      }, DELAY);

      window.removeEventListener('keyup', handlekeyup);
    }

    if (turn > 5) {
      console.log('you lose!');
      setTimeout(() => {
        setShowModal(true);
      }, DELAY);
      window.removeEventListener('keyup', handlekeyup);
    }

    return () => {
      window.removeEventListener('keyup', handlekeyup);
      clearInterval(timer.current);
      window.clearInterval(timer.current);
      console.log('clenup called');
      // clearInterval(loop);
    };
  }, [handlekeyup, isCorrect]);

  return (
    <>
      <div>solution - {solution}</div>
      <div>Current guess - {currentGuess}</div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad
        letters={letters}
        usedKeys={usedKeys}
        setCurrentGuess={setCurrentGuess}
        turn={turn}
        currentGuess={currentGuess}
        history={history}
        formatGuess={formatGuess}
        addNewGuess={addNewGuess}
      />
      {showModal && (
        <Modal
          isCorrect={isCorrect}
          setIsCorrect={setIsCorrect}
          turn={turn}
          setTurn={setTurn}
          solution={solution}
          setShowModal={setShowModal}
          setHistory={setHistory}
          setCurrentGuess={setCurrentGuess}
          setGuesses={setGuesses}
          currentTimer={timer.current}
          setSolution={setSolution}
          setLetters={setLetters}
          usedKeys={usedKeys}
          setUsedKeys={setUsedKeys}
        />
      )}
      {console.log(showModal)}
      {console.log(currentGuess)}
      {console.log(guesses)}
    </>
  );
};

export default Wordle;
