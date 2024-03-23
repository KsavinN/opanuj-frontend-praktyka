import { useState } from 'react';
import { add, multiply, divide, subtract } from './functions';
import { ErrorMessage } from './components/ErrorMessage';
import { CalculatorButton } from './components/CalculatorButton';

const App = () => {
  const [numberLeft, setNumberLeft] = useState<number>(0);
  const [numberRight, setNumberRight] = useState<number>(0);
  const [result, setResult] = useState<number | string>(0);
  const [isError, setIsError] = useState<boolean>(false);

  const calculate = (
    func: (
      a: number,
      b: number
    ) => { error: false; result: number } | { error: true; result: string }
  ) => {
    const { error, result } = func(numberLeft, numberRight);
    if (error) {
      setResult(result);
      setIsError(true);
      return;
    }
    setResult(result);
    setIsError(false);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4">
        <input
          type="number"
          className="rounded-md shadow-md p-4"
          value={numberLeft}
          onChange={(e) => setNumberLeft(parseFloat(e.target.value))}
        />
        <input
          type="number"
          className="rounded-md shadow-md p-4"
          value={numberRight}
          onChange={(e) => setNumberRight(parseFloat(e.target.value))}
        />
      </div>
      <div className="grid grid-cols-4 gap-x-4 my-4">
        <CalculatorButton onClick={() => calculate(add)}>+</CalculatorButton>
        <CalculatorButton onClick={() => calculate(subtract)}>
          -
        </CalculatorButton>
        <CalculatorButton onClick={() => calculate(multiply)}>
          *
        </CalculatorButton>
        <CalculatorButton onClick={() => calculate(divide)}>/</CalculatorButton>
      </div>
      {isError ? (
        <ErrorMessage message={result as string} />
      ) : (
        <div>Result: {result}</div>
      )}
    </div>
  );
};

export default App;
