import { SlashCommandBuilder, MessageFlags } from "discord.js";
// import { generateBoard } from "../../gameFiles/generateBoard.js";
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
			const channel = await interaction.client.channels.fetch(interaction.channelId);
			const userId = interaction.user.id;
			const client = interaction.client;

			// init game object
			const game = new moveGame(channel, userId, client);

			game.start();


		} catch (error){
			console.error ("[ERROR] startMoveGame.js ", error)
		}



	},
};