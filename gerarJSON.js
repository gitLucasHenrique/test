let fs = require('fs');
fs.readFile('./assets/db/requestResult.txt', function(err, data) {
    if (err) {
        console.log('fail to open file due to: ' + err)
    } else {
        let animesList = []
        let links720 = []
        let links1080 = []
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
            //checking links 720
            links720[i] = allH2[i].match(/<div class="links_720p">[\s\S]*?clearfix/g)
            links720[i] = links720[i].toString().match(/urltratada="[\s\S]*?"/g)
            links720[i] = links720[i].toString().replace(/urltratada="|<br"/g,"")
            //checking links 1080
            links1080[i] = allH2[i].match(/<div class="links_1080p">[\s\S]*?clearfix/g)
            links1080[i] = links1080[i].toString().match(/urltratada="[\s\S]*?"/g)
            //links1080[i] = links1080[i].toString().replace(/urltratada="|<br"/g,"")

            console.log(links1080[38] + "link   aaaaa = " +i)
            //links720[i] = links720[i].replace(/urltratada="|<br"/g, "")
            /*
            if (i==(allH2.length-1)){
              links720[0] = allH2[0].match(/<div class="links_720p">[\s\S]*?clearfix/g)
              links720[0] = links720[0].match(/urltratada="[\s\S]*?"/g)
              links720[0] = links720[0].replace(/urltratada="|<br"/g,"")
              //animesList[i] = animesList[i] + "," + links720[i].replace(/urltratada="[\s\S]*?"/g, "")
              console.log(links720)*/
            }
    }
})
