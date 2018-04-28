//<h2>[\s\S]*?<div class="titulo-down-epi">
let fs = require('fs');
fs.readFile('./assets/db/requestResult.txt', function(err, data) {
  if(err){
    console.log('fail to open file due to: ' + err)
  }
  else{
    let animesList = []
    let strHTML = data.toString('utf8')
    let allH2 = strHTML.match(/<h2>[\s\S]*?<div class="titulo-down-epi">/g)

    for ( let i = 0; i < allH2.length; i++ ){
      animesList = animesList + "'" + allH2[i].replace(/<h2><a href="[\s\S]*?>|<meta[\s\S]*?<div class=\"titulo-down-epi\">|<span[\s\S]*?<div class=\"titulo-down-epi\"\>/g,"") + "',"
      animesList = animesList.replace(/\n|\r|\t/g, "")
      animesList = animesList.replace(/&[\s\S]*? /g, "")
      }
    animesList = animesList.replace(/^[\s\S]/g,"{\$\&")
    animesList = animesList.replace(/,$/g, "}")
    //trocar single quotes to double ones
    animesList = animesList.replace(/'/g, "\"")
    console.log(animesList)
    /*let animesJSON = JSON.parse(animesList)
    console.log(animesJSON)
    fs.writeFile('./assets/db/linksAnimes.json',animesJSON,function(err){
      if(err){
        console.log(err)
      }
    })*/
  }
})
