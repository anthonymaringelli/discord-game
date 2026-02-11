
    // sends reactions to specified msg object
export async function sendReactions(game, reacts, msgType) {
    let msgObj = null;
    if (msgType === "game") {
        for (const r of reacts) {
            await game.states.gameMsgObj.react(r);
       }
    } else if (msgType === "spacer") {
        for (const r of reacts) {
            await game.states.spacerObj.react(r);
       }
    }


}

    // removes reactions from specified msg object
export function removeReactions(game, msgType){
    if (msgType === "game") {
        game.states.gameMsgObj.reactions.removeAll();
    } else if (msgType === "spacer") {
        game.states.spacerObj.reactions.removeAll();
    }
}