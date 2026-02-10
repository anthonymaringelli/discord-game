import { moveLogic } from "./moveLogic.js"
import { moveData } from "./moveData.js"
import { moveStates } from "./moveStates.js"
import { moveConfig } from "./moveConfig.js"
import { initPost, editMsg, editFinalMsg } from "../../msgHelpers.js"
import { sendReactions, removeReactions } from "../../reactionHelpers.js"
import { listenForReactions } from "../../reactionListener.js"


export class moveGame {
    constructor(channel) {
        this.logic = moveLogic;
        this.data = moveData;
        this.config = moveConfig;
        this.states = new moveStates(channel);
    }


    async start() {
        try{
            // first post
            const gameBoardPositions = await this.logic.genBoard(this.states, Math.floor(Math.random() * this.states.gameBoardArray.length));
            const gameBoardString = await this.logic.stringifyBoard(this.states);
            await initPost(this, gameBoardString);

            // first reactions
            const initReacts = [this.data.leftReact, this.data.rightReact]
            await removeReactions(this);
            await sendReactions(this, initReacts);

            // starts reaction listener, sends user reactions -> moveLogic.js -> handleMove()
            const collector = await listenForReactions(this, this.states.msgId, ({ emoji, user, message }) => {
                this.logic.handleMove(this, emoji);
            });
            this.states.collector = collector;

        } catch (error) {
            console.error("[ERROR] moveGame start(), ", error)
        }
    }


    // updates the board
    sendToEdit(newBoard){
        if (this.states.gameActive === false) return;
        editMsg(this.states, newBoard);
    }

    
    // ends collector, sends final msg, removes reactions
    endGame() {
        this.states.gameActive = false;

        const finMsg = ` You won in ${this.states.moveCount} moves! `;

        editFinalMsg(this.states, this.config, finMsg);

        removeReactions(this);

        this.states.collector.stop();
    }
};
