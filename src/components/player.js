import React from 'react';

const Player = (props) => {
    const { setPlayer1, setPlayer2, onStart, startGame, nextPlayer } = props
    const currentPlayer = nextPlayer === 'X' ? `player-input current-player` : `player-input next-player`
    const nextplayer = nextPlayer === 'X' ? `player-input next-player` : `player-input current-player`
    return (
        <div className="player-wrapper">
            <input
                readOnly={startGame}
                className={currentPlayer}
                onChange={(e) => setPlayer1(e.target.value)} />
            <button
                className="player-button"
                onClick={onStart}>Start</button>
            <input
                readOnly={startGame}
                className={nextplayer}
                onChange={(e) => setPlayer2(e.target.value)} />
        </div>
    );
}

export default Player;