import { useState, useEffect } from 'react';
import './tictactoe.css';
import Message from "./Message.jsx";
import Quote from "./Quote.jsx";

export default function TicTacToe({ isMachine }) {
    const [grid, setGrid] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [isXNext, setIsXNext] = useState(false);
    const [winner, setWinner] = useState(null);
    const [winningIndices, setWinningIndices] = useState([]);

    const handleClick = (index) => {

        if (grid[index] !== 0 || winner || (isMachine && isXNext)) return;

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

    const handleComputer = (index) => {

        if (grid[index] !== 0 || winner || (!isMachine && !isXNext)) return;

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
                if (grid[a] === 1 || grid[b] === 1 || grid[c] === 1) {
                    return { winner: 1, indices: combination };
                }

                if (grid[a] === 2 || grid[b] === 2 || grid[c] === 2) {
                    return { winner: 2, indices: combination };
                }
            }
        }
        return null;
    };

    useEffect(() => {
        if (winner || grid.every(element => element === 0)) return; // Exit early if there's a winner or if it is starting

        const randomEffect = () => {
            const index = Math.floor(Math.random() * grid.length);
            const change = getRandomChange();

            function getRandomChange() {
                if (grid.filter(entry => entry === 0).length <= 3) return 1; // Force change if all, but 3 entries are non-zero

                const possibleChanges = [0, 1, 2];
                const weights = [4, 4, 2]; // Chances!!!
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

        const [index, newEffect] = randomEffect();
            if (newEffect === 1) {
                const toggleGridValue = (index) => {
                    setGrid(prevGrid => {
                        const newGrid = [...prevGrid];
                        newGrid[index] = prevGrid[index] === 0 ? 4 : 0;

                        // Check if the grid is full and no winner exists
                        const isGridFull = newGrid.every(element => element !== 0);
                        if (winner === null && isGridFull) {
                            // Re-run the logic on the same index to avoid draws
                            newGrid[index] = newGrid[index] === 0 ? 4 : 0; // Toggle again
                        }

                        return newGrid;
                    });
                };

                toggleGridValue(index);

            } else if (newEffect === 2) {
                setGrid(prevGrid => {
                    const newGrid = [...prevGrid];
                    newGrid[index] = 3; // Toggle between 0 and 4
                    return newGrid;
                });
            }

    }, [isXNext, winner]);

    const gridElements = grid.map((element, index) => (
        <GridElement
            key={index}
            element={element}
            index={index}
            onClick={() => handleClick(index)}
            isWinning={winningIndices.includes(index)}
            winner={winner}
        />
    ));

    const resetGame = () => {
        setGrid([0, 0, 0, 0, 0, 0, 0, 0, 0]);
        setWinner(null);
        setIsXNext(false); // Start with Player X
        setWinningIndices([]);
    };

    useEffect(() => {
        // If it's the computer's turn and the game is not over
        if (isXNext && isMachine && !winner) {
            const timeoutId = setTimeout(() => {
                // Find an empty cell for the computer to play
                const emptyCells = grid
                    .map((value, index) => value === 0 ? index : null)
                    .filter(index => index !== null);

                // If there are empty cells, let the computer play
                if (emptyCells.length > 0) {
                    const index = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                    handleComputer(index); // The computer makes a move
                }
            }, 1000); // Delay for the computer to make its move (e.g., 1 second)

            return () => clearTimeout(timeoutId);
        }
    }, [isXNext, isMachine, winner, grid]);

    useEffect(() => {
        resetGame();
    }, [isMachine]);

    return (
        <div>
            <Quote winner={winner} />
            <div className="game-container">
                {winner && <div className="winner-message">{`IT IS ${winner === 1 ? 'ALIVE' : 'DEAD'}!`}</div>}
                {!winner && <div className="turn-message">
                    {`IS IT ${isXNext ? 'DEAD' : 'ALIVE'}?`}
                </div>}
                <div className="grid-container">
                    {gridElements}
                </div>
                <button className="reset-button" onClick={resetGame}>Reset Game</button>
            </div>
        </div>
    );
}

function GridElement({ element, onClick, isWinning, winner }) {
    let elementClass = '';

    // Determine the class based on the element value
    if (element === 1) elementClass = 'circle';
    else if (element === 2) elementClass = 'cross';
    else if (element === 3) elementClass = 'superposition'; // superposition is for "S"
    else if (element === 4) elementClass = 'blocked';

    return (
        <div
            className={`grid-element ${elementClass} 
                        ${isWinning && (winner === 1) ? 'winBall' : ''} 
                        ${isWinning && (winner === 2) ? 'winCross' : ''}`}
            onClick={onClick}
        >
            {element === 1 ? 'O' : element === 2 ? 'X' : ''}
        </div>
    );
}
