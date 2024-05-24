import React, {useEffect, useState} from 'react';
import './App.css'
import Block from './components/Block';

type State = (string | null);

function App() {
  const [state, setState] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState("X");
  const [winner, setWinner] = useState<string | null>(null);
  const checkWinner = (state: any[]) => {
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for(let i=0;i<win.length;i++)
      {
        const [a, b, c] = win[i];
        if(state[a]!==null && state[a] === state[b] && state[b] === state[c]) return state[a];
      }
      return null;
  }
  
  const checkDraw = (state: any[]):boolean => {
    return state.every(position => position!==null);
  }

  const handleClick = (index: number) => {
    const stateCopy = Array.from(state);  
    if(stateCopy[index]!==null || winner) return;
    stateCopy[index] = currentTurn;

    setCurrentTurn(currentTurn === 'X'? 'O': 'X'); 
    setState(stateCopy);
  }

  useEffect(() =>{
    const win = checkWinner(state)

  if(win){
    setWinner(win);
  } else if(checkDraw(state)){
    setWinner('Draw');
  }
  }, [state])
  
  const restart = () => {
    setState(Array(9).fill(null));
    setCurrentTurn('X');
    setWinner(null);
  }

  return <div className='board'>
    <h1>Tic Tac Toe</h1>
    <h2>{`Current Turn: ${currentTurn}`}</h2>
    <div className='row'>
      <Block onClick={() => handleClick(0)} value={state[0]}/>
      <Block onClick={() => handleClick(1)} value={state[1]}/>
      <Block onClick={() => handleClick(2)} value={state[2]}/>
    </div>
    <div className='row'>
      <Block onClick={() => handleClick(3)} value={state[3]}/>
      <Block onClick={() => handleClick(4)} value={state[4]}/>
      <Block onClick={() => handleClick(5)} value={state[5]}/>
    </div>
    <div className='row'>
      <Block onClick={() => handleClick(6)} value={state[6]}/>
      <Block onClick={() => handleClick(7)} value={state[7]}/>
      <Block onClick={() => handleClick(8)} value={state[8]}/>
    </div>
    {winner &&<h2>{winner == "Draw"? "Its a draw":`${winner} wins`}</h2>}
    <button onClick={restart}>Play Again</button>
  </div>
}

export default App;
