import { useState, useEffect } from 'react';
import './tictactoe.css';

export default function TicTacToe() {
    const [grid, setGrid] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);
    const [winningIndices, setWinningIndices] = useState([]);

    const handleClick = (index) => {

        if (grid[index] !== 0 || winner) return;

        const newGrid = [...grid];
        newGrid[index] = isXNext ? 2 : 1;
        setGrid(newGrid);
        setIsXNext(isXNext => !isXNext);

        const result = checkWinner(newGrid);
        if (result) {
            setWinner(result.winner);
            setWinningIndices(result.indices);
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
            if (
                (grid[a] !== 0 && grid[b] !== 0 && grid[c] !== 0) && // None are zero
                (grid[a] !== 4 && grid[b] !== 4 && grid[c] !== 4) && // None are 4
                ((grid[a] === grid[b] && grid[b] === grid[c]) || // All are equal (1 or 2)
                (grid[a] === grid[b] && grid[c] === 3) || // Two are equal and third is 3
                (grid[a] === grid[c] && grid[b] === 3) || // Two are equal and third is 3
                (grid[b] === grid[c] && grid[a] === 3) || // Two are equal, third is 3
                (grid[a] === 3 && grid[b] === 3 && (grid[c] === 1 || grid[c] === 2)) || // Two are 3, third is 1 or 2
                (grid[a] === 3 && grid[c] === 3 && (grid[b] === 1 || grid[b] === 2)) || // Two are 3, third is 1 or 2
                (grid[b] === 3 && grid[c] === 3 && (grid[a] === 1 || grid[a] === 2))) // Two are 3, third is 1 or 2
            )
            {
                return { winner: isXNext ? 2 : 1, indices: combination };
            }
        }
        return null;
    };

    useEffect(() => {
        if (winner) return; // Exit early if there's a winner

        const randomEffect = () => {
            const index = Math.floor(Math.random() * grid.length);
            const change = getRandomChange();

            function getRandomChange() {
                if (grid.filter(entry => entry === 0).length <= 2) return 1; // Force change if all, but 2 entries are non-zero

                const possibleChanges = [0, 1, 2];
                const weights = [6, 3, 1]; // Chances!!!
                const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
                const random = Math.floor(Math.random() * totalWeight);

                let cumulativeWeight = 0;
                for (let i = 0; i < possibleChanges.length; i++) {
                    cumulativeWeight += weights[i];
                    if (random < cumulativeWeight) {
                        return possibleChanges[i];
                    }
                }
                return 0;
            }

            return [index, change];
        };

        const timerId = setInterval(() => {
            const [index, newEffect] = randomEffect();
            if (newEffect === 1) {
                setGrid(prevGrid => {
                    const newGrid = [...prevGrid];
                    newGrid[index] = prevGrid[index] === 0 ? 4 : 0; // Toggle between 0 and 4
                    return newGrid;
                });
            } else if (newEffect === 2) {
                setGrid(prevGrid => {
                    const newGrid = [...prevGrid];
                    newGrid[index] = 3; // Toggle between 0 and 4
                    return newGrid;
                });
            }
        }, 500);

        return () => clearInterval(timerId);
    }, [grid, winner]);

    const gridElements = grid.map((element, index) => (
        <GridElement
            key={index}
            element={element}
            index={index}
            onClick={() => handleClick(index)}
            isWinning={winningIndices.includes(index)}
        />
    ));

    const resetGame = () => {
        setGrid([0, 0, 0, 0, 0, 0, 0, 0, 0]);
        setWinner(null);
        setIsXNext(true); // Start with Player X
        setWinningIndices([]);
    };

    return (
        <div className="game-container">
            {winner && <div className="winner-message">{`IT IS ${winner === 1 ? 'ALIVE' : 'DEAD'}!`}</div>}
            <div className="turn-message">
                {winner ? '' : `IS IT ${isXNext ? 'DEAD' : 'ALIVE'}?`}
            </div>
            <div className="grid-container">
                {gridElements}
            </div>
            <button className="reset-button" onClick={resetGame}>Reset Game</button>
        </div>
    );
}

function GridElement({ element, onClick, isWinning }) {
    return (
        <div
            className={`grid-element ${element === 1 ? 'circle' : element === 2 ? 'cross' :
                element === 3 ? 'superposition' : element === 4 ? 'blocked' : ''} 
                        ${isWinning ? 'winning' : ''}`}
            onClick={onClick}
        >
            {element === 1 ? 'O' : element === 2 ? 'X' : element === 3 ? 'S' : ''}
        </div>
    );
}
