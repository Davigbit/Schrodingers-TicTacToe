import { useState } from 'react';
import './tictactoe.css';

export default function TicTacToe() {
    const [grid, setGrid] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);

    const handleClick = (index) => {

        if (grid[index] !== 0 || winner) return;

        const newGrid = [...grid];
        newGrid[index] = isXNext ? 2 : 1;
        setGrid(newGrid);
        setIsXNext(isXNext => !isXNext);

        const newWinner = checkWinner(newGrid);
        if (newWinner) {
            setWinner(newWinner);
        }
    };

    const checkWinner = (grid) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (grid[a] !== 0 && grid[a] === grid[b] && grid[a] === grid[c]) {
                return grid[a]; // Either 1 or 2
            }
        }
        return null;
    };

    const gridElements = grid.map((element, index) => (
        <GridElement
            key={index}
            element={element}
            index={index}
            onClick={() => handleClick(index)}
        />
    ));

    const resetGame = () => {
        setGrid([0, 0, 0, 0, 0, 0, 0, 0, 0]);
        setWinner(null);
        setIsXNext(true); // Start with Player X
    };

    return (
        <div className="game-container">
            {winner && <div className="winner-message">{winner === 1 ? 'O Wins!' : 'X Wins!'}</div>}
            {!winner && grid.every(cell => cell !== 0) && (
                <div className="winner-message">It's a Draw!</div>
            )}
            <div className="turn-message">
                {winner ? '' : `Player ${isXNext ? 'X' : 'O'}'s Turn`}
            </div>
            <div className="grid-container">
                {gridElements}
            </div>
            <button className="reset-button" onClick={resetGame}>Reset Game</button>
        </div>
    );
}

function GridElement({element, onClick}) {
    return (
        <div
            className={`grid-element ${element === 1 ? 'circle' : element === 2 ? 'cross' : ''}`}
            onClick={onClick}
        >
            {element === 1 ? 'O' : element === 2 ? 'X' : element === 3 ? 'S' : element === 4 ? 'B' : ''}
        </div>
    );
}
