const { simplify } = require("mathjs")
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const { SlashCommandBuilder } = require('discord.js');
const { random_color } = require("../helpfulFunctions")


const data = new SlashCommandBuilder()
  .setName('simplify')
  .setDescription('Simplifies an expression!')
  .addStringOption(option =>
    option.setName('expr')
      .setDescription('type your expression')
      .setRequired(true));

module.exports = {
  data,
  async execute(interaction) {
    const result = simplify(interaction.options.getString("expr")).toString()
    const embed = new EmbedBuilder()
      .setColor(random_color())
      .setTitle(`The simplification of ${interaction.options.getString("expr")}`)
      .setDescription(result)
    await interaction.reply({ ephemeral: false, embeds: [embed] })
  }
};