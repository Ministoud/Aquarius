const { ActionRowBuilder, StringSelectMenuBuilder, ComponentType, UserSelectMenuBuilder } = require('discord.js');
const SelectMenuID = require('../../enums/SelectMenuID');
const SelectMenuValue = require('../../enums/SelectMenuValue');

// eslint-disable-next-line no-unused-vars
const { StringSelectMenuInteraction } = require('discord.js');

module.exports = {
	/**
	 * @param {StringSelectMenuInteraction} lastInteraction
	 */
	getInteraction(lastInteraction) {
		let components;
		let awaitedComponentType;
		let reply;

		switch (lastInteraction.values[0]) {
		case SelectMenuValue.guardConfig:
			reply = 'Hurry up and adjust your settings ! Time is running out, and I won\'t wait for anyone.';
			components = [new ActionRowBuilder()
				.addComponents(
					new StringSelectMenuBuilder()
						.setCustomId(SelectMenuID.guardConfig)
						.setPlaceholder('Don\'t mess things up this time...')
						.addOptions(
							{
								label: 'Enable/Disable',
								description: 'Enable or Disable the guard feature.',
								value: SelectMenuValue.guardConfigEnable,
							},
							{
								label: 'Minimal vote count',
								description: 'Choose how many validations a presentation need to be validated.',
								value: SelectMenuValue.guardConfigMinVoteCount,
							},
							{
								label: 'Presentation Channel',
								description: 'Change in which channel the bot will check for the presentations.',
								value: SelectMenuValue.guardConfigPresentationChannel,
							},
							{
								label: 'Validation Channel',
								description: 'Change in which channel the bot will send the validation process.',
								value: SelectMenuValue.guardConfigVerificationChannel,
							},
						),
				),
			];
			awaitedComponentType = ComponentType.StringSelect;
			break;

		case SelectMenuValue.guardForceValidation:
			reply = 'Who should I let enter ?';
			components = [new ActionRowBuilder()
				.addComponents(
					new UserSelectMenuBuilder()
						.setCustomId(SelectMenuID.guardForceValidation)
						.setPlaceholder('Ugh... I will let this person enter...'),
				),
			];
			awaitedComponentType = ComponentType.UserSelect;
			break;

		case SelectMenuValue.guardForceRejection:
			reply = 'Who should I refuse ?';
			components = [new ActionRowBuilder()
				.addComponents(
					new UserSelectMenuBuilder()
						.setCustomId(SelectMenuID.guardForceRejection)
						.setPlaceholder('Nice ! This person will suffer !'),
				),
			];
			awaitedComponentType = ComponentType.UserSelect;
			break;

		default:
			throw (new Error('The selected value is not correctly defined'));
		}

		return {
			components: components,
			content: reply,
			awaitedComponentType: awaitedComponentType,
		};
	},
};
