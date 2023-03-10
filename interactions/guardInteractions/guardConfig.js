const { ActionRowBuilder, StringSelectMenuBuilder, ComponentType, ChannelSelectMenuBuilder, ChannelType } = require('discord.js');
const SelectMenuID = require('../../enums/SelectMenuID');
const SelectMenuValue = require('../../enums/SelectMenuValue');

// eslint-disable-next-line no-unused-vars
const { StringSelectMenuInteraction } = require('discord.js');

module.exports = {
	/**
	 * @param {StringSelectMenuInteraction} lastInteraction
	 */
	getInteraction(lastInteraction) {
		const actionRowBuilder = new ActionRowBuilder();
		let components = [];
		let reply;
		let awaitedComponentType;
		let awaitedMessageCollector;

		switch (lastInteraction.values[0]) {
		case SelectMenuValue.guardConfigEnable:
			reply = 'Huh ? You do(n\'t) want my protection ?';
			actionRowBuilder.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId(SelectMenuID.guardConfigEnable)
					.addOptions(
						{
							label: 'Enable',
							description: 'Enable the guard feature',
							value: SelectMenuValue.guardConfigEnableTrue,
						},
						{
							label: 'Disable',
							description: 'Disable the guard feature',
							value: SelectMenuValue.guardConfigEnableFalse,
						},
					)
					.setPlaceholder('Quick, make your choice !'),
			);
			components = [actionRowBuilder];
			awaitedComponentType = ComponentType.StringSelect;
			break;

		case SelectMenuValue.guardConfigMinVoteCount:
			reply = 'Quick, how many votes do you need ?';
			awaitedMessageCollector = {
				maxResponse: 1,
				async executeAfterCollected(collectedMessage) {
					console.log(`Commande effectué: ${collectedMessage.first().content}`);
					// TODO: Stock response into a db
					const answer = collectedMessage.first().content.replace(/\s/g, '');

					await collectedMessage.first().delete();

					if (isNaN(answer)) {
						console.warn(`[WARN] The entered string (${answer}) is not an number`);
						lastInteraction.editReply({ content: 'Sigh... that\'s not a number ! I\'m leaving now. (Please provide numeric values only)' });
						return;
					}

					await lastInteraction.editReply({ content: `Okay, you now need ${answer} votes to end an validation`, components: [] });
				},
			};
			break;

		case SelectMenuValue.guardConfigPresentationChannel:
			actionRowBuilder.addComponents(
				new ChannelSelectMenuBuilder()
					.setCustomId(SelectMenuID.guardConfigPresentationChannel)
					.addChannelTypes(ChannelType.GuildText)
					.setPlaceholder('Do not make a mistake, or you\'ll get spam'),
			);
			components = [actionRowBuilder];
			reply = 'Hugh... Okay where should I check the presentations now ?';
			awaitedComponentType = ComponentType.ChannelSelect;
			break;

		case SelectMenuValue.guardConfigVerificationChannel:
			actionRowBuilder.addComponents(
				new ChannelSelectMenuBuilder()
					.setCustomId(SelectMenuID.guardConfigValidationChannel)
					.addChannelTypes(ChannelType.GuildText)
					.setPlaceholder('Do not select a public channel okay ?'),
			);
			components = [actionRowBuilder];
			reply = 'Hugh... Okay where should I send the validations now ?';
			awaitedComponentType = ComponentType.ChannelSelect;
			break;

		default:
			throw (new Error('The selected value is not correctly defined'));
		}

		return {
			components: components,
			content: reply,
			awaitedComponentType: awaitedComponentType,
			awaitedMessageCollector: awaitedMessageCollector,
		};
	},
};
