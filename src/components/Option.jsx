const Option = ({
  text,
  isSelected,
  isCorrect,
  isWrong,
  showResult,
  onClick,
}) => {
  const baseStyle =
    "p-4 rounded-lg shadow-sm mb-3 cursor-pointer transition-all hover:shadow-md border";

  let stateStyle = "bg-white text-gray-800 border-gray-300 hover:bg-gray-100";

  if (showResult) {
    if (isCorrect) {
      stateStyle = "bg-green-500 text-white border-green-500"; 
    } else if (isWrong) {
      stateStyle = "bg-red-500 text-white border-red-500";
    }
  } else if (isSelected) {
    stateStyle = "bg-blue-500 text-white border-blue-500"; 
  }

  return (
    <div onClick={onClick} className={`${baseStyle} ${stateStyle}`}>
      {text}
    </div>
  );
};

export default Option;
