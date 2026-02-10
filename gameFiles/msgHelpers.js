

    // sends initial post w seperator
export async function initPost(game, gameBoardString) {
    const separator = createSpacer(game.config.length * game.config.standatdEmojiWidth);

    await sendMsg(game.states, separator);
    const gameMsg = await sendMsg(game.states, gameBoardString);
    storeMsg(game, gameMsg); 
};



    // sends a new post
export async function sendMsg(states, msg){
    let sentMsg = await states.channel.send(msg);
    return sentMsg;
}


    // edits given msg with given new content
export async function editMsg(states, newMsg){
    try{
        const message = await states.channel.messages.fetch(states.msgId);
        const editedMessage = await message.edit(newMsg);

    } catch (error) {
        console.error("[ERROR] editMsg.js ", error)
    }
}



    // sets states msgId and msgObj
export async function storeMsg(game, gameMsg){ 
    game.states.msgObj = gameMsg;
    game.states.msgId = gameMsg.id;
};



export async function editFinalMsg(states, config, newMsg){
    try{
// //////////doesnt work on single sigit numbers?////////////////////////////////////////////////////////
        const bottomSeparator = createSpacer(config.length * config.standatdEmojiWidth);
        
        let diff = ((bottomSeparator.length - (newMsg.length + 2)) / 2);
        const left = "#".repeat(Math.floor(diff));
        const right = "#".repeat(Math.ceil(diff));


        let winMsg = `${left}${newMsg}${right}`;
        const block = "`";

        editMsg(states, `${block}${winMsg}${block}`);
        sendMsg(states, bottomSeparator);  
    } catch (error) {
        console.error("[ERROR] editMsg.js ", error)
    }
}



function createSpacer(length){
    const block = "`";
    return `${block}${"#".repeat(length)}${block}`;
}

function splitSpacer(spacer, msg){
};


// FUTURE:
// connect final spacer to reactions, connect its reactions to the game board
// text in middle of spacers function