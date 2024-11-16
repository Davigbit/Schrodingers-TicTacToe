import TicTacToe from './Components/TicTacToe'
import { useState } from "react";
import './Components/tictactoe.css';
import Message from "./Components/Message.jsx";

function App() {
    const [isMachine, setIsMachine] = useState(false);

    const toggleMode = () => {
        setIsMachine(!isMachine);
    };

    return (
        <div className="app-container">
            <Message />
            <TicTacToe isMachine={isMachine} />

            {/* Button Container */}
            <div className="button-container">
                <button className="toggle-button" onClick={toggleMode}>
                    {isMachine ? "Switch to PVP Mode" : "Switch to PVC Mode"}
                </button>
            </div>
        </div>
    );
}

export default App;
