const { SlashCommandBuilder } = require('discord.js');
const { execute } = require("./ping");
const axios = require('axios');

const data = new SlashCommandBuilder()
  .setName('pi')
  .setDescription('Finds pi to a specified amount of digits!')
  .addStringOption(option =>
    option.setName('number')
      .setDescription('type in a number')
      .setRequired(true));

module.exports = {
  data,
  async execute(interaction) {
    const n = interaction.options.getString("number")
    const { data } = await axios.get(`http://127.0.0.1:5000/get-pi/${n}`)
    await interaction.reply(data.pi)
  }
  // async execute(interaction) {
  //   try {
  //     const result = await axios.get("http://127.0.0.1:5000/get-pi/1000")
  //     const arr = Object.values(result)
  //     console.log(arr[0])
  //     await interaction.reply(arr)
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }
};

// axios.get('http://127.0.0.1:5000/get-pi/1000')
//   .then(res => {
//     const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
//     console.log('Status Code:', res.status);
//     console.log('Date in Response header:', headerDate);

//     const result = res.data;
//     const arr = Object.values(result)
//     console.log(arr[0])
//   })
//   .catch(err => {
//     console.log('Error: ', err.message);
//   });