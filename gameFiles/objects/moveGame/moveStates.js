import { moveData as data } from "./moveData.js"
import { moveConfig as config } from "./moveConfig.js"

export class moveStates {
    constructor(channel, userId, client){

            // discord states
        this.channel = channel;
        this.client = client;
        this.userId = userId;

            // msg objects(objs)/// objs.id contains ids
        this.messages = {
                game: null,
                spacer: null,
                textLine: null
        };
        
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