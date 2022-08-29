const { SlashCommandBuilder } = require('discord.js');
const { random_color } = require("../helpfulFunctions")

const axios = require('axios');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
  .setName('e')
  .setDescription('Finds e to a specified amount of digits!')
  .addStringOption(option =>
    option.setName('number')
      .setDescription('type in a number')
      .setRequired(true));

module.exports = {
  data,
  async execute(interaction) {
    const n = interaction.options.getString("number")
    const { data } = await axios.get(`http://127.0.0.1:5000/get-e/${n}`)
    if (n > 1000) {
      const embed = new EmbedBuilder()
        .setColor(0xff0000)
        .setTitle(`Error!`)
        .setDescription("Input is too large.")
    }
    const embed = new EmbedBuilder()
      .setColor(random_color())
      .setTitle(`The ${n} digits of e`)
      .setDescription(data.e)
    await interaction.reply({ ephemeral: false, embeds: [embed] })
  }
};