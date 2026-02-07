import { moveData as data } from "./moveData.js";
import { moveConfig as config } from "./moveConfig.js";


export const moveLogic = {

// generates board 
    genBoard(states) {
        try{

            this.fillBoard(states.gameBoardArray)
            // const randomIndex = Math.floor(Math.random() * states.gameBoardArray.length);
            this.placeChar(states, Math.floor(Math.random() * states.gameBoardArray.length));
            this.placeApple(states, Math.floor(Math.random() * states.gameBoardArray.length));

            console.log("START: Char:", states.charPosition, "Apple:", states.applePosition);
            
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
    placeChar(states, position){
        states.gameBoardArray[position] = data.character;
        states.charPosition = position;

    },
    
// place new apple
    placeApple(states, rndmIndx){
        do {
            // let rndmIndx = Math.floor(Math.random() * states.gameBoardArray.length);
            if (states.gameBoardArray[rndmIndx] !== data.character){

                states.gameBoardArray[rndmIndx] = data.apple;
                states.applePosition = rndmIndx;

                return;
            }
        } while (true);
        // if there's no free space this will be an infite loop

    },



// func for: if x reaction, check if possible, then if possible do function y(regen gameboard in specific way)
    handleMove(game, move){
        console.log("move selected", move);
        this.moveSelected(game, move);
    },

// check if move possible, check if its a point, make the move
    moveSelected(game, move){
        const direction = this.getDelta(move);

        const newPos = game.states.charPosition  + direction;
        if (!this.movePossible(game, newPos)){
             console.log("Invalid move!"); 
             return;
        };    
             
        game.states.charPosition = newPos;

        console.log(move === data.rightReact ? "RIGHT!" : "LEFT!");
        console.log("Char:", game.states.charPosition, "Apple:", game.states.applePosition);

            if (game.states.charPosition === game.states.applePosition) {
                game.states.points ++;
                // regen apple: true
            }
            // this.moveChar(move)
            this.moveCounter(game)
            // call genboard: regen func

    },
   

// func for move change
    getDelta(move){    
        if (move === data.rightReact) return 1;
        if (move === data.leftReact) return -1;
    },


// func for check if move possible
    movePossible(game, newPos) {
        return newPos >= 0 && newPos < game.states.gameBoardArray.length;
    },


// move char, call editMsg, passing new board
    moveChar(gameBoard, move){

    },

// func to track moves
    moveCounter(game){
        game.states.moveCount ++;
        console.log("Move count: ", game.states.moveCount);
    },

// sends win msg
    winCheck(game, points){
        if (points >= 5){
            // const finMsg = `You won in ${game.states.moveCount moves}`;
            // REWRITE MSG FUNCTION(game.states.msgId, finMsg);
        };
    }
};

// sep send msg into its own file
// sep edit msg into its own file
