const { SlashCommandBuilder } = require('discord.js');
const { execute } = require("./ping");
const axios = require('axios');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
  .setName('fibonacci')
  .setDescription('Finds a fibonacci number!')
  .addStringOption(option =>
    option.setName('number')
      .setDescription('type in a number')
      .setRequired(true));

module.exports = {
  data,
  async execute(interaction) {
    const n = interaction.options.getString("number")
    const { data } = await axios.get(`http://127.0.0.1:5000/get-fib/${n}`)
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(`The ${n}th fibonacci number`)
      .setDescription(data.fib)
    await interaction.reply({ ephemeral: false, embeds: [embed] })
  }
};