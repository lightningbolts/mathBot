const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
var Algebrite = require('algebrite')
const { random_color } = require("../helpfulFunctions")


const data = new SlashCommandBuilder()
  .setName('anti-derive')
  .setDescription('Gets the antiderivative of a function!')
  .addStringOption(option =>
    option.setName('expr')
      .setDescription('type your equation')
      .setRequired(true));

module.exports = {
  data,
  async execute(interaction) {
    const result = Algebrite.eval(`integral(${interaction.options.getString("expr")})`).toString()
    const embed = new EmbedBuilder()
      .setColor(random_color())
      .setTitle("Antiderivative of " + interaction.options.getString("expr"))
      .setDescription(result)
    await interaction.reply({ ephemeral: false, embeds: [embed] })
    //await interaction.reply(result)
  }
};