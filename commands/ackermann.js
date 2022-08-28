const { SlashCommandBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

//const {} = require("./he")
const arr = [1752220, 1146986, 3066993, 2067276, 3447003, 2123412, 10181046, 7419530, 15277667, 11342935, 15844367,
  12745742, 15105570, 11027200, 9807270, 9936031, 8359053, 12370112, 3426654, 2899536, 16776960]
function random_color() {
  let n = Math.random() * arr.length
  return arr[Math.round(n)]
}

const axios = require("axios")
function A(x, y) {
  return y === 0
    ? 0
    : x === 0
      ? 2 * y
      : y === 1
        ? 2
        : A(x - 1, A(x, y - 1));
}
const data = new SlashCommandBuilder()
  .setName('ackermann')
  .setDescription('Finds a number given two numbers!')
  .addStringOption(option =>
    option.setName('number1')
      .setDescription('type in a number')
      .setRequired(true))
  .addStringOption(option =>
    option.setName('number2')
      .setDescription('type in a number')
      .setRequired(true));

module.exports = {
  data,
  async execute(interaction) {
    // const result = A(interaction.options.getString("number1"), interaction.options.getString("number2")).toString()
    // await interaction.reply(result)
    const n = interaction.options.getString("number1")
    const m = interaction.options.getString("number2")
    const { data } = await axios.get(`http://127.0.0.1:5000/get-ackermann/${n}/${m}`)
    const embed = new EmbedBuilder()
      .setColor(random_color())
      .setTitle(`Ackermann(${n}, ${m})`)
      .setDescription(data.A)
    await interaction.reply({ ephemeral: false, embeds: [embed] })
  }
};

exports.random_color = random_color
exports.arr = arr