let fs = require('fs');
fs.readFile('./assets/db/requestResult.txt', function(err, data) {
    if (err) {
        console.log('fail to open file due to: ' + err)
    } else {
        let animesList = []
        let strHTML = data.toString('utf8')
        let allH2 = strHTML.match(/<h2>[\s\S]*?<div class="titulo-down-epi">/g)

        for (let i = 0; i < allH2.length; i++) {
            animesList[i] = allH2[i].replace(/<h2><a href="[\s\S]*?>|<meta[\s\S]*?<div class=\"titulo-down-epi\">|<span[\s\S]*?<div class=\"titulo-down-epi\"\>/g, "") // + "',"
            animesList[i] = animesList[i].replace(/\n|\r|\t/g, "")
            animesList[i] = animesList[i].replace(/&[\s\S]*? /g, "")
                //animesList[i] = animesList[i].replace(/^[\s\S]/g, "'\$\&")// ' no inicio da palavra
                //animesList[i] = animesList[i].replace(/,$/g, "}")
                //replace single quotes to double ones
            animesList[i] = animesList[i].replace(/'/g, "\"")
            animesList[i] = animesList[i].replace(/^\s/g, "")
                //for(let j = 0; j < all)novo for para links 720 <div class="links_720p">[\s\S]*?clearfix
            console.log(animesList[i])
        }
        /*let animesJSON = JSON.parse(animesList[i])
        console.log(animesJSON)
        fs.writeFile('./assets/db/linksAnimes.json',animesJSON,function(err){
          if(err){
            console.log(err)
          }
        })*/
    }
})