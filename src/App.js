import { useState } from "react";

//refactoring so that the state of the squares is handled by the board component

//add the value
function Square({ value, onSquareClick }) {
  //remove the state from these inner components now that board is keeping track
  // const [value, setValue] = useState(null);

  //take out the handleclick
  /* function handleClick() {
    setValue("X");
    console.log(`clicked`);
  } //end of function handleClick
*/
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  //add state to the board to hold the current value of the square components
  const [squares, setSquares] = useState(Array(9).fill(null));
  //and now we add a boolean state to keep track of who's turn it is
  const [xIsNext, setXIsNext] = useState(true);
  function handleClick(i) {
    //in order to only allow a click to modify an empty square, start with a conditional
    if (squares[i]) {
      return;
    }
    //make a copy of the squares array with the slice method
    const nextSquares = squares.slice();
    //confitional branching *wink*
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    } //end of if else its Xs turn

    //sets the first index of the array to X
    //nextSquares[i] = "X";

    //call the setSquares method to let react know that the state has changed and to re-render the component
    setSquares(nextSquares);

    //now switch from X to O and back
    setXIsNext(!xIsNext);
  } //end of function handleClick

  //we can't just have onSquareClick={handleClick(0), this will lead to an infinite loop because it is called right away
  //instead, we can define a function to be passed, but in this case we will use arrow functions to save time and space

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
