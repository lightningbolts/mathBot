const { SlashCommandBuilder } = require('discord.js');
const arr = [1752220, 1146986, 3066993, 2067276, 3447003, 2123412, 10181046, 7419530, 15277667, 11342935, 15844367,
  12745742, 15105570, 11027200, 9807270, 9936031, 8359053, 12370112, 3426654, 2899536, 16776960]
function random_color() {
  let n = Math.random() * arr.length
  return arr[Math.round(n)]
};
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
  .setName('test-embed')
  .setDescription('Returns an embed!')
  .addStringOption(option =>
    option.setName('title')
      .setDescription('type words here')
      .setRequired(true));

module.exports = {
  data,
  async execute(interaction) {
    const result = interaction.options.getString("title")

    const embed = new EmbedBuilder()
      .setColor(random_color())
      .setTitle(result)
    await interaction.reply({ content: 'Embed!', ephemeral: false, embeds: [embed] })
  }
};