const { SlashCommandBuilder } = require('discord.js');
const { execute } = require("./ping");


function factorial(n) {
  if (n <= 1) {
    return n
  } else {
    return n * factorial(n - 1)
  }
}

const data = new SlashCommandBuilder()
  .setName('factorial')
  .setDescription('Finds the factorial of a number!')
  .addStringOption(option =>
    option.setName('number')
      .setDescription('type in a number')
      .setRequired(true));

module.exports = {
  data,
  async execute(interaction) {
    const result = factorial(interaction.options.getString("number")).toString()
    await interaction.reply(result)
  }
};