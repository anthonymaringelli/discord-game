import { SlashCommandBuilder, MessageFlags } from "discord.js";
import { generateBoard } from "../../gameFiles/generateBoard.js";
import { game1Logic } from "../../gameFiles/objects/game1Logic.js";
import { game1Data } from "../../gameFiles/objects/game1Data.js";


export const command = {
	data: new SlashCommandBuilder().setName('movegame').setDescription('starts game 1'),
	async execute(interaction) {
		console.log("Start Move Game command executed");
		// defers reaction discord expects
		await interaction.reply("starting game");
		try {
			const channel = await interaction.client.channels.fetch(interaction.channelId);
			// store channel here to easily pass w data
			game1Data.channelId = channel;
			// this interaction will call the func to generate an initial board, + initial reactions
			setTimeout(generateBoard(game1Logic, game1Data), 8000);
		} catch (error){
			console.error ("[startMoveGame] ERROR", error)
		}



	},
};