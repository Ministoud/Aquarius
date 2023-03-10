// eslint-disable-next-line no-unused-vars
const { UserSelectMenuInteraction } = require('discord.js');

module.exports = {
	/**
	 * @param {UserSelectMenuInteraction} lastInteraction
	 */
	getInteraction(lastInteraction) {
		const components = [];

		const selectedUser = lastInteraction.user.first();
		const reply = `Okay, <@${selectedUser.id}> has been validated.`;

		// TODO: Accept all validations

		return {
			components: components,
			content: reply,
		};
	},
};
