import React, {useEffect} from "react";
import './messages&quotes.css'

const quotes = [
    "Don't disregard moves that don't lead to direct wins, they might lead to opportunity when the grid changes!",
    "We do not condone experiments on cats!",
    "This game has chance, but strategy can put the chances on your side, or not ...",
    "The initial thought experiment about Schrödinger's cat was a joke. I wished it stayed like that...",
    "The original Heisenberg had nothing to do with Breaking Bad...",
    "Meow!",
    "To be or not to be?"
];

export default function Quote({ winner }) {
    const [isVisible, setIsVisible] = React.useState(true);

    const randomQuote = Math.floor(Math.random() * quotes.length);

    useEffect(() => {
        setIsVisible(true);
    }, [winner]);

    return (
        <div>
            {isVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>{`IT ${winner === 1 ? "LIVES" : "DIED"}!`}</h3>
                        <p id="modal-text">{quotes[randomQuote]}</p>
                        <button className="button" onClick={() => {
                            setIsVisible(false);
                        }}>Exit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
