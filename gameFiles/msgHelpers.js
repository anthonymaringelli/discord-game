

    // sends initial post w seperator
export async function initPost(game, gameBoardString) {
        // makes seperator msg/ gens gameboard as a string
    const separator = "#".repeat(game.config.length * 4.7);

        // sends msgs
    const sepMsg = await game.states.channel.send(separator)
    const gameMsg = await game.states.channel.send(gameBoardString);
    
    return gameMsg;
};

    // sends a new post
export async function sendMsg(Msg, game){
    await game.states.channel.send(Msg);
}

    // sets states msgId and msgObj
export async function storeMsg(game, gameMsg){ 
    game.states.msgObj = gameMsg;
    game.states.msgId = gameMsg.id;
};

    // edits given msg with given new content
export async function editMsg(client,channelId, messageId, newMsg){
    try{
        const channel = await client.channels.fetch(channelId);
        const message = await channel.messages.fetch(messageId);

        const editedMessage = await message.edit(newMsg);
        
    } catch (error) {
        console.error("[ERROR] editMsg.js ", error)
    }

}