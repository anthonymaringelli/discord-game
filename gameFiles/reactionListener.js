 
 
        //  not connecting yet, logic first to see everything needed

        
//  export async function listenForReactions(messageId, onReact) {
//             const channel = this.states.channel;
//             const message = await channel.messages.fetch(messageId); 

//                 // filters what the collector should listen for
//             const filter =(reaction, user) => {
//                 if (user.bot) return false;
//                 return [this.data.leftReact, this.data.rightReact].includes(reaction.emoji.name); 
//             };

//                 // discord.js message object,,, collect filtered reactions, do it for 20 mins
//             const collector = message.createReactionCollector({
//                 filter,
//                 time: 1200_000 // 20 minutes
//             });

//             collector.on("collect", async (reaction, user) => {
//                 try {
//                     // make sure full reaction, not partials
//                     if (reaction.partial) await reaction.fetch();

//                     // forward reaction to the provided callback
//                     onReact({
//                         emoji: reaction.emoji.name,
//                         user,
//                         message
//                     });

//                     // remove user's reaction so they can press again
//                     reaction.users.remove(user.id).catch(() => {});
//                 } catch (err) {
//                     console.error("[ERROR] collector.on error", err);
//                 }
//             });

//             collector.on("end", () => {
//                 console.log("Reaction listener ended");
//             });

//         }


