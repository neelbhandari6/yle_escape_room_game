// 1. keeps track of what user has answered in fake / real news puzzle && fires a function when everything is ready
// 2. keeps track if user has completed clock puzzle
// nb. choice is either true or false

import {wallSwitchState} from "../puzzles/wallSwitch"

export const userChoiceTracker = (() => { 
    const answers = {
        flatPuzzle2: false, 
        warehousePuzzle1: false, 
        bunkerPuzzle2: false, 
        clockPuzzle: false,
        electricPanel: false
    }


    let wrongAnswers = 0; 

    const registerWrongAnswer = () => {
        wrongAnswers = wrongAnswers++;
    } 

    let previousState= {
        flatPuzzle2: null,
        warehousePuzzle1: null,
        bunkerPuzzle2: null
    }

    let openedDoors = [];

    return {
        processAnswer: (puzzle, correctAnswer) => {
            
            if(correctAnswer) {
             answers[puzzle] = true
            } else {
             answers[puzzle] = false
             wallSwitchState.active = false
                registerWrongAnswer();
            }
           
            if(answers.flatPuzzle2 && answers.bunkerPuzzle2 && answers.warehousePuzzle1) {
                wallSwitchState.active = true
            }
        }, 
        retrieve: () => answers,
        addOpenedDoor: (door) => {
            console.log(door)
            openedDoors.push(door);
        },
        openedDoors: openedDoors,
        retrievePreviousState: (puzzleCode) => previousState[puzzleCode],
        saveState: (puzzleCode, state) => previousState = {...previousState, [puzzleCode]: state},
        retrieveWrongAnswer: () => wrongAnswers,
        calculateCorrectAnswers: () => {
            let value = 0;
        
           const facebookPuzzles = ["flatPuzzle2", "warehousePuzzle1", "bunkerPuzzle2"]
           for (const prop in answers) {
               console.log(answers[prop]) 
               if (answers[prop] && facebookPuzzles.indexOf(prop) > -1) value++;
            }

            return value

        },
        solved: () => wallSwitchState.active = true,
        clockPuzzleResolved: () => answers.clockPuzzle = true,
        electricPanelPuzzleResolved: bool => {
            if (bool) {
            answers.electricPanel = bool}
        else return answers.electricPanel
        },
    }
})()