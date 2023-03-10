// Interaction handling
const { Events } = require('discord.js');
// eslint-disable-next-line no-unused-vars
const { BaseInteraction } = require('discord.js');


// Command handling
module.exports = {
	name: Events.InteractionCreate,
	/**
	 * @param {BaseInteraction} interaction
	 */
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: 'An error occured while executing this command !', ephemeral: true });
		}
	},
};