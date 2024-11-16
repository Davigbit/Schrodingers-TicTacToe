import React from "react";
import './messages&quotes.css'

const quotes = [
    "Don't disregard moves that don't lead to direct wins, they might lead to opportunity when the grid changes!",
    "We do not condone experiments on cats",
    "This game has chance, but strategy can put the chances on your side",
    "Careful! Quantum fluctuations may cause objects to block you from playing on a square",
    "No discouragement, no disappointment, if you fail try again",
    "Playing another game against your opponent takes chance out of the equation",
    "The initial thought experiment about Schrödinger's cat was a joke. Nowadays it's used as an example!",
    "The original Heisenberg had nothing to do with Breaking Bad...",
    "Meow"
];

export default function Quote({ winner }) {
    const [isVisible, setIsVisible] = React.useState(true);

    const randomQuote = Math.floor(Math.random() * quotes.length);

    return (
        <div>
            {winner !== null && isVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>{`IT ${winner === 1 ? "LIVES" : "DIED"}!`}</h3>
                        <p id="modal-text">{quotes[randomQuote]}</p>
                        <button className="button" onClick={() => {
                            setIsVisible(false)
                        }}>Exit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}