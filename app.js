const express = require('express')
const app = express()
const path = require('path');
const request = require('request');
const fs = require('fs');

setInterval(function(){
  let dataAual = new Date()
  let dia = dataAual.getUTCDate()
  let mes = dataAual.getUTCMonth() + 1
  let ano = dataAual.getUTCFullYear()
  let hora = dataAual.getHours()
  let minuto = dataAual.getMinutes()

  request({url: 'https://www.animestelecine.net/'},
      function(error, response, body){
        fs.writeFile("./assets/db/teste-"+ano+"-"+mes+"-"+dia+"-"+hora+"-"+minuto+".txt",body,function(err){
          if(err)
				      console.log(err)
        })
        console.log(body)
        console.log("fim da requisição")
  			if(error)
  				console.log(error)
  		})
}, 60100)


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
  app.use('/public', express.static('assets'));
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
