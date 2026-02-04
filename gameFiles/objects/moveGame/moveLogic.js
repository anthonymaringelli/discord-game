import { moveData as data } from "./moveData.js";
import { moveConfig as config } from "./moveConfig.js";


export const moveLogic = {
// genBoard w character
    async genBoard() {
        let gameBoard = new Array(config.length).fill(data.background);
        gameBoard[Math.floor(Math.random() * gameBoard.length)] = data.character;
        gameBoard = await this.placeApple(gameBoard);
        gameBoard = gameBoard.join('');
        return gameBoard;
    },
// place new apple
    placeApple(gameBoard){
        let rndmIndx = Math.floor(Math.random() * gameBoard.length);
        if (gameBoard[rndmIndx] !== data.character){
            gameBoard[rndmIndx] = data.apple;
            return gameBoard;
        }
        return gameBoard;
    } 
};
// func for: if x reaction hit, do function y( regen gameboard in specific way)
// func for check if move possible
// func for check if on apple, if so add point
// everytime point won, func for checking if win condition points

// func to track moves
// func to display "you won in x moves"


