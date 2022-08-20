const { SlashCommandBuilder } = require('discord.js');
const { execute } = require("./ping");


function fibonacci(num) {
  var a = 1, b = 0, temp;

  while (num >= 0) {
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }

  return b;
}

const data = new SlashCommandBuilder()
  .setName('fibonacci')
  .setDescription('Finds a fibonacci number!')
  .addStringOption(option =>
    option.setName('number')
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
    const result = fibonacci(interaction.options.getString("fibonacci")).toString()
    await interaction.reply(result)
  }
};