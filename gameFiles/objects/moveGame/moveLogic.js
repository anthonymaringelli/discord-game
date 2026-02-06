import { moveData as data } from "./moveData.js";
import { moveConfig as config } from "./moveConfig.js";


export const moveLogic = {

// generates board 
    genBoard(states) {
        try{
            this.fillBoard(states.gameBoardArray)
            this.placeChar(states);
            this.placeApple(states.gameBoardArray);
            
            let gameBoardString = states.gameBoardArray.join('');
            console.log(gameBoardString);
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
    placeChar(states){
        const randomIndex = Math.floor(Math.random() * states.gameBoardArray.length);
        states.gameBoardArray[randomIndex] = data.character;
        states.charPosition = randomIndex;

    },
    
// place new apple
    placeApple(gameBoardArray){
        do {
            let rndmIndx = Math.floor(Math.random() * gameBoardArray.length);
            if (gameBoardArray[rndmIndx] !== data.character){
                gameBoardArray[rndmIndx] = data.apple;
                return;
            }
        } while (true);
        // if there's no free space this will be an infite loop

    },



// func for: if x reaction, check if possible, then if possible do function y(regen gameboard in specific way)
    handleMove(move){
        console.log("move selected", move);
        // this.moveSelected(move);
    },

// check if move possible, check if its a point, make the move
    moveSelected(move){
        movePossible(move);
        if (move === data.rightReact){
            this.movePossible(move)
            this.isApple()
            this.moveChar(move)
            // call genboard: regen func
        };
        
        if (move === data.leftReact){
            this.movePossible(move)
            this.isApple()
            this.moveChar(move)
            // call genboard: regen func
        };
    },
// func for check if move possible
    movePossible(move){
        // if move(indx) in board exists, call checkApple function
        // checkApple function: if move is an apple, add 1 to score: call genBoard w apple= true
        //  which will trigger placeApple func
         
    },

// if on apple, add point, check if win, regen apple
    isPoint(gameboard, move){
        
    },

// move char, call editMsg, passing new board
    moveChar(gameBoard, move){

    },

// func to track moves
    moveCounter(states){
        states.moveCount ++;
        console.log("Move count: ", movecount);
    },

// sends win msg
    winCheck(points){
        if (points >= 5){
            // rewrites board, u won in x moves
        };
    }
};

// sep send msg into its own file
// sep edit msg into its own file
