import { moveLogic } from "./moveLogic.js"
import { moveData } from "./moveData.js"
import { moveStates } from "./moveStates.js"
import { moveConfig } from "./moveConfig.js"

export class moveGame {
    constructor(channel) {
        this.logic = moveLogic;
        this.data = moveData;
        this.states = new moveStates(channel);
        this.config = moveConfig;
    }

    async start() {
        try{

            await this.initPost();
            
            const initReacts = [this.data.leftReact, this.data.rightReact]
            await this.sendReactions(initReacts);

        } catch (error) {
            console.error("[ERROR] moveGame start(), ", error)
        }
    }


    async initPost() {
            // gotta hardcode this, discord renders emojis as images
            // not uniform monospace columns :(
            // 10 greensquare imgs are about 47 characters
        const separator = "#".repeat(47);
        let gameBoard = await this.logic.genBoard();

            // sends msgs
        const sepMsg = await this.states.channel.send(separator)
        const gameMsg = await this.states.channel.send(gameBoard);
            
            // stores msg obj/ msg id so can find msg and edit it later
        this.states.msgObj = gameMsg;
        this.states.msgId = gameMsg.id;
    }


    // clears all reactions, then sends reactions from given array.
    async sendReactions(reacts) {
    
        await this.states.msgObj.reactions.removeAll();
        
        for (const r of reacts) {
            await this.states.msgObj.react(r);
        }
    }
};