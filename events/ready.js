// Event throw when bot is ready to use
const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.info([`[INFO] Aquarius is ready ! Logged in as ${client.user.tag}`]);
	},
};