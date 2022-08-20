const { SlashCommandBuilder } = require('discord.js');
const { execute } = require("./ping");
function A(x, y) {
  return y === 0
    ? 0
    : x === 0
      ? 2 * y
      : y === 1
        ? 2
        : A(x - 1, A(x, y - 1));
}
const data = new SlashCommandBuilder()
  .setName('Ackermann')
  .setDescription('Finds a number given two numbers!')
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
    const result = A(interaction.options.getString("number1"), interaction.options.getString("number2")).toString()
    await interaction.reply(result)
  }
};