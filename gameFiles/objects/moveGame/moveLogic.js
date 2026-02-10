import { moveData as data } from "./moveData.js";



export const moveLogic = {

// generates board 
    genBoard(states, newPos) {
        try{
            // if (states.gameActive === false) return;
            this.fillBoard(states.gameBoardArray)
            this.placeChar(states, newPos);
            this.placeApple(states);


        } catch(error) {
            console.error("[ERROR] genBoard ", error)
        }
    },



// turns array into string
    stringifyBoard(states){
        let gameBoardString = states.gameBoardArray.join('');
        return gameBoardString;
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
    placeApple(states){
    if (states.applePosition === null){

        do {
            // pick a random position each iteration
            let position = Math.floor(Math.random() * states.gameBoardArray.length);

            if (states.gameBoardArray[position] !== data.character){
                states.gameBoardArray[position] = data.apple;
                states.applePosition = position;
                return;
            }

        } while (true);

    } else {
        // apple already exists, render it in the board
        states.gameBoardArray[states.applePosition] = data.apple;
    }
},



// func for: if x reaction, check if possible, then if possible do function y(regen gameboard in specific way)
    handleMove(game, move){
         if (game.states.isActive === false) return;
        this.moveSelected(game, move);
    },



// check if move possible, check if its a point, make the move
    moveSelected(game, move){

            // get new move, check if possible
        const direction = this.getDelta(move);
        const newPos = game.states.charPosition + direction;
        if (!this.movePossible(game, newPos)){
             return;
        };     
        game.states.charPosition = newPos;

                // set new char indx
            this.placeChar(game.states, game.states.charPosition);
                // track moves
            this.moveCounter(game)

                // check if on apple
            if (game.states.charPosition === game.states.applePosition) {
                game.states.points ++;
                console.log("Point scored! Total points: ", game.states.points);
                    // check if win
                this.winCheck(game, game.states.points);
                    // regen apple
                game.states.applePosition = null;
                this.placeApple(game.states);
            }

                // regen board positions
            this.genBoard(game.states, newPos);
                // new board string
            const newBoard = this.stringifyBoard(game.states);
                // send new board to editMsg
            game.sendToEdit(newBoard);
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

// func to track moves
    moveCounter(game){
        game.states.moveCount ++;
    },

// sends win msg if meets win condition 
    winCheck(game, points){
        if (points >= 2){            
            game.endGame();     
        };
    }
};



// PROBLEMS:

// check user reactions

    // BIGGER
// major cleanup/ file separation
    // helpers
        // fix spacer thing
    // class
        // move listener starter?
    // logic
// extra separators after, reaction on lowest
// top line of text to update


