const { SlashCommandBuilder } = require('discord.js');
const { random_color } = require("../helpfulFunctions")

const axios = require('axios');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

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
    const n = interaction.options.getString("number")
    const { data } = await axios.get(`http://127.0.0.1:5000/get-factorial/${n}`)
    const embed = new EmbedBuilder()
      .setColor(random_color())
      .setTitle(`${n}!`)
      .setDescription(data.factorial)
    await interaction.reply({ ephemeral: false, embeds: [embed] })
  }
};