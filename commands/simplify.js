const { simplify } = require("mathjs")

const { SlashCommandBuilder } = require('discord.js');
const { execute } = require("./ping");

const data = new SlashCommandBuilder()
  .setName('simplify')
  .setDescription('Simplifies an expression!')
  .addStringOption(option =>
    option.setName('expr')
      .setDescription('type your expression')
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
    const result = simplify(interaction.options.getString("expr")).toString()
    await interaction.reply(result)
  }
};