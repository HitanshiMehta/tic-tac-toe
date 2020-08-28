import React from 'react';

const Timer = (props) => {
    const style = props.count === 0 ? 'next-player timer' : 'current-player timer'
    return (
        <div className="wrapper">
            <button className={style}>{props.count}</button>
            <p>Timer</p>
        </div>
    );
}

export default Timer;