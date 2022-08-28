const { derivative } = require("mathjs")
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { execute } = require("./ping");

const data = new SlashCommandBuilder()
  .setName('derive')
  .setDescription('Gets the derivative of a function!')
  .addStringOption(option =>
    option.setName('expr')
      .setDescription('type your equation')
      .setRequired(true));

module.exports = {
  data,
  async execute(interaction) {
    const result = derivative(interaction.options.getString("expr"), "x").toString()
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle("Derivative of " + interaction.options.getString("expr"))
      .setDescription(result)
    await interaction.reply({ ephemeral: false, embeds: [embed] })
    //await interaction.reply(result)
  }
};