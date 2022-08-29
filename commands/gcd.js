const { SlashCommandBuilder } = require('discord.js');
const { random_color } = require("../helpfulFunctions")

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');


function gcd(a, b) {
  if (b === 0) {
    return a
  } else {
    return gcd(b, a % b)
  }
}

const data = new SlashCommandBuilder()
  .setName('gcd')
  .setDescription('Finds the greatest common divisor of two numbers!')
  .addStringOption(option =>
    option.setName('number1')
      .setDescription('type in a number')
      .setRequired(true))
  .addStringOption(option =>
    option.setName('number2')
      .setDescription('type in a number')
      .setRequired(true));

module.exports = {
  data,
  async execute(interaction) {
    const result = gcd(interaction.options.getString("number1"), interaction.options.getString("number2")).toString()
    const embed = new EmbedBuilder()
      .setColor(random_color())
      .setTitle(`The greatest common divisor for ${interaction.options.getString("number1")} and ${interaction.options.getString("number2")}`)
      .setDescription(result)
    await interaction.reply({ ephemeral: false, embeds: [embed] })
  }
};