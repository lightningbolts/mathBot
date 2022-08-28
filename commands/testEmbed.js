const { SlashCommandBuilder } = require('discord.js');
const { execute } = require("./ping");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
  .setName('test-embed')
  .setDescription('Returns an embed!')
  .addStringOption(option =>
    option.setName('title')
      .setDescription('type words here')
      .setRequired(true));

module.exports = {
  data,
  async execute(interaction) {
    const result = interaction.options.getString("title")

    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(result)
    await interaction.reply({ content: 'Embed!', ephemeral: false, embeds: [embed] })
  }
};