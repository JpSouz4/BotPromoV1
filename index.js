const emoji = require("node-emoji");
const TelegramBot = require('node-telegram-bot-api');

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');


require('dotenv').config();

const {
  convertCSV,
  randomNumber,
  chatIdGrupo,
  chatIdWhats } = require('./services.js');

const { result } = require("lodash");

const {
  PORT,
  TOKEN: token,
  WEBHOOK_DOMAIN: webhookDomain,
} = process.env;

const bot = new TelegramBot(token, { polling: true });

const client = new Client({
  authStrategy: new LocalAuth()
});

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

  try {

    client.on('qr', (qr) => {
      qrcode.generate(qr, { small: true });
    });

    client.on('ready', async () => {

      console.log('Bot on!');

    });

    client.initialize();

  } catch (error) {
    console.log('Não foi possivel executar a função do whatsapp', error);
  }

};

await function disparaWhats() {

  const fire = emoji.find('🔥');
  const blue_circle = emoji.find('🔵');
  const rotating_light = emoji.find('🚨');
  const mark = emoji.find('📌');
  const dollar = emoji.find('💵');

  const chatIdW = '5518991229015-1616757881@g.us'

  const message = convertCSV(randomNumber(1, 100))
    .then((result) => {

      let valor = (result.Price);
      const valorNumerico = parseFloat(valor.replace(/[^\d.,]/g, '').replace(',', '.'));
      let valorFormatado = valorNumerico.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });

      const resposta = `${fire.emoji} ${result.ItemName} 
                  \n ${dollar.emoji} Valor: ${valorFormatado}
                  \n Acesse o link: ${result.OfferLink}
                  \n ${blue_circle.emoji} Redes Sociais: `;

      return resposta
    })

  client.sendMessage(chatIdW, message).then(response => {

    console.log('Mensagem enviada com sucesso:', message);

  }).catch(err => {
    console.error('Erro ao enviar mensagem:', err);
  });
};

setInterval(() => {

  index();

  try {
      
    const state = client.getState();

    if (state === 'CONNECTED') {

      console.log('Estado do bot:', state); // Deve retornar 'CONNECTED' se estiver online
      disparaWhats();
    }
  } catch (error) {

    console.error('Erro ao verificar o estado do bot:', error);
  }

}, 60000); //2 min */

