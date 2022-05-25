import React from 'react';

interface RowProps {
  guess: { color: string; key: string }[];
}

const Row = ({ guess }: RowProps) => {
  if (guess) {
    return (
      <div className='row past'>
        {guess.map((letter, index) => (
          <div key={index} className={letter.color}>
            {letter.key}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='row'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Row;
