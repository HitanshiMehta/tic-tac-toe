import React from 'react';

const Board = ({ squares, onClick }) => {
    return (
        <div className="board">
            {
                squares.map((square, index) => {
                    const style = square ? `squares ${square}` : `squares`
                    return (< button key={index} onClick={() => { onClick(index) }} className={style}>{square}</button>)
                })
            }

        </div >
    );
}

export default Board;