import { Events } from "discord.js";
// import { scheduler } from "../../imports/scheduler/schedulerMain.js";

export default {
	name: Events.ClientReady,
	once: true,	
	async execute(readyClient) {
		console.log(`Ready! Logged in as ${readyClient.user.tag}`);
		// scheduler(client); // 🔥 THIS starts the cron job

	},
};
