const { SlashCommandBuilder } = require('discord.js');
const { random_color } = require("../helpfulFunctions")
const wait = require('node:timers/promises').setTimeout;
const axios = require('axios');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
function moneyFlip(amount, times) {
    if (Math.random() < 0.5) {
        if (times === 0) {
            return 0
        } else {
            return parseInt(amount)
        }
    } else {
        return moneyFlip(amount * 2, times + 1)
    }
}

function moneyFlipDisplay(amount, times, iterations) {
    let avg = 0
    let sum = 0
    let max = 0
    let count = 0
    while (count < iterations) {
        let result = moneyFlip(amount, times)
        sum += result
        count += 1
        avg = sum / count
        if (result > max) {
            max = result
        }
        console.log(result, avg, sum, max)
    }
    return {
        Avg: avg,
        Sum: sum,
        Max: max
    }
}

const data = new SlashCommandBuilder()
    .setName('money-flip-total')
    .setDescription('Flips till fails (times total)!')
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
        //const deferAmount = parseInt(interaction.options.getString("number2"))
        await interaction.deferReply();
        const result = moneyFlipDisplay(interaction.options.getString("number1"), 0, interaction.options.getString("number2"))
        await wait(3000);
        const values = Object.values(result)
        console.log(result)
        console.log(deferAmount)
        const embed = new EmbedBuilder()
            .setColor(random_color())
            .setTitle(`Amount for ${interaction.options.getString("number1")} ${interaction.options.getString("number2")} times`)
            .setDescription("Avg: " + values[0].toString() + "\n"
                + "Sum: " + values[1].toString() + "\n" +
                "Max: " + values[2].toString())
        await interaction.editReply({ ephemeral: false, embeds: [embed] })
    }
};