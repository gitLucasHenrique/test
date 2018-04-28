//<h2>[\s\S]*?<div class="titulo-down-epi">
let fs = require('fs');
fs.readFile('./assets/db/teste-2018-4-25-22-27.txt', function(err, data) {
  if(err){
    console.log('fail to open file due to: ' + err)
  }
  else{
    let jsonAnimes = []
    let strHTML = data.toString('utf8')
    let allH2 = strHTML.match(/<h2>[\s\S]*?<div class="titulo-down-epi">/g)
    for ( let i = 0; i < allH2.length; i++ ){
      let strAnimeEpisodio = "[ Anime:Anime_Episodio : " + "'" + allH2[i].replace(/<h2><a href="[\s\S]?>|<meta[\s\S]?<div class=\"titulo-down-epi\">|<span[\s\S]*?<div class=\"titulo-down-epi\"\>/g,"") + "',"
      strAnimeEpisodio = strAnimeEpisodio.replace(/\n|\r|\t/g, "")
      strAnimeEpisodio = strAnimeEpisodio.replace(/&[\s\S]*? /g, "")
      console.log(strAnimeEpisodio)
/*

      jsonAnimes = JSON.parse(strAnimeEpisodio)
      console.log(jsonAnimes)
      //jsonAnimes = jsonAnimes + "anime_epsodio : " + strAnimeEpisodio[i]
*/
    }
  }
})
