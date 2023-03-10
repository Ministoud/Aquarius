const { PermissionFlagsBits } = require('discord.js');

// eslint-disable-next-line no-unused-vars
const { ChannelSelectMenuInteraction } = require('discord.js');

module.exports = {
	/**
	 * @param {ChannelSelectMenuInteraction} lastInteraction
	 */
	getInteraction(lastInteraction) {
		const components = [];
		let reply;

		const channel = lastInteraction.channels.first();

		if (lastInteraction.guild.members.me.permissionsIn(channel).has(PermissionFlagsBits.ViewChannel)) {
			reply = `Okay, I will now check the presentations in the channel <#${channel.id}>`;
		}
		else {
			reply = `Nope, I don't have the power to read messages in the channel <#${channel.id}>`;
		}
		// TODO: Store modification to the DB

		return {
			components: components,
			content: reply,
		};
	},
};
