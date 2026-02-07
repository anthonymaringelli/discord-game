 
 
  


export async function listenForReactions(game, messageId, onReact) {
        const channel = game.states.channel;
        const message = await channel.messages.fetch(messageId); 

                // filters what the collector should listen for
        const filter =(reaction, user) => {
                if (user.bot) return false;
                return [game.data.leftReact, game.data.rightReact].includes(reaction.emoji.name); 
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