const { evaluate } = require("mathjs")
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const { SlashCommandBuilder } = require('discord.js');
const { execute } = require("./ping");

const data = new SlashCommandBuilder()
  .setName('evaluate')
  .setDescription('Evaluates an expression!')
  .addStringOption(option =>
    option.setName('expr')
      .setDescription('type your expression')
      .setRequired(true));

module.exports = {
  data,
  async execute(interaction) {
    const result = evaluate(interaction.options.getString("expr")).toString()
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(`Evaluation of ${interaction.options.getString("expr")}`)
      .setDescription(result)
    await interaction.reply({ ephemeral: false, embeds: [embed] })
  }
};