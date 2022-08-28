const { SlashCommandBuilder } = require('discord.js');
const { execute } = require("./ping");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');


const data = new SlashCommandBuilder()
  .setName('caesar-cipher')
  .setDescription('Encodes english text into caesar cipher text!')
  .addStringOption(option =>
    option.setName('expr')
      .setDescription('type your expression')
      .setRequired(true))
  .addStringOption(option =>
    option.setName('number')
      .setDescription('type in how much you want to shift the cipher')
      .setRequired(true));

var caesarShift = function (str, amount) {
  // Wrap the amount
  if (amount < 0) {
    return caesarShift(str, amount + 26);
  }

  // Make an output variable
  var output = "";

  // Go through each character
  for (var i = 0; i < str.length; i++) {
    // Get the character we'll be appending
    var c = str[i];

    // If it's a letter...
    if (c.match(/[a-z]/i)) {
      // Get its code
      var code = str.charCodeAt(i);

      // Uppercase letters
      if (code >= 65 && code <= 90) {
        c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
      }

      // Lowercase letters
      else if (code >= 97 && code <= 122) {
        c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
      }
    }

    // Append
    output += c;
  }

  // All done!
  return output;
};

module.exports = {
  data,
  async execute(interaction) {
    const result = caesarShift(interaction.options.getString("expr"), interaction.options.getString("number"))
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(`Caesar shift ${interaction.options.getString("number")} for ${interaction.options.getString("expr")}`)
      .setDescription(result)
    await interaction.reply({ ephemeral: false, embeds: [embed] })
  }
};