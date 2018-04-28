const request = require('request');
const fs = require('fs');

let dataAual = new Date()
let dia = dataAual.getUTCDate()
let mes = dataAual.getUTCMonth() + 1
let ano = dataAual.getUTCFullYear()


console.log("dia "+ dia + " mes "+ mes + " ano " + ano)

/*
setInterval(function(){

}, 30000)
*/
