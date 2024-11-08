const emoji = require("node-emoji");
const emojilib = require("emojilib");

const fs = require('fs');
const csv = require('csvtojson');
const axios = require('axios');

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chatIdGrupo() {
  const chatId = '-4563696034'
  return chatId
}

module.exports = {
  randomNumber,
  chatIdGrupo
};