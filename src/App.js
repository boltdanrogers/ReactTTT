import { useState } from "react";

function Square({ value }) {
  const [newValue, setValue] = useState(value);
  function handleClick() {
    setValue(newValue + 1);
    console.log(`clicked on ` + newValue);
  } //end of function handleClick

  return (
    <button className="square" onClick={handleClick}>
      {newValue}
    </button>
  );
}

export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square value={1} />
        <Square value={2} />
        <Square value={3} />
      </div>

      <div className="board-row">
        <Square value={4} />
        <Square value={5} />
        <Square value={6} />
      </div>

      <div className="board-row">
        <Square value={7} />
        <Square value={8} />
        <Square value={9} z />
      </div>
    </>
  );
}
