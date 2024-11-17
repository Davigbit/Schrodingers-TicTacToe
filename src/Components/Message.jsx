import React, { useState } from 'react';
import './messages&quotes.css'

/* This function generates a couple of "welcoming" sentences to new players. */

const messages = [
    "Welcome to Schrödinger's Tic Tac Toe!",
    "Each player either represents O or X, and respectively fight to define whether the cat is alive or dead.",
    "How is it quantum? Every time a player plays, a random event may happen.",
    "A boulder may block a tile, something may disappear, and many more.",
    "In case a superposition appears, do not be afraid as you were in your Quantum midterms." +
    "They decay into whether X or O in no more than one round, so pay attention.",
    "You are ready now. Good luck!"
];

export default function Message() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  /* Function called by the button below that makes the displayed text change */
  const nextMessage = () => {
    setCurrentMessageIndex(prevIndex => {
      if (prevIndex < messages.length - 1) {
        return prevIndex + 1;
      } else {
        setIsVisible(false);
        return prevIndex;
      }
    });
  };

  return (
    <div>
      {isVisible && (
        <div className="modal">
          <div className="modal-content">
            <p id="modal-text">{messages[currentMessageIndex]}</p>
            <button className="button" onClick={nextMessage}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
