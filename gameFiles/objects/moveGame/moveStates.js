import { moveData as data } from "./moveData.js"
import { moveConfig as config } from "./moveConfig.js"

export class moveStates {
    constructor(channel){
            // discord states
        this.channel = channel;
        this.msgObj = null;
        this.msgId = null;
        this.client = null;
            // game states
        this.gameBoardArray = new Array(config.length);
        this.applePosition = null;
        this.charPosition = null;
        this.moveCount = 0;
        this.points = 0;

            // master switch
        this.gameActive = true;
    }
};