const fs = require('fs')//fire sistem ... arquivos do sistema que vai criar e grava o arquivo .json
const data = require("./data.json")

exports.post = function(req, res) {
 
    const keys = Object.keys(req.body)

    for (key of keys) {
        //req.body.avatar_url == ""
        if (req.body[key] == "") {
            return res.send('Please, fill all fields!')
        }
    }

    let {avatar_url, birth, name, scholarity, matter, lesson} = req.body

    birth = Date.parse(req.body.birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)

    data.teachers.push({        //desestruturação do Objeto req.body
        id,
        avatar_url,
        name,
        birth,
        scholarity,
        lesson,
        matter,
        created_at,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) { 
        //esse metodo grava e gera um arquivo JSON
        if (err) return res.send("Write file error!") 

        return res.redirect("/teachers")// ao termino do salvamento redireciona pra essa pg
    })

        //return res.send(req.body)
}

