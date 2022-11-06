import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount, reset } from "./store/slices/counter";

function App() {

  const { counter } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const handleIncrement = () => dispatch(increment());
  const handleDecrement = () => dispatch(decrement());
  const handleIncrementByAmount = () => dispatch(incrementByAmount(5));
  const handleReset = () => dispatch(reset());

  return (
    <div className="app">
      <h1>Counter App</h1>
      <h2>Count: {counter}</h2>
      <div className="actions">
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
        <button onClick={handleIncrementByAmount}>Increment by 5</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}

export default App;