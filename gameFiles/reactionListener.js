

        // listens for specific reactions, sends them to moveClass.js
export async function listenForReactions(game, reactMsgType, sendToLogic) {
         if (game.states.isActive === false) {
                console.log("Game is not active, not starting reaction listener");
                return;}


        const message = game.states.messages[reactMsgType].obj;

  
                // filters what the collector should listen for
        const filter =(reaction, user) => {
                if (user.id !== game.states.userId) return false; 
                return [game.data.leftReact, game.data.rightReact].includes(reaction.emoji.name); 
        };

                // discord.js message object,,, collect filtered reactions, do it for 4 mins
        const collector = message.createReactionCollector({
                filter,
                time: 240_000 // 4 minutes
        });

        collector.on("collect", async (reaction, user) => {
                 try {
                        // make sure full reaction, not partials
                    if (reaction.partial) await reaction.fetch();
                
                        // forward reaction to the provided callback
                    await sendToLogic({
                        emoji: reaction.emoji.name,
                        user,
                    });

                    // remove user's reaction so they can press again
                    await reaction.users.remove(user.id).catch(() => {});
                } catch (err) {
                    console.error("[collector.on] ERROR", err);
                }
        });


        collector.on("end", () => {
                console.log("Reaction listener ended");
        });
        
        return collector;

}