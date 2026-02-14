


    // sends a new post. if msgType, stores  msgObj
export async function sendMsg(states, msg, msgType=null){
    let sentMsg = await states.channel.send(msg);

    if (msgType) {
        await storeMsg(states, sentMsg, msgType);
    }
}



    // sets states "type": Obj
export async function storeMsg(states, message, msgType) {
    states.messages[msgType] = {
        obj: message,
    };
}


    // edits given msg with given new content
export async function editMsg(states, newMsg, msgType=null){
    try{
        const editedMessage = await states.messages[msgType].obj.edit(newMsg);
        states.messages[msgType].obj = editedMessage;

    } catch (error) {
        console.error("[EditMsg] error ", error)
    }
}


// split into two funcs, editMsg, splitSpacer
export async function editFinalMsg(states, config, newMsg, msgType){
    try{
        const bottomSeparator = createSpacer(config.length * config.standardEmojiWidth);

        editMsg(states, constructSpacerMsg(newMsg, config), msgType);

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

export async function constructMsg(...msgs){
    // send each msg, returns a string that has all msgs separated by line break
    return msgs.join("\n");
}

// FUTURE:
// connect final spacer to reactions, connect its reactions to the game board
// text in middle of spacers function