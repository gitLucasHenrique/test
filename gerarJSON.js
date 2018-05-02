let fs = require('fs')
fs.readFile('./assets/db/requestResult.txt', function(err, data) {
    if (err) {
        console.log('fail to open file due to: ' + err)
    } else {
        let animeJSON = ""
        let anime = [],
            episodio = [],
            imgList = [],
            links720 = [],
            links1080 = []
        let strHTML = data.toString('utf8')
        let allH2 = strHTML.match(/<h2>[\s\S]*?<div class="titulo-down-epi">/g)
        for (let i = 0; i < allH2.length; i++) {
            //retirar tags - quebras de linha, tab - espaços - troca '' por ""
            anime[i] = allH2[i].toString().replace(/<h2><a href="[\s\S]*?>|<meta[\s\S]*?<div class=\"titulo-down-epi\">|<span[\s\S]*?<div class=\"titulo-down-epi\"\>/g, "") // + "',"
            anime[i] = anime[i].toString().replace(/\n|\r|\t/g, "")
            anime[i] = anime[i].toString().replace(/&[\s\S]*? /g, "")
            anime[i] = anime[i].toString().replace(/^ /g, "")
            if (anime[i].toString().match("emporada"))
                episodio[i] = anime[i].toString().match(/\d[\s\S]{1,2}[a-zA-Z]emporada[\s\S]*?\d{2}/g)
            else
                episodio[i] = anime[i].toString().replace(/^[\s\S]*? - /g, "")
            anime[i] = anime[i].toString().replace(/\d[\s\S]{1,2}[a-zA-Z]emporada[\s\S]*?\d{2}|[\s\S]{1,3}Epis[\s\S]*?\d$/g, "")
                //checking imgs
            imgList[i] = allH2[i].toString().match(/img-down-epi[\s\S]*?dados-down-epi/g)
            imgList[i] = imgList[i].toString().replace(/img-down-epi[\s\S]*?data-lazy-src="|" \/> <\/div>[\s\S]*?dados-down-epi/g, "")
            imgList[i] = imgList[i].toString().replace(/img-down-epi"[\s\S]*?dados-down-epi/, "Sem Imagem")
                //checking links 720
            links720[i] = allH2[i].toString().match(/<div class="links_720p">[\s\S]*?clearfix/g)
            links720[i] = links720[i].toString().match(/urltratada="[\s\S]*?"/g)
            try {
                links720[i] = links720[i].toString().replace(/urltratada="|<br"/g, "")
                links720[i] = links720[i].toString().split(",")
            } catch (err) {
                links720[i] = anime[i] + " não possui links para essa resolução"
            }
            //checking links 1080
            links1080[i] = allH2[i].toString().match(/<div class="links_1080p">[\s\S]*?clearfix/g)
            links1080[i] = links1080[i].toString().match(/urltratada="[\s\S]*?"/g)
            try {
                links1080[i] = links1080[i].toString().replace(/urltratada="|<br"/g, "")
                links1080[i] = links1080[i].toString().split(",")
            } catch (err) {
                links1080[i] = anime[i] + " não possui links para essa resolução"
            }
            if (links1080[i].toString().match("não possui links")) {
                animeJSON = animeJSON + "\"anime_" + i + "\": { \"nome\":\"" + anime[i] + "\",\"episodio\":\"" + episodio[i] + "\",\"imagem\":\"" + imgList[i] +
                    "\",\"links720\":\"" + links720[i] + ",\"links1080\":\"" + links1080[i] + "\"},"
            } else {
                animeJSON = animeJSON + "\"anime_" + i + "\": { \"nome\":\"" + anime[i] + "\",\"episodio\":\"" + episodio[i] + "\",\"imagem\":\"" + imgList[i] +
                    "\",\"links720\":\"" + links720[i] + ",\"links1080\":\"" + links1080[i] + "},"
            }
        }
        animeJSON = animeJSON.toString().replace(/,$/, "}")
        animeJSON = animeJSON.toString().replace(/^[\s\S]/, "{\$&")
        try {
            animeJSON = JSON.parse(animeJSON)
            fs.writeFile("./assets/db/animesJSON.txt", animeJSON, function(err) {
                if (err)
                    console.log(err)
            })
        } catch (err) {
            console.log(err)
        }
        console.log(animeJSON)
    }
})