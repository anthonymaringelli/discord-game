

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

export async function editFinalMsg(gameBoard, client, channelId, messageId, config, newMsg){
    try{
        const channel = await client.channels.fetch(channelId);
        const message = await channel.messages.fetch(messageId);
// //////// purpose of this func is to print a msg w spacers, to make up for now lacking emoji line space
// ///// prints # on each side of msg for style/centering, and a line beneath for vertical spacing
        // get length of board
        let boardLength = gameBoard.length * 4.7;
        // console.log(boardLength);
        // // get length of fin msg
        let msgLength = newMsg.length;
        // console.log(msgLength);
        // // subtract l of fin msg from l of board, divide by 2
        let diff = boardLength - msgLength;
        // // print #.repeat(diff/2) + fin msg + #.repeat(diff/2)
        // let repeat = "#".repeat(diff/2);
        // const editedMessage = await message.edit(`${repeat}${newMsg}${repeat}`);


    const leftLength = Math.floor(diff / 2);
    const rightLength = Math.ceil(diff / 2);

    const left = "#".repeat(leftLength);
    const right = "#".repeat(rightLength);
    const bottomSeparator = "#".repeat(config.length * 4.7);
    const block = "```";
// edit message
    await message.edit(`${block}${left}${newMsg}${right}${block}`);

// send separator
    await channel.send(bottomSeparator);


    // const bottomSeparator = "#".repeat(config.length * 4.7);
    // const sideSeparatorLength = bottomSeparator.length - newMsg.length;
    // const sideSeparator = "#".repeat(sideSeparatorLength/2);


    // const editedMessage = await message.edit(`${sideSeparator}${newMsg}${sideSeparator}`);
    // const sepMsg = await channel.send(bottomSeparator)
        
    } catch (error) {
        console.error("[ERROR] editMsg.js ", error)
    }

}