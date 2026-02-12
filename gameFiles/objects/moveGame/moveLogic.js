import { moveData as data } from "./moveData.js";



export const moveLogic = {

// generates board 
    genBoard(states, newPos) {
        try{

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



// check if move possible, check if its a point, make the move
    handleMove(game, move){

                // get new move index, check if possible
        const direction = this.getDelta(move);
        const newPos = game.states.charPosition + direction;
        if (!this.movePossible(game, newPos)) return;
             
        game.states.charPosition = newPos;

        this.placeChar(game.states, game.states.charPosition);
        this.moveCounter(game)

                // check if on apple
        if (game.states.charPosition === game.states.applePosition) {
                game.states.points ++;
                console.log("Point scored! Total points: ", game.states.points);

                this.winCheck(game, game.states.points);
                game.states.applePosition = null;
                this.placeApple(game.states);
        }

        this.genBoard(game.states, newPos);
        const stringBoard = this.stringifyBoard(game.states);

                // send new board to editMsg
        game.updateSpacerText(game.states.moveCount, game.states.points);
        game.sendToEdit(stringBoard);
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
        if (points >= game.config.winCondition){            
            game.endGame();     
        };
    }
};



    // PROBLEMS

    // BIGGER
// major cleanup/ file separation
    // helpers
        // fix spacer thing split editFinalmsg into smaller funcs
    // logic
// extra separators after, reactions on lowest
// top line of text to update -- 
    // text display, will use new sep system
    // and edit/update system, when stat in states changes, call to update display msg


// strategy comes down to amount of effective choices you have available, 
// more you have, richer the strategy