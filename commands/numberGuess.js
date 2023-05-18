const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { random_color } = require("../helpfulFunctions")
const prompt = require('prompt-sync')();

function guessNumber(number) {
  let count = Math.round(Math.log2(number))
  let guess = null
  let secretNumber = Math.round(Math.random() * number)
  let score = null
  // let arr = []
  // let resultArr = arr.map(x => Math.abs(x - secretNumber))
  while (guess !== secretNumber && count !== 0) {
    console.log("Guesses left:", count)
    guess = prompt("What number do you guess? ")
    let num = parseInt(guess)
    //arr.push(num)
    if (num < secretNumber) {
      console.log("Guess higher!")
    } else if (num > secretNumber) {
      console.log("Guess lower!")
    } else if (num === secretNumber) {
      console.log("You got it!")
      break
    } else {
      console.log("There was an error executing this command! Try again!")
    }
    count--
  }
  score = scoreCalculation(count)
  console.log("The game is over.")
  console.log("Secret number:", secretNumber.toString())
  console.log("Guesses left: " + count.toString())
  console.log("Score: " + score.toString())
  return "Score: " + score.toString()
}

function scoreCalculation(count) {
  return Math.round((count + 1) ** 3 / Math.random())
}

const data = new SlashCommandBuilder()
  .setName('number-guess')
  .setDescription('Guess a random number!')
  .addStringOption(option =>
    option.setName('expr')
      .setDescription('type your equation')
      .setRequired(true));

module.exports = {
  data,
  async execute(interaction) {
    //const result = guessNumber(parseFloat(interaction.options.getString("expr")))
    // const embed = new EmbedBuilder()
    //   .setColor(random_color())
    //   .setTitle("Playing a number game from 1 to " + interaction.options.getString("expr"))
    //   .setDescription(guessNumber(parseFloat(interaction.options.getString("expr"))))
    // await interaction.followUp({ ephemeral: false, embeds: [embed] })
    const embed = new EmbedBuilder()
      .setColor(random_color())
      .setTitle("Error!")
      .setDescription("This command has not been fully developed yet.")
    await interaction.reply({ ephemeral: false, embeds: [embed] })
    //await interaction.reply(result)
  }
};