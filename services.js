const emoji = require("node-emoji");
const emojilib = require("emojilib");

const fs = require('fs');
const csv = require('csvtojson');
let csvToJson = require('convert-csv-to-json');
const axios = require('axios');

const datafeedCSV= 'BotPromoV1/DATA/datafeed.csv'
const datafeed='BotPromoV1/DATA/datafeed.json'


function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chatIdGrupo() {
  const chatId = '-4563696034'
  return chatId
}

function convertCSV(datafeedCSV, datafeed){
  
  try {
    csvToJson.generateJsonFileFromCsv(datafeedCSV,datafeed);
  } catch (ex) {
    console.error('Erro ao salvar o JSON:', ex);
  }
  
}

convertCSV(datafeedCSV, datafeed);

module.exports = {
  randomNumber,
  chatIdGrupo
};