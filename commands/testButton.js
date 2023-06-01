const { SlashCommandBuilder } = require('discord.js');
const { random_color } = require("../helpfulFunctions")

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
  .setName('test-button')
  .setDescription('Returns a button!')
  .addStringOption(option =>
    option.setName('title')
      .setDescription('type words here')
      .setRequired(true));

module.exports = {
  data,
  async execute(interaction) {
    const result = interaction.options.getString("title")

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('primary')
          .setLabel(result)
          .setStyle(ButtonStyle.Primary),
      );

    await interaction.reply({ content: 'Button', ephemeral: false, components: [row] })
    try {

    } catch {
      const embed = new EmbedBuilder()
        .setColor(random_color())
        .setTitle("Error!")
      await interaction.reply({ content: 'Error!', ephemeral: false, embeds: [embed] })
    }

  }
};