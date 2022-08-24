const { evaluate } = require("mathjs")

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
    await interaction.reply(result)
  }
};