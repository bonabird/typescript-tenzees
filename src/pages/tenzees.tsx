import { useState, useEffect } from 'react';
import Confetti from 'react-confetti'
import Die from '../components/die';
import { nanoid } from 'nanoid'
import '../styles/styleten.css';

export default function Tenzees() {
    // Initialses the state of the dice and handles any change
    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    // Checks what the value is of the first dice and then if each following dice has the same score
    // This is to see if the user wins or not
    useEffect(() => {   
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            console.log("You Won!")
        }
    }, [dice])
    // Generates a new die
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 3),
            isHeld: false,
            id: nanoid()
        }
    }
    // Generates new Dice
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie());
        }
        return newDice
    }
    // Handles the changing of the dice values
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
        }
    }
    // Handles when user clicks on dice
    function holdDice(id: string) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        }))
    }
    // Creates elements to display dice
    const diceElements = dice.map(die => (
        <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
    ))

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same.
                Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button
                className="roll-dice"
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}