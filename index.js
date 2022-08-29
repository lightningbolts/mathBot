const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const blockedUsers = [""];
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (blockedUsers.includes(interaction.user.id)) {
    console.log("true")
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("Error!")
      .setDescription("You cannot use this bot.")
    await interaction.reply({ ephemeral: true, embeds: [embed] })
    return
  };
  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle(`Error!`)
      .setDescription("There was an error while executing this command.")
      .setFooter({ text: error.toString() })
    await interaction.reply({ ephemeral: false, embeds: [embed] })
  }
});

client.login(token);