

// usually used for the init msg, but can be used for subsequent msgs
export async function sendMsg(boardMsg, states) {
    try {
        console.log("[sendMsg] Sending message");

        const msg = await states.channel.send(boardMsg);

        states.msgObj = msg;
        states.msgId = msg.id;
        // X? not sure why it logs x, actual test will be if states.msgObj works when needed
        // console.log(String(msg)) 
        // 1467223757100941546
        // console.log(String(msg.id))
        
    } catch (error){
        console.log("[sendMsg] ERROR", error);
    }
};