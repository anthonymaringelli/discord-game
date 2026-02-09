

    // sends initial post w seperator
export async function initPost(game, gameBoardString) {
    const separator = createSpacer(game.config.length * game.config.standatdEmojiWidth);
    // one discord emoji is 5.8 monospace chars long

    await sendMsg(game, separator);
    const gameMsg = await sendMsg(game, gameBoardString);
    storeMsg(game, gameMsg); 
};



    // sends a new post
export async function sendMsg(game, msg){
    let sentMsg = await game.states.channel.send(msg);
    return sentMsg;
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
        let boardLength = gameBoard.length * 5.8;
        // console.log(boardLength);
        // // get length of fin msg
        let msgLength = newMsg.length;
        // console.log(msgLength);
        // // subtract l of fin msg from l of board, divide by 2
        let diff = boardLength - msgLength;
        const leftLength = Math.floor(diff / 2);
        const rightLength = Math.ceil(diff / 2);

        const left = "#".repeat(leftLength);
        let right = "#".repeat(rightLength);
        const bottomSeparator = createSpacer(config.length * config.standatdEmojiWidth);
        let winMsg = `${left}${newMsg}${right}`;
        // while (winMsg.length < bottomSeparator.length) {
        //     winMsg += "#";
        // }
        console.log("winMsg length: ", winMsg.length);
        console.log("bottomSeparator length: ", bottomSeparator.length);


// interesting ////////////////////////////////////////////////////////
    const block2 = "`";
// edit message
// CALL THE EDITOR FUNC
        await message.edit(`${block2}${winMsg}${block2}`);

    // send separator
        await channel.send(`${block2}${bottomSeparator}${block2}`);
        // await channel.send(`${block2}${bottomSeparator}${block2}`);


    // const bottomSeparator = "#".repeat(config.length * 4.7);
    // const sideSeparatorLength = bottomSeparator.length - newMsg.length;
    // const sideSeparator = "#".repeat(sideSeparatorLength/2);


    // const editedMessage = await message.edit(`${sideSeparator}${newMsg}${sideSeparator}`);
    // const sepMsg = await channel.send(bottomSeparator)
        
    } catch (error) {
        console.error("[ERROR] editMsg.js ", error)
    }
}



function createSpacer(length){
    const block = "`";
    return `${block}${"#".repeat(length)}${block}`;
}


// FUTURE:
// spacers added to game data or states,
// initally send spacers
// connect final spacer to reactions, connect its reactions to the game board
// text in middle of spacers function