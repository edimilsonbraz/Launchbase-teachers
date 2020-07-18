const fs = require('fs')//fire sistem ... arquivos do sistema que vai criar e grava o arquivo .json
const data = require("../data.json")
const Intl = require('intl')
const { age, date, grade} = require('../utils')


exports.index = function(req, res) {
    
//     let students = data.students.map( student => {
        
//         const newStudent = {
//               ...student,
//               subjects: student.subjects.split(",")
//         }
//         return newStudent
//   })

    return res.render("students/index", { students: data.students })
}

exports.create = function(req, res) {

    return res.render("students/create")
}

exports.post = function(req, res) {
 
    const keys = Object.keys(req.body)

    for (key of keys) {
        //req.body.avatar_url == ""
        if (req.body[key] == "") {
            return res.send('Please, fill all fields!')
        }
    }

    birth = Date.parse(req.body.birth)

    let id = 1
    const lastStudent = data.students[data.students.length - 1]

    if(lastStudent) {
        id = lastStudent.id +1
    }

    data.students.push({
        id,
        ...req.body,
        birth
    })


    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) { 
        //esse metodo grava e gera um arquivo JSON
        if (err) return res.send("Write file error!") 

        return res.redirect("/students")// ao termino do salvamento redireciona pra essa pg
    })

        //return res.send(req.body)
}

exports.show = function(req, res) {
    //req.params
    const { id } = req.params

    const foundStudent = data.students.find(function(student) {
        return id == student.id
    })

    if (!foundStudent) return res.send("Student not found")

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).birthDay,
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundStudent.created_at),
    }

    return res.render("students/show", { student })

}

exports.edit = function(req, res) {
     //req.params
     const { id } = req.params

     const foundStudent = data.students.find(function(student) {
        return id == student.id
    })

    if(!foundStudent) return res.send("Student not found")

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso,
        school_year: grade(foundStudent.school_year)
    }

    return res.render("students/edit", { student })
}

exports.update = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex) {
        if(id == student.id) {
            index = foundIndex
            return true
        }
    })

    if(!foundStudent) return res.send("Student not Found")

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id) //transforma a string em um numero
    }

    data.students[index] = student
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write file error / method put")

        return res.redirect(`/students/${id}`)
    })

}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredStudents = data.students.filter(function(student) {
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write file error")

        return res.redirect("/students")
    })
}



