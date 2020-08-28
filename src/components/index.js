import React, { useState, useEffect, useContext } from 'react';
import { themeContext } from '../common/AppConfig'
import { declareWinner } from './win'
import Board from './board';
import Player from './player';
import Timer from './timer';
import { ThemeContext } from '../context/ThemeContext'

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

    // Context
    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;

    const { toggleTheme } = useContext(ThemeContext);

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

                // If user didn't play withing 5 second game is over.
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

    // Fill square
    const handleClick = (index) => {
        const spreadSquares = [...squares]
        if (spreadSquares[index] === null && winner === null && isPlayed === false && gameOver === false) {
            // update move
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

    // Reset game
    useEffect(() => {
        if (gameOver) {
            if (window.confirm("Hey! wanna start again?")) {
                setSquares([null, null, null, null, null, null, null, null, null])
            }
        }
    }, [gameOver])

    return (
        <div className="wrapper" style={{ background: theme.bg, color: theme.textColor }}>
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
            <button
                onClick={toggleTheme}
                style={theme.bg === themeContext.lightBg ?
                    { backgroundColor: themeContext.darkBg, color: themeContext.darkTextColor } :
                    { backgroundColor: themeContext.lightBg, color: themeContext.lightTextColor }}>
                {theme.ui === themeContext.lightUi ? "Dark Mode" : "Light Mode"}
            </button>
        </div>);
}

export default Index;
