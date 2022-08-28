const { SlashCommandBuilder } = require('discord.js');
const arr = [1752220, 1146986, 3066993, 2067276, 3447003, 2123412, 10181046, 7419530, 15277667, 11342935, 15844367,
  12745742, 15105570, 11027200, 9807270, 9936031, 8359053, 12370112, 3426654, 2899536, 16776960]
function random_color() {
  let n = Math.random() * arr.length
  return arr[Math.round(n)]
};
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