const emoji = require("node-emoji");
const emojilib = require("emojilib");

const fs = require('fs');
const csv = require('csvtojson');
let csvToJson = require('convert-csv-to-json');
const axios = require('axios');

//whats
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { forEach } = require("lodash");

const client = new Client({
  authStrategy: new LocalAuth()
});

const datafeedCSV = './DATA/feedbabytest.csv'
const datafeed = './DATA/feedbabytest.json'



function enviarItem(tamanhoLista) {

  const lista = Array.from({length: tamanhoLista}, (_, i) => i + 1);
  let enviados = new Set();

  if (enviados.size >= lista.length) {
    console.log('Todos os itens já foram enviados.');
    return;
  } else {
    let item;
  do {
    item = lista[Math.floor(Math.random() * lista.length)];
  } while (enviados.has(item));

  enviados.add(item);
  console.log(`Enviando: ${item}`);

  return item;
  }

}


function randomNumber(min, max) {


  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chatIdGrupo() {
  const chatId = '-4563696034'
  return chatId
}

function groupId() {
  const WgroupId = '5518991229015-1616757881@g.us'; 
  return WgroupId
}

async function convertCSV() {

  try {

    const jsonArrayObj = await csv({
      delimiter: ',',
      noheader: false,
      headers: [
        'ItemId',
        'ItemName',
        'Price',
        'Sales',
        'ShopName',
        'CommissionRate',
        'Commission',
        'ProductLink',
        'OfferLink'
      ]
    }).fromFile(datafeedCSV);

    let tamanhoLista = jsonArrayObj.length
    let i = enviarItem(tamanhoLista)

    const prodF = {
      ItemId: jsonArrayObj[i].ItemId,
      ItemName: jsonArrayObj[i].ItemName,
      Price: jsonArrayObj[i].Price,
      Sales: jsonArrayObj[i].Sales,
      CommissionRate: jsonArrayObj[i].CommissionRate,
      Commission: jsonArrayObj[i].Commission,
      ProductLink: jsonArrayObj[i].ProductLink,
      OfferLink: jsonArrayObj[i].OfferLink
    };

    //console.log(prodF)

    return prodF


  } catch (ex) {
    console.error('Erro ao salvar o JSON:', ex);
  }

}


module.exports = {
  randomNumber,
  chatIdGrupo,
  groupId,
  convertCSV,
  enviarItem
};