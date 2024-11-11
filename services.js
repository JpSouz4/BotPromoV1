const emoji = require("node-emoji");
const emojilib = require("emojilib");

const fs = require('fs');
const csv = require('csvtojson');
let csvToJson = require('convert-csv-to-json');
const axios = require('axios');

const datafeedCSV= './DATA/feedbabytest.csv'
const datafeed='./DATA/feedbabytest.json'


function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chatIdGrupo() {
  const chatId = '-4563696034'
  return chatId
}

async function convertCSV(i){
  
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

    console.log(jsonArrayObj[i])

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
  convertCSV
};