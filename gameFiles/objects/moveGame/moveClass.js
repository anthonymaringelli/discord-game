import { moveLogic } from "./moveLogic.js"
import { moveData } from "./moveData.js"
import { moveStates } from "./moveStates.js"
import { moveConfig } from "./moveConfig.js"
import { initPost, storeMsg, editMsg } from "../../msgHelpers.js"
import { sendReactions, removeReactions } from "../../reactionHelpers.js"


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
            this.listenForReactions(this.states.msgId, ({ emoji, user, message }) => {
                this.logic.handleMove(this, emoji);
            });

        } catch (error) {
            console.error("[ERROR] moveGame start(), ", error)
        }
    }


    async listenForReactions(messageId, onReact) {
            const channel = this.states.channel;
            const message = await channel.messages.fetch(messageId); 

                // filters what the collector should listen for
            const filter =(reaction, user) => {
                if (user.bot) return false;
                return [this.data.leftReact, this.data.rightReact].includes(reaction.emoji.name); 
            };

                // discord.js message object,,, collect filtered reactions, do it for 20 mins
            const collector = message.createReactionCollector({
                filter,
                time: 1200_000 // 20 minutes
            });

            collector.on("collect", async (reaction, user) => {
                try {
                    // make sure full reaction, not partials
                    if (reaction.partial) await reaction.fetch();

                    // forward reaction to the provided callback
                    await onReact({
                        emoji: reaction.emoji.name,
                        user,
                        message
                    });

                    // remove user's reaction so they can press again
                    await reaction.users.remove(user.id).catch(() => {});
                } catch (err) {
                    console.error("[ERROR] collector.on error", err);
                }
            });

            collector.on("end", () => {
                // optional: cleanup or log
                console.log("Reaction listener ended");
            });
        }
    };
