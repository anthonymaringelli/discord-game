import { SlashCommandBuilder, MessageFlags } from "discord.js";
import { generateBoard } from "../../gameFiles/generateBoard.js";
// import { moveLogic } from "../../gameFiles/objects/moveGame/moveLogic.js";
// import { moveData } from "../../gameFiles/objects/moveGame/moveData.js";
// import { moveStates } from "../../gameFiles/objects/moveGame/moveStates.js";
import { moveGame } from "../../gameFiles/objects/moveGame/moveClass.js"


export const command = {
	data: new SlashCommandBuilder().setName('movegame').setDescription('starts game 1'),
	async execute(interaction) {

		console.log("Start Move Game command executed");
		await interaction.reply("starting game");

		try {
			// gets channel obj, has channel id 
			const channel = await interaction.client.channels.fetch(interaction.channelId);
			// init game obj, stores channel id plus channel obj in moveGame.states
			const game = new moveGame(channel);

			game.start();

			// this interaction will call the func to generate an initial board, + initial reactions
			// generateBoard(game.logic, game.data, game.states);

		} catch (error){
			console.error ("[startMoveGame] ERROR", error)
		}



	},
};