const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const emoji = require("node-emoji");
const emojilib = require("emojilib");

const groupId = '5518991229015-1616757881@g.us'; 

const {
    convertCSV,
    randomNumber,
    chatIdGrupo, } = require('./services.js');

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

client.on('ready', async () => {

    console.log('Bot on!');
  
});

client.initialize();

setInterval(async() => {
        
            const message = await convertCSV(randomNumber(1, 100))
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
                
            await client.sendMessage(groupId, message).then(response => {
        
                console.log('Mensagem enviada com sucesso:', message);
        
            }).catch(err => {
                console.error('Erro ao enviar mensagem:', err);
            });

        }, 300000); //10 min 




