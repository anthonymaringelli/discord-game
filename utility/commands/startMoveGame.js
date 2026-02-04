import { SlashCommandBuilder, MessageFlags } from "discord.js";
import { generateBoard } from "../../gameFiles/generateBoard.js";
import { game1Logic } from "../../gameFiles/objects/moveGame/moveLogic.js";
import { game1Data } from "../../gameFiles/objects/moveGame/moveData.js";
import { game1States } from "../../gameFiles/objects/moveGame/moveStates.js";


export const command = {
	data: new SlashCommandBuilder().setName('movegame').setDescription('starts game 1'),
	async execute(interaction) {

		console.log("Start Move Game command executed");
		await interaction.reply("starting game");

		try {
			const channel = await interaction.client.channels.fetch(interaction.channelId);
			const states = new game1States(channel);

			// this interaction will call the func to generate an initial board, + initial reactions
			generateBoard(game1Logic, game1Data, states);

		} catch (error){
			console.error ("[startMoveGame] ERROR", error)
		}



	},
};