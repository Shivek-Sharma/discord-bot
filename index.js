// https://discord.js.org/docs/packages/discord.js/main

import * as dotenv from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';

dotenv.config();

const jokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "Why did the chicken go to the seance? To talk to the other side!",
  "Why don't some fish play piano? They're scared of the keys!",
  "Why did the tomato turn red? Because it saw the salad dressing!",
  "What do you call fake spaghetti? An impasta!"
];

// https://discord.com/developers/docs/topics/gateway#list-of-intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Replying to messages
client.on("messageCreate", (message) => {
  // console.log(message.content);

  // Don't reply to bot messages
  if (message.author.bot) return;

  if (message.content.toLowerCase().includes("sup")) {
    return message.reply({
      content: "I am doing good hbu"
    });
  }

  message.reply({
    content: "Hi from Bot"
  });
});

// Replying to commands
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
  else if (interaction.commandName === 'joke') {
    let index = Math.floor(Math.random() * jokes.length);
    await interaction.reply(jokes[index]);
  }
});

client.login(process.env.DISCORD_TOKEN);