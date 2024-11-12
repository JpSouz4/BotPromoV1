const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const emoji = require("node-emoji");
const emojilib = require("emojilib");



const {
    convertCSV,
    randomNumber,
    chatIdWhats, } = require('./services.js');

    const fire = emoji.find('🔥');
    const blue_circle = emoji.find('🔵');
    const rotating_light = emoji.find('🚨');
    const mark = emoji.find('📌');
    const dollar = emoji.find('💵');

const client = new Client({
    authStrategy: new LocalAuth()
});


client.on('ready', async () => {

    console.log('Bot on! ');

    const chats = await client.getChats();
    const group = chats.find(chat => chat.isGroup 
        && chat.name === 'Achados de Mamãe');

    console.log(group.id._serialized);
}); 




