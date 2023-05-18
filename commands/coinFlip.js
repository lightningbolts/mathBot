const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { random_color } = require("../helpfulFunctions")

function flipCoin(num) {
  function flipCoinUpTo4000() {
    let str = ""
    let count = 1
    while (count <= num) {
      let randnum = Math.random()
      if (randnum <= 0.5) {
        str += "H"
      } else {
        str += "T"
      }
      count++
    }
    return str
  }
  function flipCoinPast4000() {
    let dict = { "heads": 0, "tails": 0 }
    let count = 1
    while (count <= num) {
      let randnum = Math.random()
      if (randnum <= 0.5) {
        dict.heads++
      } else {
        dict.tails++
      }
      count++
    }
    return dict
  }
  if (num <= 4000) {
    return flipCoinUpTo4000()
  } else if (num > 4000) {
    return flipCoinPast4000()
  }
}

const data = new SlashCommandBuilder()
  .setName('coin-flip')
  .setDescription('Returns a sequence of coin flips!')
  .addStringOption(option =>
    option.setName('expr')
      .setDescription('type your equation')
      .setRequired(true));

module.exports = {
  data,
  async execute(interaction) {
    const result = flipCoin(parseInt(interaction.options.getString("expr")))
    const values = Object.values(result)
    console.log(result, values)
    if (typeof result === "string") {
      const embed = new EmbedBuilder()
        .setColor(random_color())
        .setTitle(`Flipping a coin ${interaction.options.getString("expr")} times.`)
        .setDescription(result)
      await interaction.reply({ ephemeral: false, embeds: [embed] })
    } else {
      const embed = new EmbedBuilder()
        .setColor(random_color())
        .setTitle(`Flipping a coin ${interaction.options.getString("expr")} times.`)
        .setDescription("Heads: " + values[0].toString() + "\n" + "Tails: " + values[1].toString())
      await interaction.reply({ ephemeral: false, embeds: [embed] })
    }
    //await interaction.reply(result)
  }
};