const emoji = require("node-emoji");
const emojilib = require("emojilib");
const fs = require('fs');
const { Console } = require('console');

const TelegramBot = require('node-telegram-bot-api');

require('dotenv').config();

const {
    convertCSV,
    randomNumber,
    chatIdGrupo, } = require('./services.js');

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

async function index() {

  const chatId = chatIdGrupo();
  //const telegram = 'https://t.me/DecodingDevBots';
  //const Linktree = 'https://linktr.ee/inf1n1t3technology'

  const fire = emoji.find('🔥');
  const blue_circle = emoji.find('🔵');
  const rotating_light = emoji.find('🚨');
  const mark = emoji.find('📌');
  const dollar = emoji.find('💵');

  try {
      bot.on("polling_error", console.log);

      console.log(randomNumber(1, 100))

      convertCSV(randomNumber(1, 100))
          .then((result) => {

              let valor = (result.Price);
              const valorNumerico = parseFloat(valor.replace(/[^\d.,]/g, '').replace(',', '.'));
              let valorFormatado = valorNumerico.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
              });

              const resposta = `
              \n ${fire.emoji} ${result.ItemName} 
              \n ${dollar.emoji} Valor: ${valorFormatado}
              \n Acesse o link: ${result.OfferLink}
              \n ${blue_circle.emoji} Redes Sociais: `;

              bot.sendMessage(chatId, resposta);

          }).catch((error) => {
              console.error('Erro ao trazer o produto:', error);
          });

  } catch (ex) {
      console.error('Erro ao consultar os links:', ex);
  }
}

index();

/*
setInterval(() => {
    
  console.log('Rodou a funcao do bot', agora.toLocaleString('pt-BR', { timezone: 'UTC' }));
  index();
  
}, 60000); //2 min */