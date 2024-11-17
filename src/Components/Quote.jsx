import React, {useEffect} from "react";
import './messages&quotes.css'

/* This function generates a random "congratulation" sentence to the winner player with some trivia. */

const quotes = [
    "We do not condone experiments on cats!",
    "This game has chance, but strategy can put the chances on your side, or not ...",
    "The initial thought experiment about Schrödinger's cat was a joke. I wished it stayed like that...",
    "The original Heisenberg had nothing to do with Breaking Bad...",
    "To live or not to live?"
];

export default function Quote({ winner }) {
    const [isVisible, setIsVisible] = React.useState(true);

    const randomQuote = Math.floor(Math.random() * quotes.length);

    /* This useEffect runs what its content every time the variable "winner" changes. */
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

                        {/* When pressed, the button will close the window */}
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
