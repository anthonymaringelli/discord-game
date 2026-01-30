

// usually used for the init msg, but can be used for subsequent msgs
export async function sendMsg(boardMsg, channel) {
    try {
        console.log("[sendMsg] Sending message:");
        // const channel = await client.channels.fetch();

        await channel.send(boardMsg);
        
    } catch (error){
        console.log("[sendMsg] ERROR", error);
    }
};