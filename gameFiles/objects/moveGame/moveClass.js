import { moveLogic } from "./moveLogic.js"
import { moveData } from "./moveData.js"
import { moveStates } from "./moveStates.js"
import { moveConfig } from "./moveConfig.js"

export class moveGame {
    constructor(channel) {
        this.logic = moveLogic;
        this.data = moveData;
        this.states = moveStates;
        this.states.channel = channel;
        this.config = moveConfig;
    }

    async start() {
        try{

            await this.genBoard();
            
            const initReacts = await [this.data.leftReact, this.data.rightReact]
            await this.sendReactions(initReacts);

        } catch (error) {
            console.error("[ERROR] moveGame start(), ", error)
        }
    }


    async genBoard() {
            // gotta hardcode this, discord renders emojis as images
            // not uniform monospace columns :(
            // 10 greensquare imgs are about 47 characters
        const separator = "#".repeat(47);
            // strings are immutable, make an array, then join into string
        let gameBoard = new Array(this.config.length).fill(this.data.background);
        gameBoard[Math.floor(Math.random() * gameBoard.length)] = this.data.character;
        gameBoard = gameBoard.join('');

            // sends msgs
        const sepMsg = await this.states.channel.send(separator)
        const gameMsg = await this.states.channel.send(gameBoard);
            // reusable, for making multple msgs, hard to get the gameMsg, may be useful later
        // const initMsg = [separator, gameBoard];
        // await sendMsg(initMsg);
        // for (let m of initMsg){
        //     await this.states.channel.send(m);
        // }
            
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