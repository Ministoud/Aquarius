const { ActionRowBuilder, ComponentType, StringSelectMenuBuilder } = require('discord.js');
const SelectMenuID = require('../../enums/SelectMenuID');
const SelectMenuValue = require('../../enums/SelectMenuValue');

module.exports = {
	getInteraction() {
		const components = [new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId(SelectMenuID.guardStart)
					.setPlaceholder('Choose... QUICK !')
					.addOptions(
						{
							label: 'Configure Guard',
							description: 'Configure guard settings (ex: the validation channel)',
							value: SelectMenuValue.guardConfig,
						},
						{
							label: 'Force validate a presentation',
							description: 'Force accept a presentation',
							value: SelectMenuValue.guardForceValidation,
						},
						{
							label: 'Force reject a presentation',
							description: 'Force reject a presentation',
							value: SelectMenuValue.guardForceRejection,
						},
					),
			),
		];
		const reply = 'What do you want ? Make it quick, I have little patience for those who waste my time.';
		const awaitedComponentType = ComponentType.StringSelect;
		const ephemeral = true;

		return {
			components: components,
			content: reply,
			awaitedComponentType: awaitedComponentType,
			ephemeral: ephemeral,
		};
	},
};