const request = require('request');
const fs = require('fs');

let dataAual = new Date()
let dia = dataAual.getUTCDate()
let mes = dataAual.getUTCMonth() + 1
let ano = dataAual.getUTCFullYear()

let str = "testeepis"

if (str.toString().match("Epis"))
    console.log("tem Epis")
else
    console.log("não tem Epis")

console.log("dia " + dia + " mes " + mes + " ano " + ano)

/*
setInterval(function(){

}, 30000)
*/