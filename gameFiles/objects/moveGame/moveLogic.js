import { moveData as data } from "./moveData.js";
import { moveConfig as config } from "./moveConfig.js";


export const moveLogic = {
    apple: false,
    started: false,


// generates board 
    genBoard(states) {
        try{
            this.fillBoard(states.gameBoardArray)
            this.placeChar(states.gameBoardArray);
            this.placeApple(states.gameBoardArray);
            
            let gameBoardString = states.gameBoardArray.join('');
            return gameBoardString;
        } catch(error) {
            console.error("[ERROR] genBoard ", error)
        }
    },

// fills array with data.background
    fillBoard(gameBoardArray){
        gameBoardArray.fill(data.background)
    },

// init char placement
    placeChar(gameBoardArray){
        gameBoardArray[Math.floor(Math.random() * gameBoardArray.length)] = data.character;
    },
    
// place new apple
    placeApple(gameBoardArray){
        do {
            let rndmIndx = Math.floor(Math.random() * gameBoardArray.length);
            if (gameBoardArray[rndmIndx] !== data.character){
                gameBoardArray[rndmIndx] = data.apple;
                return;
                // this.apple = true;
            }
        } while (true);
        // if there's no free space this will be an infite loop

    },



// func for: if x reaction, check if possible, then if possible do function y(regen gameboard in specific way)
    handleMove(move){
        console.log("GOT IT");
        moveSelected(move);
    },

    moveSelected(move){
        // movePossible(move);
        if (move === data.rightReact){
            movePossible(move)
            moveChar(move)
            // call genboard: regen func
        };
        
        if (move === data.leftReact){
            movePossible(move)
            moveChar(move)
            // call genboard: regen func
        };


    },
// func for check if move possible
    movePossible(move){
        // if ()
        // if move(indx) in board exists, call checkApple function
        // checkApple function: if move is an apple, add 1 to score: call genBoard w apple= true
        //  which will trigger placeApple func
         
    },
// func for check if on apple, if so add point
// everytime point won, func for checking if win condition points

// func to track moves
// func to display "you won in x moves"


};
