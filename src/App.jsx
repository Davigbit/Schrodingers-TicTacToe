import TicTacToe from './Components/TicTacToe'
import { useState } from "react";
import './Components/tictactoe.css';
import Message from "./Components/Message.jsx";
import Legends from "./Components/Legends.jsx";
import catImage from "./assets/cat.gif"
import ghostImage from "./assets/ghost.gif"
import graveImage from "./assets/grave.gif"

function App() {

    /* If isMachine is true, player is playing against the computer, otherwise,
    it is playing with another player locally. */
    const [isMachine, setIsMachine] = useState(false);

    /* Function that inverts isMachine */
    const toggleMode = () => {
        setIsMachine(!isMachine);
    };

    /* Builds these React components to the DOM as if it were a HTML file */
    return (
        <div className="App">
            {/* App-container with TicTacToe and Message */}
            <div className="app-container">
                {/* Initial messages */}
                <Message />

                {/* Main TicTacToe grid */}
                <TicTacToe isMachine={isMachine} />

                {/* Button container */}
                <div className="button-container">
                    <button className="toggle-button" onClick={toggleMode}>
                        {isMachine ? "Switch to PVP Mode" : "Switch to PVC Mode"}
                    </button>
                </div>
            </div>

            {/* Legends component */}
            <div className="legends-container">
                <div className="legend">
                    <Legends />
                </div>

                <img className="image" alt="Cat" src={ghostImage} />

            </div>
        </div>
    );
}

export default App;
