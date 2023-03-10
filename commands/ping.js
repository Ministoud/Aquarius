// Default ping command
const { SlashCommandBuilder } = require('discord.js');
// eslint-disable-next-line no-unused-vars
const { BaseInteraction } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	/**
	 * @param {BaseInteraction} interaction
	 */
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};