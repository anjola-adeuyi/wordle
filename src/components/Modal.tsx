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
          <p className='solution'>{solution}</p>
          <p>
            You found the solution in {turn} {turn <= 1 ? 'guess' : 'guesses'}{' '}
            😀
          </p>
        </div>
      )}
    </div>
  );
};

export default Modal;
