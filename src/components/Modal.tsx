import React from 'react';

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
}: ModalProps) => {
  const handleClose = () => {
    setShowModal(false);
    setIsCorrect(false);
    // setCurrentGuess('');
    // setHistory([]);
    setGuesses([...Array(6)]);
    // clearInterval(currentTimer);
    // window.clearInterval(currentTimer);
    setTurn(0);

    fetch('https://anjola-adeuyi.github.io/wordle-api/solutions.json')
      .then((res) => res.json())
      .then((json) => {
        // random int btw 0 & 14
        const randomSolution = json[Math.floor(Math.random() * json.length)];
        setSolution(randomSolution.word);
      });

    console.log('cleared interval');
  };

  return (
    <div className='modal'>
      <button className='closeModal' onClick={handleClose}>
        Play again
      </button>
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
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>Nevermind!</h1>
          <p>
            The answer is <span className='solution'> {solution}</span>
          </p>
          <p>Better luck next time 🥹 </p>
        </div>
      )}
    </div>
  );
};

export default Modal;
