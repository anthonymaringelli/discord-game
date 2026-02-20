import { moveLogic } from "./moveLogic.js"
import { moveData } from "./moveData.js"
import { moveStates } from "./moveStates.js"
import { moveConfig } from "./moveConfig.js"
import { editMsg, sendMsg, editFinalMsg, createSpacer, constructSpacerMsg, constructMsg } from "../../msgHelpers.js"
import { sendReactions, removeReactions } from "../../reactionHelpers.js"
import { listenForReactions, listenForButtons } from "../../moveListeners.js"
import { createGameButtons } from "../../buttonHelpers.js"


export class moveGame {
    constructor(channel, userId) {
        this.logic = moveLogic;
        this.data = moveData;
        this.config = moveConfig;
        this.states = new moveStates(channel, userId);
    }


    async start() {
        try{
            // first post
            const gameBoardPositions = await this.logic.genBoard(this.states, Math.floor(Math.random() * this.states.gameBoardArray.length));
            const gameBoardString = await this.logic.stringifyBoard(this.states);
            const separator = createSpacer(this.config.length * this.config.standardEmojiWidth);

            let TESTMSG = ` Moves: ${this.states.moveCount}, Points: ${this.states.points} `
            await sendMsg(this.states, separator);
            await sendMsg(this.states, constructSpacerMsg(TESTMSG, this.config), "textLine");
            await sendMsg(this.states, gameBoardString, "gameReact")

    
            let spacer = "`";
            let lineBreak = "\n"
            let testMsg = `${spacer}${separator}${spacer}${lineBreak}${spacer}${separator}${spacer}${lineBreak}${spacer}${separator}${spacer}${lineBreak}${spacer}${separator}${spacer}`;
            await sendMsg(this.states, testMsg, "spacer");

            // const fullMsg = await constructMsg(separator, TESTMSG, gameBoardString, testMsg);
            // await sendMsg(this.states, fullMsg, "game");

            // first reactions
            await sendReactions(this, this.data.initials, "spacer");


            // // buttons
            const row = createGameButtons(this);

            const sentMsg = {
                content: gameBoardString,
                components: [row]    
            }
            await sendMsg(this.states, sentMsg, "gameButton")

            
            listenForButtons(this, "gameButton")


            // reactions
            const reactionCollector = await listenForReactions(this, "spacer");
            this.states.reactionCollector = reactionCollector;

            // const collector = await listenForReactions(this, "spacer", ({ emoji }) => {
            //     this.logic.handleMove(this, emoji);
            // });
            // this.states.collector = collector;
            

        } catch (error) {
            console.error("[ERROR] moveGame start(), ", error)
        }
    }



    updateSpacerText(moveCount, points) {
        const newText = ` Moves: ${moveCount}, Points: ${points} `;
        editMsg(this.states, constructSpacerMsg(newText, this.config), "textLine");
    }


// /////////////////////////////////////////
    // updates the board
    sendToEdit(newBoard, msgType=null){

        if (this.states.gameActive === false) return;
        console.log(msgType)
        if (msgType === "gameReact"){
        editMsg(this.states, newBoard, "gameReact");
        } else if (msgType === "gameButton"){
        editMsg(this.states, newBoard, "gameButton");
        }
    }


    
    // ends reaction collector, sends final msg, removes reactions
    endGame() {
        this.states.gameActive = false;

        const finMsg = ` You won in ${this.states.moveCount} moves! `;
        editFinalMsg(this.states, this.config, finMsg, "gameReact");

        removeReactions(this, "spacer");
        this.states.reactionCollector.stop();
    }
};
