const { SlashCommandBuilder } = require('discord.js');
const { random_color } = require("../helpfulFunctions")

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
  .setName('pig-latin')
  .setDescription('Translates english to Pig Latin!')
  .addStringOption(option =>
    option.setName('expr')
      .setDescription('type your expression')
      .setRequired(true));

function translatePigLatin(str) {

  let vowels = "aeiou".split("")
  for (let i = 0; i < str.length; i++) {
    let item = str[i]
    if (vowels.indexOf(item) !== -1 && i === 0) {
      return str + "way";
    }
    if (vowels.indexOf(item) !== -1) {
      return str.slice(i) + str.slice(0, i) + "ay";
    }
  }
  return str + "ay"
}

module.exports = {
  data,
  async execute(interaction) {
    const result = translatePigLatin(interaction.options.getString("expr"))
    const embed = new EmbedBuilder()
      .setColor(random_color())
      .setTitle(`Pig Latin expression for ${interaction.options.getString("expr")}`)
      .setDescription(result)
    await interaction.reply({ ephemeral: false, embeds: [embed] })
  }
};