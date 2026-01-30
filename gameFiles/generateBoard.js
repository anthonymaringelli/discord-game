import { sendMsg } from "./sendMsg.js"

export async function generateBoard(gameLogic, gameData) {
   try{

    const boardMsg = await gameLogic.start(gameData);
    const channel = await gameData.channelId;
    console.log(String(gameData.channelId))
    sendMsg(boardMsg, channel);
    
    }
    catch(error) {
    console.error("[generateBoard] ERROR", error);
    }
};


