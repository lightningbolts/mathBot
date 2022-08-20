const { SlashCommandBuilder } = require('discord.js');
const { execute } = require("./ping");


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
  //   data: new SlashCommandBuilder()
  //     .setName('derivative')
  //     .setDescription('Gets the derivative of a function!'),
  //   async execute(interaction) {
  //     await interaction.reply('Pong!');
  //   },
  data,
  async execute(interaction) {
    const result = gcd(interaction.options.getString("number1"), interaction.options.getString("number2")).toString()
    await interaction.reply(result)
  }
};