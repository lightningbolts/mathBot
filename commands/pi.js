const { SlashCommandBuilder } = require('discord.js');
const arr = [1752220, 1146986, 3066993, 2067276, 3447003, 2123412, 10181046, 7419530, 15277667, 11342935, 15844367,
  12745742, 15105570, 11027200, 9807270, 9936031, 8359053, 12370112, 3426654, 2899536, 16776960]
function random_color() {
  let n = Math.random() * arr.length
  return arr[Math.round(n)]
};
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