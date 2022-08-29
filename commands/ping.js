const { SlashCommandBuilder } = require('discord.js');
const { random_color } = require("../helpfulFunctions")

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

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
