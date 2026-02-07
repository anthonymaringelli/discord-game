
    // sends reactions to specified msg object
export async function sendReactions(game, reacts) {
    for (const r of reacts) {
        await game.states.msgObj.react(r);
    }
}

    // removes reactions from specified msg object
export function removeReactions(game){
    game.states.msgObj.reactions.removeAll();
}