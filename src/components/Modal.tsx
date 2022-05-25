import React from 'react';

interface ModalProps {
  isCorrect: boolean;
  turn: number;
  solution: string;
}

const Modal = ({ isCorrect, turn, solution }: ModalProps) => {
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
