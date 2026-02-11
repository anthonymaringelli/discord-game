import { moveData as data } from "./moveData.js"
import { moveConfig as config } from "./moveConfig.js"

export class moveStates {
    constructor(channel, userId, client){

            // discord states
        this.channel = channel;
        this.gameMsgObj = null;
        this.gameMsgId = null;
        this.spacerObj = null;
        this.spacerId = null;
        this.client = client;
        this.userId = userId;

            // game states
        this.gameBoardArray = new Array(config.length);
        this.applePosition = null;
        this.charPosition = null;
        this.moveCount = 0;
        this.points = 0;
        this.collector = null;

            // master switch
        this.gameActive = true;

    }
};