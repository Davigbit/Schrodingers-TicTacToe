import React, {Component} from "react";

const quotes = [
    "Bravo!",
    "Well played!",
    "You're a winner!"
];

export default function Quote({ winner }) {
    const [isVisible, setIsVisible] = React.useState(true);

    const randomQuote = Math.floor(Math.random() * quotes.length);

    return (
        <div>
            {winner !== null && isVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <p id="modal-text">{quotes[randomQuote]}</p>
                        <button className="button" onClick={() => {setIsVisible(false)}}>Next</button>
                    </div>
                </div>
            )}
        </div>
    );
}