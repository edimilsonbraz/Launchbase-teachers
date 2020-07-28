const { age, date, graduation } = require('../../lib/utils')


exports.index = function(req, res) {
    
//     let teachers = data.teachers.map( teacher => {
        
//         const newTeacher = {
//               ...teacher,
//               matters: teacher.matters.split(",")
//         }
//         return newTeacher
//   })

    return res.render("teachers/index", { teachers: data.teachers })
}

exports.create = function(req, res) {

    return res.render("teachers/create")
}

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
    
    let id = 1
    const lastStudent = data.students[data.students.length - 1]

    if(lastStudent) {
        id = lastStudent.id +1
    }

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
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at),
    }

    return res.render("teachers/show", { teacher })

}

exports.edit = function(req, res) {
     //req.params
     const { id } = req.params

     const foundTeacher = data.teachers.find(function(teacher) {
        return id == teacher.id
    })

    if(!foundTeacher) return res.send("Teacher not found")

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).iso
    }

    return res.render("teachers/edit", { teacher })
}

exports.update = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundIndex) {
        if(id == teacher.id) {
            index = foundIndex
            return true
        }
    })

    if(!foundTeacher) return res.send("Teacher not Found")

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id) //transforma a string em um numero
    }

    data.teachers[index] = teacher
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write file error / method put")

        return res.redirect(`/teachers/${id}`)
    })

}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredTeachers = data.teachers.filter(function(teacher) {
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write file error")

        return res.redirect("/teachers")
    })
}

