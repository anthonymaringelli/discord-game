
// REACTION LISTENER
export async function listenForReactions(game, reactMsgType) {
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
                

                    console.log("reaction, ", reaction.emoji.name)
                    const move = reaction.emoji.name === "⬅️" ? "left" : "right";
                    game.logic.handleMove(game, move, "gameReact");

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





// BUTTON LISTENER
export async function listenForButtons(game, reactMsgType) {

    const message = game.states.messages[reactMsgType].obj;

    if (game.states.isActive === false) return;

    const collector = message.createMessageComponentCollector({
        time: 240_000
    });

    collector.on("collect", async (interaction) => {
        try {
            if (interaction.user.id !== game.states.userId) {
                return interaction.reply({
                    content: "Not your game!",
                    ephemeral: true
                });
            }

            await interaction.deferUpdate();

            console.log("sending move, ", interaction.customId)
            const move = interaction.customId === "move_left_undefined" ? "left":"right";
            // ONLY SENDING LEFT
            // Forward only what logic needs
            game.logic.handleMove(game, move, "gameButton");

        } catch (err) {
            console.error("[Button Collector Error]", err);
        }
    });

    collector.on("end", () => {
        console.log("Button collector ended");
    });

    return collector;
}
