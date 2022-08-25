const { SlashCommandBuilder } = require('discord.js');
const { execute } = require("./ping");
const axios = require('axios');

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
    await interaction.reply(data.e)
  }
};