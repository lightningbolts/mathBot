const { SlashCommandBuilder } = require('discord.js');
const { random_color } = require("../helpfulFunctions")

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
function moneyFlip(amount, times) {
    if (Math.random() < 0.5) {
        if (times === 0) {
            return 0
        } else {
            return amount
        }
    } else {
        return moneyFlip(amount * 2, times + 1)
    }
}

const data = new SlashCommandBuilder()
    .setName('money-flip')
    .setDescription('Flips till fails!')
    .addStringOption(option =>
        option.setName('number1')
            .setDescription('type in a number')
            .setRequired(true))

module.exports = {
    data,
    async execute(interaction) {
        const result = moneyFlip(interaction.options.getString("number1"), 0).toString()
        const embed = new EmbedBuilder()
            .setColor(random_color())
            .setTitle(`Amount for ${interaction.options.getString("number1")}`)
            .setDescription(result)
        await interaction.reply({ ephemeral: false, embeds: [embed] })
    }
};