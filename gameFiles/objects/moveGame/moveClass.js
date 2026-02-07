import { moveLogic } from "./moveLogic.js"
import { moveData } from "./moveData.js"
import { moveStates } from "./moveStates.js"
import { moveConfig } from "./moveConfig.js"
import { initPost, storeMsg, editMsg } from "../../msgHelpers.js"
import { sendReactions, removeReactions } from "../../reactionHelpers.js"
import { listenForReactions } from "../../reactionListener.js"


export class moveGame {
    constructor(channel) {
        this.logic = moveLogic;
        this.data = moveData;
        this.states = new moveStates(channel);
        this.config = moveConfig;
    }

    async start() {
        try{
            // first post
            const gameBoardPositions = await this.logic.genBoard(this.states, Math.floor(Math.random() * this.states.gameBoardArray.length));
            const gameBoardString = await this.logic.renderBoard(this.states);
            const gameMsg = await initPost(this, gameBoardString);
            // store msg id
            await storeMsg(this, gameMsg);


            // first reactions
            const initReacts = [this.data.leftReact, this.data.rightReact]
            await removeReactions(this);
            await sendReactions(this, initReacts);

            // starts reaction listener, sends user reactions -> moveLogic.js -> handleMove()
            listenForReactions(this, this.states.msgId, ({ emoji, user, message }) => {
                this.logic.handleMove(this, emoji);
            });

        } catch (error) {
            console.error("[ERROR] moveGame start(), ", error)
        }
    }


    };
