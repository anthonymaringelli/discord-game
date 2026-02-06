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

        
            this.listenForReactions(this.states.msgId, ({ emoji, user, message }) => {
                // call moveLogic.handleMove with the emoji (moveLogic currently expects a single move arg)
                this.logic.handleMove(emoji);
            });

        } catch (error) {
            console.error("[ERROR] moveGame start(), ", error)
        }
    }


    async initPost() {
            // gotta hardcode this, discord renders emojis as images
            // not uniform monospace columns :(
            // 10 greensquare imgs are about 47 characters
        const separator = "#".repeat(47);
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
    listenForReactions(messageId, onReact) {
        const channel = this.states.channel;

        // fetch the message we want to listen to
        channel.messages.fetch(messageId).then(message => {
            // filter out bot reactions and only accept the left/right emojis
            const filter = (reaction, user) => {
                if (user.bot) return false;
                return [this.data.leftReact, this.data.rightReact].includes(reaction.emoji.name);
            };

                // discord.js messageobject,,, collect filtered reactions, do it for 2 mins
            const collector = message.createReactionCollector({
                filter,
                time: 120_000 // 2 minutes
            });

            collector.on("collect", async (reaction, user) => {
                try {
                    console.log('[DEBUG] collector collected', reaction.emoji?.name, 'from', user?.tag || user?.id);
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
                    console.error("[ERROR] collecting reaction", err);
                }
            });

            collector.on("end", () => {
                // optional: cleanup or log
                console.log("Reaction listener ended");
            });

        }).catch(err => console.error("[ERROR] fetch message for reactions", err));

    }
};