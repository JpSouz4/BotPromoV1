const emoji = require("node-emoji");
const emojilib = require("emojilib");
const fs = require('fs');
const { Console } = require('console');

const TelegramBot = require('node-telegram-bot-api');

const {
    encurtadorLink,
    convertCSV,
    randomNumber,
    chatIdGrupo,
    promoCSV } = require('./services.js');
const { result } = require("lodash");

const links = './links.json';

require('dotenv').config();

let agora = new Date();

const {
    PORT,
    TOKEN: token,
    WEBHOOK_DOMAIN: webhookDomain,
} = process.env;

const bot = new TelegramBot(token, {polling: true});

async function index() {

    const chatId = chatIdGrupo();
    const telegram = 'https://t.me/DecodingDevBots';
    const Linktree = 'https://linktr.ee/inf1n1t3technology'

    const fire = emoji.find('🔥');
    const blue_circle = emoji.find('🔵');
    const rotating_light = emoji.find('🚨');
    const mark = emoji.find('📌');
    const dollar = emoji.find('💵');

    try {
        bot.on("polling_error", console.log);

        convertCSV(randomNumber(1, 5200))
            .then((result) => {

                let linkCurto = encurtadorLink(result.link)
                console.log('Link Curto', linkCurto)

                let img = (result.img);
                let valor = (result.preco);
                const valorNumerico = parseFloat(valor.replace(/[^\d.,]/g, '').replace(',', '.'));
                let valorFormatado = valorNumerico.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });

                let categoria = (result.categoria);
                let index = categoria.indexOf('>');
                let primeiraPalavra = categoria.substring(0, index).trim();

                const resposta = `
                \n ${fire.emoji} ${result.nome} 
                \n ${mark.emoji} #${primeiraPalavra} 
                \n ${dollar.emoji} Valor: ${valorFormatado}
                \n Acesse o link: ${result.link}
                \n ${blue_circle.emoji} Redes Sociais: ${Linktree}`;

                bot.sendPhoto(chatId, img,
                    { caption: resposta });

            }).catch((error) => {
                console.error('Erro ao trazer o produto:', error);
            });

    } catch (ex) {
        console.error('Erro ao consultar os links:', ex);
    }
}

async function CupomPromo() {

    const chatId = chatIdGrupo();
    const telegram = 'https://t.me/DecodingDevBots';
    const Linktree = 'https://linktr.ee/inf1n1t3technology'

    const fire = emoji.find('🔥');
    const blue_circle = emoji.find('🔵');
    const ticket = emoji.find('🎫');
    const mark = emoji.find('✅');
    const dollar = emoji.find('💵');

    bot.on("polling_error", console.log);

    try {
        promoCSV(randomNumber(1, 50))
            .then((result) => {

                if (result.Fim != agora) {

                const promoResposta = `
                ${fire.emoji} Cupons Kabum ${fire.emoji} 
                \n ${mark.emoji} ${result.Titulo}
                \n ${ticket.emoji} Cupom: ${result.Cupom}
                \n Acesse o link: ${result.Link}
                \n ${blue_circle.emoji} Redes Sociais: ${Linktree}`;

                bot.sendMessage(chatId, promoResposta);

                } else {
                    console.error('SEM PROMO HOJE!');
                }
            });

    } catch (ex) {
        console.error('Erro ao consultar promos:', ex);
    }
}

setInterval(() => {
    
    console.log('Rodou a funcao do bot', agora.toLocaleString('pt-BR', { timezone: 'UTC' }));
    index();
}, 60000); //2 min

setInterval(() => {
    
    console.log('Rodou a funcao de promo', agora.toLocaleString('pt-BR', { timezone: 'UTC' }));
    CupomPromo();
}, 1200000);

console.log('Iniciou o bot', agora.toLocaleString('pt-BR', { timezone: 'UTC' }));



