import {useState} from "react";
import Board from "./Board";
import {CalcWin} from "../CalcWin";

const styles={
    width:"200px",
    margin:"20px auto"
}

const Game=()=>{

    const [historySteps,setHistorySteps]=useState([Array(9).fill(null)]);
    const [step,setStep]=useState(0);
    const [xIsNext,setXisNext]=useState(true);
    const winner =CalcWin(historySteps[step]);

    const handleClick= i => {
        const timeInHistory=historySteps.slice(0,step+1);
        const current = timeInHistory[step];
        const squares=[...current];

        if (winner || squares[i]) return;

        squares[i] =xIsNext ? 'X' : '0';
        setHistorySteps([...timeInHistory,squares]);

        setStep(timeInHistory.length);
        setXisNext(!xIsNext);
    };

    const jumpTo=step =>{
        setStep(step);
        setXisNext(step % 2 === 0);
    }

    const renderMoves= () =>
        historySteps.map((_step,move)=>{
            const destination = move ? `Got to move #${move}` : 'Go to start';
            return(
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{destination}</button>
                </li>
            )
        });

    return(
        <>
            <Board squares={historySteps[step]} onClick={handleClick}/>
            <div style={styles}>
                {winner ? "Winner:" + winner : "Next Player: " + (xIsNext ? "X" : "O")}
                {renderMoves()}
            </div>
        </>
    )
}

export default Game;