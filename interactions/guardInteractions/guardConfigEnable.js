const SelectMenuValue = require('../../enums/SelectMenuValue');

// eslint-disable-next-line no-unused-vars
const { StringSelectMenuInteraction } = require('discord.js');

module.exports = {
	/**
	 * @param {StringSelectMenuInteraction} lastInteraction
	 */
	getInteraction(lastInteraction) {
		const components = [];
		let reply;

		switch (lastInteraction.values[0]) {
		case SelectMenuValue.guardConfigEnableTrue:
			// TODO Store enable in db
			reply = 'I have now activated the guard feature. Do not take my protection for granted.';
			break;

		case SelectMenuValue.guardConfigEnableFalse:
			// TODO Store disable in db
			reply = 'I have now disabled the guard feature. Well well well... you think you don\'t need my protection ? Alright then.';
			break;

		default:
			throw (new Error('The selected value is not correctly defined'));
		}

		return {
			components: components,
			content: reply,
		};
	},
};
