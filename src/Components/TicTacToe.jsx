import { useState, useEffect } from 'react';
import './tictactoe.css';
import Quote from "./Quote.jsx";
import sound0 from '../assets/f.mp3'
import sound1 from '../assets/s.mp3'
import sound2 from '../assets/x.mp3'




export default function TicTacToe({ mode, winner, setWinner, peer, 
    conn, isInitiator, setisInitiator, OtherGrid}) {

    /* Tic Tac Toe grid with its values following the following:
    0: Empty; 1: O; 2: X; 3: Superposition; 4: Block */
    const [grid, setGrid] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

    /* A boolean that determines whether or not its the players turn */ 
    const [isTurn, setIsTurn] = useState(true);

    /* winningIndices is an array that stores the 3 indexes that are responsible
    * for the winning position */
    const [winningIndices, setWinningIndices] = useState([]);
   
    const[oldGrid, setOldGrid] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
 
    const [isMultiplayerBeginning, setisMultiplayerBeginning] = useState([true])
    
    if (isInitiator && isMultiplayerBeginning)  {
        console.log('lol');
        setisMultiplayerBeginning(false);
    } else if ((isInitiator === false) && isMultiplayerBeginning) {
        console.log('lmao');
        isInitiator= null;
        setIsTurn(false);
        setisMultiplayerBeginning(false);
    }

    if (conn) {
        conn.on('data', function(data) {
            console.log('recieved data');
            setGrid(data);
            setIsTurn(true);
        });

    }

    /* Puts player's piece on square and check for winner*/
    const handleClick = (index) => {

        if (grid[index] !== 0 || winner || ((mode === 1 || mode === 2) && !isTurn)) return;
        const meows = [sound0, sound1, sound2];
        const audio = new Audio(meows[Math.floor(Math.random() * meows.length)]);
        audio.play()
        const newGrid = [...grid];
        newGrid[index] = ((isTurn) && (isInitiator)) ? 1 : (isTurn && (mode === 1)) ? 1 : 2;
        setGrid(newGrid);
        setIsTurn(isTurn => !isTurn);

        const result = checkWinner(newGrid);
        if (result) {
            setWinner(result.winner);
            setWinningIndices(result.indices);
        }
    };

    /* Puts computer's piece on square and check for winner*/
    const handleComputer = (index) => {

        if (grid[index] !== 0 || winner || (!(mode === 1) && isTurn)) return;

            const newGrid = [...grid];
            newGrid[index] = !isTurn ? 2 : 1;
            setGrid(newGrid);
            setIsTurn(isTurn => !isTurn);

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
                (grid[a] !== 0 && grid[b] !== 0 && grid[c] !== 0) && // None are 0
                (grid[a] !== 4 && grid[b] !== 4 && grid[c] !== 4) && // None are 4
                (grid[a] !== 3 && grid[b] !== 3 && grid[c] !== 3) && // None are 3
                (grid[a] === grid[b] && grid[a] === grid[c]) // All 3 are equal
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

    /* Does a random effect on a random square */
    useEffect(() => {
        if ((winner || grid.every(element => element === 0)) || (isTurn && mode === 2)) return; 
                                                                    // Exit early if there's a winner or if it is 
                                                                   // or if it is the player's turn
        /* If there is a superposition in the grid, make it decay to either O or X */
        function observe() { return Math.ceil(Math.random() * 2); }
        const newGrid = grid.map(element => element === 3 ? element - observe() : element);
        if (newGrid !== grid) setGrid(newGrid);

        /* Selects a random change to the grid and the index the change is happening */
        const randomEffect = () => {
            const index = Math.floor(Math.random() * grid.length);
            const change = getRandomChange();

            function getRandomChange() {
                if (grid.filter(entry => entry === 0).length <= 3) return 1;
                // Force change "1" if all, but 3 entries are non-zero (So no draw happens)

                const possibleChanges = [0, 1, 2]; // 0: Nothing; 1: Either erase or make a block; 2: Add superposition
                const weights = [3, 4, 3]; // Chances
                const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
                const random = Math.floor(Math.random() * totalWeight);

                // Calculates which state it will choose
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
                        // If the index is empty, add a block. If it has something, make it empty
                        newGrid[index] = prevGrid[index] === 0 ? 4 : 0;

                        // Check if the grid is full and no winner exists
                        const isGridFull = newGrid.every(element => element !== 0);
                        if (winner === null && isGridFull) {
                            // Re-run the logic on the same index to avoid draws
                            newGrid[index] = newGrid[index] === 0 ? 4 : 0;
                        }

                        return newGrid;
                    });
                };

                toggleGridValue(index);

            } else if (newEffect === 2) {
                setGrid(prevGrid => {
                    const newGrid = [...prevGrid];
                    newGrid[index] = 3; // Add a superposition at the selected index
                    return newGrid;
                });
            }
        

    }, [isTurn, winner]);

    // Transforms the grid array into an array of React components.
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

    // Reset all React states (it is called by the reset button)
    const resetGame = () => {
        setGrid([0, 0, 0, 0, 0, 0, 0, 0, 0]);
        setWinner(null);
        setIsTurn(true); // Start with Player X
        setWinningIndices([]);
    };

    // If playing with a machine, waits one second and decide upon the machine's movement
    useEffect(() => {
        // If it's the computer's turn and the game is not over
        
        if (!isTurn && (mode === 1) && !winner) {
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

        if ((JSON.stringify(oldGrid) !== JSON.stringify(grid)) && mode === 2 && conn && !isTurn) {
            setOldGrid(grid);
            conn.send(grid);
        }

        
    }, [isTurn, mode, winner, grid]);

    // If the player's adversary changes, reset game
    useEffect(() => {
        resetGame();
    }, [mode]);

    

    return (
        <div>
            {/* If there is a winner, display a Quote component */}
            {winner !== null && <Quote winner={winner} />}
            <div className="game-container">
                {/* Displays winner's message */}
                {winner && <div className="winner-message">{`THE CAT IS ${winner === 1 ? 'ALIVE' : 'DEAD'}!`}</div>}
                {/* Displays turn's message */}
                {!winner && <div className="turn-message">
                    {`IS IT ${!isTurn ? 'DEAD? (X)' : 'ALIVE? (O)'}`}
                </div>}
                <div className="grid-container">
                    {gridElements}
                </div>
                <button className="reset-button" onClick={resetGame}>Reset Game</button>
            </div>
        </div>
    );
}

// Helper React component that aids with styling in "tictactoe.css"
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