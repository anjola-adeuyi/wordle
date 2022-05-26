import React from 'react';
import { TLetter } from './Keypad';

interface ModalProps {
  isCorrect: boolean;
  setIsCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  turn: number;
  setTurn: React.Dispatch<React.SetStateAction<number>>;
  solution: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setHistory: React.Dispatch<React.SetStateAction<string[]>>;
  setCurrentGuess: React.Dispatch<React.SetStateAction<string>>;
  setGuesses: React.Dispatch<React.SetStateAction<any[]>>;
  currentTimer: NodeJS.Timeout | NodeJS.Timer | undefined;
  setSolution: React.Dispatch<React.SetStateAction<string | null>>;
  setLetters: React.Dispatch<React.SetStateAction<TLetter[]>>;
  usedKeys: Record<any, string>;
  setUsedKeys: React.Dispatch<React.SetStateAction<Record<any, string>>>;
}

const Modal = ({
  isCorrect,
  setIsCorrect,
  turn,
  setTurn,
  solution,
  setShowModal,
  setHistory,
  setCurrentGuess,
  setGuesses,
  currentTimer,
  setSolution,
  setLetters,
  usedKeys,
  setUsedKeys,
}: ModalProps) => {
  const handleClose = () => {
    setShowModal(false);
    setIsCorrect(false);
    setGuesses([...Array(6)]);
    setTurn(0);

    fetch('https://anjola-adeuyi.github.io/wordle-api/solutions.json')
      .then((res) => res.json())
      .then((json) => {
        // random int btw 0 & 14
        const randomSolution = json[Math.floor(Math.random() * json.length)];
        setSolution(randomSolution.word);
        console.log('modal solution called now');
      });

    setUsedKeys({});

    console.log('cleared interval');
  };

  return (
    <div className='modal'>
      {isCorrect && (
        <div>
          <h1>You win!</h1>
          <p>
            The answer is <span className='solution'> {solution}</span>
          </p>
          <p>
            You found the solution in {turn} {turn <= 1 ? 'guess' : 'guesses'}{' '}
            😀
          </p>
          <div className='closeModal' onClick={handleClose}>
            NEXT
          </div>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>Nevermind!</h1>
          <p>
            The answer is <span className='solution'> {solution}</span>
          </p>
          <p>Better luck next time 🥹 </p>
          <div className='closeModal fail' onClick={handleClose}>
            TRY AGAIN
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
