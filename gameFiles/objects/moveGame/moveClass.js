import { moveLogic } from "./moveLogic.js"
import { moveData } from "./moveData.js"
import { moveStates } from "./moveStates.js"

export class moveGame {
    constructor(channel) {
        this.logic = moveLogic;
        this.data = moveData;
        this.states = moveStates(channel);
    }

    
};