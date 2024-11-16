import React, { useState } from 'react';
import './messages&quotes.css'

const messages = [
  "Welcome to Schrödinger's Tic Tac Toe!",
  "Every time a player plays, a random event may happen.",
  "A boulder may block a tile, a symbol could disappear, or a superposition might help you get a win (or not)!"
];

export default function Message() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const nextMessage = () => {
    setCurrentMessageIndex(prevIndex => {
      if (prevIndex < messages.length - 1) {
        return prevIndex + 1;
      } else {
        setIsVisible(false);
        return prevIndex; // Do not go beyond the last message
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
