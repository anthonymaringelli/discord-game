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
            // first post
            await this.initPost();

            // first reactions
            const initReacts = [this.data.leftReact, this.data.rightReact]
            await this.sendReactions(initReacts);

            // starts reaction listener, sends user reactions -> moveLogic.js -> handleMove()
            this.listenForReactions(this.states.msgId, ({ emoji, user, message }) => {
                this.logic.handleMove(emoji);
            });

        } catch (error) {
            console.error("[ERROR] moveGame start(), ", error)
        }
    }


    async initPost() {

            // makes seperator msg/ gens gameboard as a string
        const separator = "#".repeat(this.config.length * 4.7);
        let gameBoardString = await this.logic.genBoard(this.states);

            // sends msgs
        const sepMsg = await this.states.channel.send(separator)
        const gameMsg = await this.states.channel.send(gameBoardString);
            
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


    // reaction handling delegated to moveLogic.handleMove


    // func to listen to reactions
    // calls this.logic.moveSelected
    // redraws reactions, or removes user reaction
    async listenForReactions(messageId, onReact) {
            const channel = this.states.channel;
            const message = await channel.messages.fetch(messageId); 
        // fetch the message we want to listen to
        // channel.messages.fetch(messageId).then(message => {
        //     // filter out bot reactions and only accept the left/right emojis
        //     const filter = (reaction, user) => {
        //         if (user.bot) return false;
        //         return [this.data.leftReact, this.data.rightReact].includes(reaction.emoji.name);
        //     };

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
                    onReact({
                        emoji: reaction.emoji.name,
                        user,
                        message
                    });

                    // remove user's reaction so they can press again
                    reaction.users.remove(user.id).catch(() => {});
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
