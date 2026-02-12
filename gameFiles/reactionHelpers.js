
    // sends reactions to specified msg object
export async function sendReactions(game, reacts, msgType) {

    const container = game.states.messages[msgType];

    if (!container?.obj) {
        console.error("[sendRactions] Message not found for:", msgType);
        return;
    }

    const msgObj = container.obj;

    for (const r of reacts) {
        await msgObj.react(r);
    }

}

    // removes reactions from specified msg object
export function removeReactions(game, msgType){
    
        game.states.messages[msgType].obj.reactions.removeAll();
    
}