const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const emoji = require("node-emoji");
const emojilib = require("emojilib");

const {
    randomNumber,
    chatIdGrupo,
    groupId,
    convertCSV,
    enviarItem
} = require('./services.js');

const WgroupId = groupId(); 

const fire = emoji.find('🔥');
const blue_circle = emoji.find('🔵');
const rotating_light = emoji.find('🚨');
const mark = emoji.find('📌');
const dollar = emoji.find('💵');

const client = new Client({
    authStrategy: new LocalAuth()
});


/*client.on('ready', async () => {

    console.log('Bot on! ');

    const chats = await client.getChats();
    const group = chats.find(chat => chat.isGroup 
        && chat.name === 'Achados de Mamãe');

    console.log(group.id._serialized);
}); */

client.on('qr', (qr) => { 
    qrcode.generate(qr, { small: true }); 
});

client.on('ready', async () => {

    console.log('Bot on!');

});

client.initialize();

async function verificarEstado() {

    const state = await client.getState();
    console.log('Estado atual do bot:', state);

    if (state === 'CONNECTED') {

        const message = await convertCSV()
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

        await client.sendMessage(WgroupId, message).then(response => {

            console.log('Mensagem enviada com sucesso:', message);

        }).catch(err => {
            console.error('Erro ao enviar mensagem:', err);
        });

    } else if (state === 'DISCONNECTED') {
        console.log('Bot está desconectado.');
    }
};

setInterval(verificarEstado, 60000);