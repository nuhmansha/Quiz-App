import React from 'react';

const QuestionNumber = ({ number, isActive, onClick }) => {
  const baseStyle =
    'w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-sm font-semibold transition-all';

  const activeStyle = isActive
    ? 'bg-blue-500 text-white shadow-lg'
    : 'bg-gray-200 text-gray-800 hover:bg-gray-300';

  return (
    <div onClick={onClick} className={`${baseStyle} ${activeStyle}`}>
      {number}
    </div>
  );
};

export default QuestionNumber;
