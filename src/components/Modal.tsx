import React from 'react';

interface ModalProps {
  isCorrect: boolean;
  turn: number;
  solution: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ isCorrect, turn, solution, setShowModal }: ModalProps) => {
  return (
    <div className='modal'>
      <button
        className='closeModal'
        onClick={() => {
          setShowModal(false);
        }}
      >
        X
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
