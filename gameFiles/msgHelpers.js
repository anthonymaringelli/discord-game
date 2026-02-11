


    // sends a new post. if mainpost is true, stores msgId and msgObj
export async function sendMsg(states, msg, storePost=false, storeType=null){
    let sentMsg = await states.channel.send(msg);

    if (storePost) {
        storeMsg(states, sentMsg, storeType);
    }
}



    // sets states msgId and msgObj
export async function storeMsg(states, gameMsg, storeType){ 
    if (storeType === "game") {
        states.gameMsgObj = gameMsg;
        states.gameMsgId = gameMsg.id;
    } else if (storeType === "spacer") {
        states.spacerObj = gameMsg;
        states.spacerId = gameMsg.id;
    } 
 
};



    // edits given msg with given new content
export async function editMsg(states, newMsg){
    try{
        const message = await states.channel.messages.fetch(states.gameMsgId);
        const editedMessage = await message.edit(newMsg);

    } catch (error) {
        console.error("[ERROR] editMsg.js ", error)
    }
}


// split into two funcs, editMsg, splitSpacer
export async function editFinalMsg(states, config, newMsg){
    try{
        const bottomSeparator = createSpacer(config.length * config.standardEmojiWidth);
        
        let diff = ((bottomSeparator.length - (newMsg.length + 2)) / 2);
        const left = "#".repeat(Math.floor(diff));
        const right = "#".repeat(Math.ceil(diff));


        let winMsg = `${left}${newMsg}${right}`;
        const block = "`";

        editMsg(states, `${block}${winMsg}${block}`);
        // sendMsg(states, bottomSeparator);  
    } catch (error) {
        console.error("[ERROR] editMsg.js ", error)
    }
}



export function createSpacer(length){
    const block = "`";
    return `${block}${"#".repeat(length)}${block}`;
}

function splitSpacer(spacer, msg){
};


// FUTURE:
// connect final spacer to reactions, connect its reactions to the game board
// text in middle of spacers function