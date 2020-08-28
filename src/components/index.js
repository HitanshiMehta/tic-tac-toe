import React, { useState, useEffect } from 'react';
import { declareWinner } from './win'
import Board from './board';
import Player from './player';
import Timer from './timer';

const Index = () => {
    // borad
    const [squares, setSquares] = useState([null, null, null, null, null, null, null, null, null])

    const [startGame, setStartGame] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [countMove, setCountMove] = useState(0)

    const [player1, setPlayer1] = useState('')
    const [player2, setPlayer2] = useState('')
    const [nextPlayer, setNextPlayer] = useState('X')

    const [isPlayed, setIsPlayed] = useState(false)
    const [count, setCount] = useState(1);
    let winner = declareWinner(squares)

    // On start game click
    const handleStart = () => {
        if (window.confirm("Every player will have 5 second for single chance. If you will fail to play within 5 second opponent player will win. Let's start ? ")) {
            setStartGame(true)
        }
    }

    useEffect(() => {
        let id
        if (startGame && !gameOver && winner === null) {
            if (count === 6) {
                console.log(isPlayed)
                if (isPlayed === false) {
                    setGameOver(true)
                    const winner = nextPlayer === 'X' ? player2 : player1
                    alert(`You didn't play within 5 second. Player ${winner} win.`)
                }
                //  Give chance to second player
                setCount(0)
                setIsPlayed(false)
                nextPlayer === 'X' ? setNextPlayer('O') : setNextPlayer('X')
            } else {
                id = setInterval(() => {
                    setCount(count + 1);
                }, 1000);
                return () => clearInterval(id);
            }
        }
    }, [startGame, count, isPlayed]);

    const handleClick = (index) => {
        const spreadSquares = [...squares]
        if (spreadSquares[index] === null && winner === null && isPlayed === false && gameOver === false) {
            // update one move
            spreadSquares[index] = nextPlayer
            setSquares(spreadSquares)
            setCountMove(count => count + 1)
            setIsPlayed(true)
        }
    }

    // if entier board is full
    useEffect(() => {
        if (countMove === 9) {
            setGameOver(true)
        }
    }, [countMove])

    useEffect(() => {
        if (gameOver) {
            if (window.confirm("Hey! wanna start again?")) {
                setSquares([null, null, null, null, null, null, null, null, null])
            }
        }
    }, [gameOver])

    return (
        <div className="wrapper">
            <Player
                nextPlayer={nextPlayer}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                startGame={startGame}
                onStart={handleStart}
            />
            {startGame && (
                <>
                    <div className="board-wrapper">
                        {nextPlayer === 'X' ? <Timer count={count} /> : <Timer count={0} />}
                        <Board squares={squares} onClick={handleClick} />
                        {nextPlayer === 'O' ? <Timer count={count} /> : <Timer count={0} />}
                    </div>
                    <div className="info-wrapper">
                        {winner !== null ? winner === 'X' ? "Winner is  " + player1 : "Winner is  " + player2 : "Keep playing!"}
                    </div>
                </>
            )
            }
        </div>);
}

export default Index;
