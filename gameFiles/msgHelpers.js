


    // sends a new post. if mainpost is true, stores msgId and msgObj
export async function sendMsg(states, msg, storeType=null){
    let sentMsg = await states.channel.send(msg);

    if (storeType) {
        await storeMsg(states, sentMsg, storeType);
    }
}



    // sets states msgId and msgObj
export async function storeMsg(states, message, storeType) {
    states.messages[storeType] = {
        obj: message,
        id: message.id
    };
}


    // edits given msg with given new content
export async function editMsg(states, newMsg, type="game"){
    try{
        const message = await states.channel.messages.fetch(states.messages[type].id);
        const editedMessage = await message.edit(newMsg);

    } catch (error) {
        console.error("[ERROR] editMsg.js ", error)
    }
}


// split into two funcs, editMsg, splitSpacer
export async function editFinalMsg(states, config, newMsg){
    try{
        const bottomSeparator = createSpacer(config.length * config.standardEmojiWidth);

        editMsg(states, constructSpacerMsg(newMsg, config));

        // sendMsg(states, bottomSeparator);  
    } catch (error) {
        console.error("[ERROR] editMsg.js ", error)
    }
}



export function createSpacer(length){
    const block = "`";
    return `${block}${"#".repeat(length)}${block}`;
}



export function constructSpacerMsg(msg, config){

    const spacerLength = config.length * config.standardEmojiWidth + 2;
    let diff = ((spacerLength - (msg.length + 2)) / 2);

    const left = "#".repeat(Math.floor(diff));
    const right = "#".repeat(Math.ceil(diff));
    const block = "`";

    let returnMsg = `${block}${left}${msg}${right}${block}`;

    return returnMsg;
}

// FUTURE:
// connect final spacer to reactions, connect its reactions to the game board
// text in middle of spacers function