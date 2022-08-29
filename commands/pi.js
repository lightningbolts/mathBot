const { SlashCommandBuilder } = require('discord.js');
const { random_color } = require("../helpfulFunctions")

const wait = require('node:timers/promises').setTimeout;
const axios = require('axios');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
  .setName('pi')
  .setDescription('Finds pi to a specified amount of digits!')
  .addStringOption(option =>
    option.setName('number')
      .setDescription('type in a number')
      .setRequired(true));

module.exports = {
  data,
  async execute(interaction) {
    const n = interaction.options.getString("number")
    if (n > 3500) {
      const embed = new EmbedBuilder()
        .setColor(0xff0000)
        .setTitle(`Error!`)
        .setDescription("Input is too large.")
      await interaction.reply({ ephemeral: false, embeds: [embed] })
      return
    }
    const { data } = await axios.get(`http://127.0.0.1:5000/get-pi/${n}`)
    const embed = new EmbedBuilder()
      .setColor(random_color())
      .setTitle(`The ${n} digits of pi`)
      .setDescription(data.pi)
    await interaction.deferReply();
    await wait(3000);
    await interaction.editReply({ ephemeral: false, embeds: [embed] })
  }
};