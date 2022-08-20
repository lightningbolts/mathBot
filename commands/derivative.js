const { derivative } = require("mathjs")

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
  //   data: new SlashCommandBuilder()
  //     .setName('derivative')
  //     .setDescription('Gets the derivative of a function!'),
  //   async execute(interaction) {
  //     await interaction.reply('Pong!');
  //   },
  data,
  async execute(interaction) {
    const result = derivative(interaction.options.getString("expr"), "x").toString()
    await interaction.reply(result)
  }
};