import { useState } from "react";

//refactoring so that the state of the squares is handled by the board component

//finally, implement time travel by creating an outer component to hold the board, with a new history
//array as well as listing the squares array state up from board into this new game component

//add the value
function Square({ value, onSquareClick }) {
  //remove the state from these inner components now that board is keeping track
  // const [value, setValue] = useState(null);

  //take out the handleClick
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

//changing board function to take the three props from the game component
function Board({ xIsNext, squares, onPlay }) {
  //add state to the board to hold the current value of the square components
  //take it out as the state is now up in
  //const [squares, setSquares] = useState(Array(9).fill(null));
  //and now we add a boolean state to keep track of who's turn it is
  //move this to game component
  //const [xIsNext, setXIsNext] = useState(true);
  function handleClick(i) {
    //in order to only allow a click to modify an empty square, start with a conditional based on the existence if the current cell
    //if the cell is anything but null, we do not want to let the rest of the handleClick function alter the square that was clicked
    //also we check to see if the game has been won
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    //make a copy of the squares array with the slice method
    const nextSquares = squares.slice();
    //conditional branching *wink*
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    } //end of if else its Xs turn

    //replace the setSquares and setXIsNext calls with our imported onPlay

    onPlay(nextSquares);

    //call the setSquares method to let react know that the state has changed and to re-render the component
    //setSquares(nextSquares);

    //now switch from X to O and back
    //setXIsNext(!xIsNext);
  } //end of function handleClick

  //we can't just have onSquareClick={handleClick(0), this will lead to an infinite loop because it is called right away
  //instead, we can define a function to be passed, but in this case we will use arrow functions to save time and space
  //create a const winner to hold the return of calculating the winner
  const winner = calculateWinner(squares);
  //create the variable to hold status
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  } //end of if then else

  //add a a status section above the board to display the winner

  return (
    <>
      <div className="status">{status}</div>

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
} //end of Board

function calculateWinner(squares) {
  //an array of arrays, each with an array of winning lines
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  //now we test if the current state of squares matches any of the winning lines

  for (let i = 0; i < lines.length; i++) {
    //use destructuring to assign a b and c the three variables from the current inner array
    const [a, b, c] = lines[i];
    //now test to see if the current square completes the current winning line
    //test the existence of the first element, and then that the first and second and first and third all match
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      //return the winning character if the current winning line matches the state of the squares array
      return squares[a];
    } //end of if
  } //end of for i loop

  //if the for loop has not resulted in a match that returned the winning character, get here and return null

  return null;
} //end of calculate winner

//create our new top level component. notice it will be the default export
export default function game() {
  //need to have the state stored at this level, lifted up from square to board and now to game
  //state to track whose turn it is
  const [xIsNext, setXIsNext] = useState(true);
  //state to store the history of the board, as an array containing an array with nine nulls in it
  const [history, setHistory] = useState([Array(9).fill(null)]);

  //there is enough information to to calculate the current boards state
  const currentSquares = history[history.length - 1]; //this sets the current squares to be passed to the board for rendering as the latest array

  //we need a function to be called by the board component

  function handlePlay(nextSquares) {
    //this is the new location for the calls to change the state
    //use the spread operator to take everything in history, and add nextSquares
    setHistory([...history, nextSquares]);
    //flip who's turn it is
    setXIsNext(!xIsNext);
  } //end of handlePlay function

  //now pass our several states and functions into the board
  //the board will be controlled completely by the props it receives

  //our jsx return, with a board section followed by a game-info section
  //an ordered list
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{/*ToDo*/}</ol>
      </div>
    </div>
  ); //end of return
} //end of default export function game
