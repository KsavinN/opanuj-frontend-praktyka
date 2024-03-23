type CalculatorButtonProps = {
  children: string;
  onClick: () => void;
};

export const CalculatorButton = ({
  children,
  onClick,
}: CalculatorButtonProps) => {
  return (
    <button
      className="bg-blue-200 px-2 py-4 text-lg hover:bg-blue-500 hover:text-white rounded-md"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
