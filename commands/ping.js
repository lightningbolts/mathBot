const { SlashCommandBuilder } = require('discord.js');
const arr = [1752220, 1146986, 3066993, 2067276, 3447003, 2123412, 10181046, 7419530, 15277667, 11342935, 15844367,
  12745742, 15105570, 11027200, 9807270, 9936031, 8359053, 12370112, 3426654, 2899536, 16776960]
function random_color() {
  let n = Math.random() * arr.length
  return arr[Math.round(n)]
} const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction) {
    const sent = await interaction.reply({ content: 'Ping...', fetchReply: true });
    const embed = new EmbedBuilder()
      .setColor(random_color())
      .setTitle(`Pong!`)
      .setDescription(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`)
    await interaction.editReply({ ephemeral: false, embeds: [embed] })
  },
};
