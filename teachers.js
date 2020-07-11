const fs = require('fs')//fire sistem ... arquivos do sistema que vai criar e grava o arquivo .json
const data = require("./data.json")
const { age, date, graduation } = require('./utils')

//Create
exports.post = function(req, res) {
 
    const keys = Object.keys(req.body)

    for (key of keys) {
        //req.body.avatar_url == ""
        if (req.body[key] == "") {
            return res.send('Please, fill all fields!')
        }
    }

    let {avatar_url, birth, name, scholarity, matters, lesson} = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    id = Number(data.teachers.length + 1)

    data.teachers.push({        //desestruturação do Objeto req.body
        id,
        avatar_url,
        name,
        birth,
        scholarity,
        lesson,
        matters,
        created_at,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) { 
        //esse metodo grava e gera um arquivo JSON
        if (err) return res.send("Write file error!") 

        return res.redirect("/teachers")// ao termino do salvamento redireciona pra essa pg
    })

        //return res.send(req.body)
}

//Show
exports.show = function(req, res) {
    //req.params
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher) {
        return id == teacher.id
    })

    if (!foundTeacher) return res.send("Teacher not found")

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        scholarity: graduation(foundTeacher.scholarity),
        matters: foundTeacher.matters.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at),
    }

    return res.render("teachers/show", { teacher })
}

//Edit
exports.edit = function(req, res) {
     //req.params
     const { id } = req.params

     const foundTeacher = data.teachers.find(function(teacher) {
        return id == teacher.id
    })

    if(!foundTeacher) return res.send("Teacher not found")

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }

    return res.render("teachers/edit", { teacher })
}

