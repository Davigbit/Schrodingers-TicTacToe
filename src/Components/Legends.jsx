/* This React component generates a legend for the grid elements */

import './legends.css'
import superImage from '../assets/S.png'

export default function Legends() {
    return (
        <div className="l-container">
            <div className="legend-container">
                <div className="legend-item">
                    <div className="legend-icon circle">O</div>
                    <span>Alive</span>
                </div>
                <div className="legend-item">
                    <div className="legend-icon cross">X</div>
                    <span>Dead</span>
                </div>
                <div className="legend-item">
                    <div className="legend-icon b">🪨</div>
                    <span>Block</span>
                </div>
                <div className="legend-item">
                    <div className="legend-icon">
                        <img src={superImage} alt="Superposition" className="superposition-img"/>
                    </div>
                    <span>Superposition</span>
                </div>
            </div>
        </div>
    );
}