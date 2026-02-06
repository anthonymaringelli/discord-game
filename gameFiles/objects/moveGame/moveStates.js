import { moveData as data } from "./moveData.js"
import { moveConfig as config } from "./moveConfig.js"

export class moveStates {
    constructor(channel){
        this.channel = channel;
        this.msgObj = null;
        this.msgId = null;
        // this.gameBoardArray = new Array(config.length).fill(data.background);
            // may need to move filling to genBoard logic, 
            // refill after each iteration and store here.
        this.gameBoardArray = new Array(config.length);
        this.applePosition = null;
        this.charPosition = null;

    }
};