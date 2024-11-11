const emoji = require("node-emoji");
const emojilib = require("emojilib");
const fs = require('fs');
const { Console } = require('console');

const TelegramBot = require('node-telegram-bot-api');

require('dotenv').config();

const {
  chatIdGrupo } = require('./services.js');

const { result } = require("lodash");

const {
  PORT,
  TOKEN: token,
  WEBHOOK_DOMAIN: webhookDomain,
} = process.env;

const bot = new TelegramBot(token, {polling: true});

const fire = emoji.find('🔥');
const blue_circle = emoji.find('🔵');
const rotating_light = emoji.find('🚨');
const mark = emoji.find('📌');
const dollar = emoji.find('💵');


bot.onText(/\/start/, (msg) => {
  //bot.on("polling_error", console.log);
  const chatId = chatIdGrupo();
  bot.sendMessage(chatId, "Bem vindo!"); 
});

bot.onText(/\/teste/, (msg) => {
  //bot.on("polling_error", console.log);
  const chatId = chatIdGrupo();

  const resposta = `\n ${blue_circle.emoji} teste de mensagem : `;
  
  bot.sendMessage(chatId, resposta);

});