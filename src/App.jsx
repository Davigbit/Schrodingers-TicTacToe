import TicTacToe from './Components/TicTacToe'
import { useState } from "react";
import './Components/tictactoe.css';
import Message from "./Components/Message.jsx";
import Legends from "./Components/Legends.jsx";
import catImage from "./assets/cat.gif"
import ghostImage from "./assets/ghost.gif"
import graveImage from "./assets/grave.gif"
import { initializePeer, initiateConnection, Recieve } from "./Components/Multiplayer.js"



let peer = null;


function App() {
    // 0: LOCAL, 1: COMPUTER, 2: MULTIPLAYER
    const [mode, setMode] = useState(0);

    /* winner is null if there is no winner, 1 if O won, and 2 if X won */
    const [winner, setWinner] = useState(null);

    const [conId, setConId] = useState(null);

    
    const [conn, setConn] = useState(null);
    
    const [isInitiator, setisInitiator] = useState(null);

    peer = initializePeer(peer);

    Recieve(peer, conn, setConn);


    

    /* Function that changes modes */
    const toggleMode = () => {
        setMode(prevMode => (prevMode + 1) % 3);
    };
   


    const image = winner === 1 ? catImage : winner === 2 ? graveImage : ghostImage;

    /* Builds these React components to the DOM as if it were a HTML file */
    return (
        <div className="App">

            {/* Aziz container */}

            {mode === 2 && <div className="button-container">
                <input placeholder="Opponent ID"
                       onChange={e => setConId(e.target.value)}/>
                <button onClick={() => {
                    setConn(initiateConnection(conId, conn, peer));
                    setisInitiator(true);
                } }>
                    Connect
                </button>
                <button onClick={() => console.log(setisInitiator)}>
                    Disconnect
                </button>
            </div>}

            {/* App-container with TicTacToe and Message */}
            <div className="app-container">
                {/* Initial messages */}
                <Message/>

                {/* Main TicTacToe grid */}
                <TicTacToe mode={mode} winner={winner} setWinner={setWinner} peer={peer} conn={conn}/>

                {/* Button container */}
                <div className="button-container">
                    <button className="toggle-button" onClick={toggleMode}>
                        {(mode === 0) ? "Switch to PVC Mode" : (mode === 1) ?
                            "Switch to online PVP Mode" : "Switch to local PVP Mode"}
                    </button>
                </div>
            </div>

            {/* Legends component */}
            <div className="legends-container">
                <div className="legend">
                    <Legends/>
                </div>

                <img className="image" alt="Cat" src={image}/>

            </div>
        </div>
    );
}

export default App;
