const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
// const SelectMenuValue = require('../enums/SelectMenuValue');
const SelectMenuID = require('../enums/SelectMenuID');
const path = require('node:path');

// eslint-disable-next-line no-unused-vars
const { CommandInteraction, ChatInputCommandInteraction } = require('discord.js');

/**
 * @param {CommandInteraction} interaction
 */
async function chooseNextInteraction(interaction) {
	const filter = async i => {
		await i.deferUpdate();
		return i.user.id === interaction.user.id;
	};

	const interactionsPath = path.join(__dirname, '../interactions/guardInteractions');
	// Get key from the value to then get file name
	const nextInteractionFileName = Object.keys(SelectMenuID).find(key => SelectMenuID[key] === (interaction.customId ? interaction.customId : SelectMenuID.guardFirstInteraction));

	let nextInteractionFile;
	try {
		nextInteractionFile = require(path.join(interactionsPath, nextInteractionFileName)).getInteraction(interaction);
	}
	catch (error) {
		console.error(`[Error] Cannot get the next interaction. More info: ${error.message}`);
		return;
	}

	let reply;
	// First reply to the slash command
	if (!interaction.values) {
		reply = await interaction.reply({ content: nextInteractionFile.content, components: nextInteractionFile.components, ephemeral: nextInteractionFile.ephemeral });
	}
	// Next replies
	else {
		reply = await interaction.editReply({ content: nextInteractionFile.content, components: nextInteractionFile.components });
	}

	// If the response need to wait for an component interaction
	if (nextInteractionFile.awaitedComponentType) {
		reply.awaitMessageComponent({ filter, componentType: nextInteractionFile.awaitedComponentType, time: 60000 })
			.then(fetchedInteraction => chooseNextInteraction(fetchedInteraction))
			.catch((error) => {
				console.warn(`[WARN] No response has been collected. More info: ${error}`);
				interaction.editReply({ content: 'I lost my patience, I\'m leaving now.', components: [] });
			});
	}

	// If the response need to wait for a message interaction
	if (nextInteractionFile.awaitedMessageCollector) {
		interaction.channel.awaitMessages({ max: nextInteractionFile.awaitedMessageCollector.maxResponse, time: 60000, errors: ['time'] })
			.then(collectedMessage => {
				// Execute something after collection (mandatory)
				nextInteractionFile.awaitedMessageCollector.executeAfterCollected(collectedMessage);
			})
			.catch((error) => {
				console.warn(`[WARN] No response has been collected. More info: ${error.message}`);
				interaction.editReply({ content: 'I lost my patience, I\'m leaving now.', components: [] });
			});
	}
}

// Export command
module.exports = {
	data: new SlashCommandBuilder()
		.setName('guard')
		.setDescription('Manage the guard functionnality of Aquarius'),
	/**
	 * @param {ChatInputCommandInteraction} interaction
	 */
	async execute(interaction) {
		// Check if the user has the permissions to use this command
		if (!interaction.memberPermissions.has(PermissionFlagsBits.Administrator)) {
			interaction.reply({ content: 'You\'re not my master, you can\'t do that. (Missing Permissions)', ephemeral: true });
			return;
		}

		chooseNextInteraction(interaction);
	},
};