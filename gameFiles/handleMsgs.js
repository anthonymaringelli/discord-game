

// sends initial post w seperator
export async function initPost(game) {
        // makes seperator msg/ gens gameboard as a string
    const separator = "#".repeat(game.config.length * 4.7);
    let gameBoardString = await game.logic.genBoard(game.states);

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