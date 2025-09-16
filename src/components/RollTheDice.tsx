import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Dice } from './icons';
import { rollTheDice } from '../services/SequencerService.ts';
import { selectDice, selectDiceVisibility, selectIsRollTheDiceAvailable } from '../store/diceSlice.ts';
import { selectPlayerTurn } from '../store/gameSlice.ts';
import './RollTheDice.css';

export default function RollTheDice(): React.ReactElement {
    const isRollTheDiceAvailable = useSelector(selectIsRollTheDiceAvailable);
    const playerTurn = useSelector(selectPlayerTurn);
    const dice = useSelector(selectDice);
    const isDiceVisible = useSelector(selectDiceVisibility);

    const [diceDisplayed, setDiceDisplayed] = useState<number>(1);
    const diceAnimationID = useRef<ReturnType<typeof setTimeout>>(null);

    function showDice() {
        const diceDiv = document.getElementById('dice')!;
        diceDiv.style.left = '53%';
        diceDiv.style.bottom = '48%';

        const shuffleIntervalId = setInterval(() => {
            const min = 1;
            const max = 6;
            const randomChoice = Math.floor(Math.random() * (max - min + 1)) + min;
            setDiceDisplayed(randomChoice);
        }, 60);
        setTimeout(() => {
            clearInterval(shuffleIntervalId);
            setDiceDisplayed(dice);
        }, 500);

        diceAnimationID.current = setTimeout(() => {
            diceDiv.style.left = '75%';
            diceDiv.style.bottom = '1rem';
            diceAnimationID.current = null;
        }, 1400);
    }

    function hideDice() {
        const diceDiv = document.getElementById('dice')!;
        diceDiv.style.left = '30%';
        diceDiv.style.bottom = '-8rem';
    }

    useEffect(() => {
        if (isDiceVisible) {
            showDice();
        } else {
            hideDice();
        }

        return () => {
            if (diceAnimationID.current) {
                clearTimeout(diceAnimationID.current);
                diceAnimationID.current = null;
            }
        };
    }, [isDiceVisible]);

    return (
        <>
            {!!playerTurn && (
                <div
                    className={`roll-the-dice ${isRollTheDiceAvailable ? '' : 'disabled-roll'}`}
                    onClick={isRollTheDiceAvailable ? rollTheDice : undefined}
                    style={{ backgroundColor: `var(--${playerTurn.color})` }}
                >
                    <Dice size={50} />
                </div>
            )}

            <div className="dice" id="dice">
                <svg className="svg-dice" viewBox="0 0 50 50" fill="none">
                    <g fill="#000000">
                        {(diceDisplayed === 2 ||
                            diceDisplayed === 3 ||
                            diceDisplayed === 4 ||
                            diceDisplayed === 5 ||
                            diceDisplayed === 6) && <circle cx="10" cy="10" r="6" />}
                        {(diceDisplayed === 4 || diceDisplayed === 5 || diceDisplayed === 6) && (
                            <circle cx="40" cy="10" r="6" />
                        )}
                        {diceDisplayed === 6 && <circle cx="10" cy="25" r="6" />}
                        {(diceDisplayed === 1 || diceDisplayed === 3 || diceDisplayed === 5) && (
                            <circle cx="25" cy="25" r="6" />
                        )}
                        {diceDisplayed === 6 && <circle cx="40" cy="25" r="6" />}
                        {(diceDisplayed === 4 || diceDisplayed === 5 || diceDisplayed === 6) && (
                            <circle cx="10" cy="40" r="6" />
                        )}
                        {diceDisplayed > 1 && <circle cx="40" cy="40" r="6" />}
                    </g>
                </svg>
            </div>
        </>
    );
}
